import { NextRequest, NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const {
      customerId,
      items,
      totalAmount,
      deliveryAddress,
      paymentMethod,
      paymentId,
      deliveryFee,
      gst,
    } = body;

    // Generate order ID
    const orderId = `ORD-${Date.now()}-${Math.floor(Math.random() * 1000)}`;

    // Start transaction
    const { data: order, error: orderError } = await supabase
      .from("orders")
      .insert({
        id: orderId,
        customer_id: customerId,
        total_amount: totalAmount,
        delivery_fee: deliveryFee,
        gst: gst,
        payment_method: paymentMethod,
        payment_id: paymentId,
        delivery_address: deliveryAddress,
        status: "pending",
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      })
      .select()
      .single();

    if (orderError) {
      console.error("Order creation error:", orderError);
      return NextResponse.json(
        { error: "Failed to create order" },
        { status: 500 }
      );
    }

    // Insert order items
    const orderItems = items.map((item: any) => ({
      order_id: orderId,
      farmer_id: item.farmerId || item.farmer_id,
      product_type: item.productType || item.product_type,
      breed: item.breed,
      quantity: item.quantity,
      price_per_unit: item.price || item.price_per_unit,
      total_price: (item.price || item.price_per_unit) * item.quantity,
      weight: item.weight,
      minimum_guaranteed_weight:
        item.minimumGuaranteedWeight || item.minimum_guaranteed_weight,
    }));

    const { error: itemsError } = await supabase
      .from("order_items")
      .insert(orderItems);

    if (itemsError) {
      console.error("Order items creation error:", itemsError);
      // Rollback order if items fail
      await supabase.from("orders").delete().eq("id", orderId);
      return NextResponse.json(
        { error: "Failed to create order items" },
        { status: 500 }
      );
    }

    // Create payment record
    const { error: paymentError } = await supabase.from("payments").insert({
      order_id: orderId,
      amount: totalAmount,
      payment_method: paymentMethod,
      payment_id: paymentId,
      status: paymentMethod === "cod" ? "pending" : "completed",
      created_at: new Date().toISOString(),
    });

    if (paymentError) {
      console.error("Payment creation error:", paymentError);
      // Don't fail the order for payment errors, just log
    }

    // Create initial order tracking
    const { error: trackingError } = await supabase
      .from("order_tracking")
      .insert({
        order_id: orderId,
        status: "pending",
        message: "Order placed successfully",
        location: "Processing",
        created_at: new Date().toISOString(),
      });

    if (trackingError) {
      console.error("Tracking creation error:", trackingError);
      // Don't fail the order for tracking errors
    }

    return NextResponse.json({
      success: true,
      orderId,
      order,
    });
  } catch (error) {
    console.error("Order creation error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const customerId = searchParams.get("customerId");
    const status = searchParams.get("status");

    if (!customerId) {
      return NextResponse.json(
        { error: "Customer ID is required" },
        { status: 400 }
      );
    }

    let query = supabase
      .from("orders")
      .select(
        `
        *,
        order_items (
          *,
          farmer: farmers (
            name,
            village
          )
        ),
        order_tracking (
          *
        ),
        payments (
          *
        )
      `
      )
      .eq("customer_id", customerId)
      .order("created_at", { ascending: false });

    if (status) {
      query = query.eq("status", status);
    }

    const { data: orders, error } = await query;

    if (error) {
      console.error("Orders fetch error:", error);
      return NextResponse.json(
        { error: "Failed to fetch orders", details: error },
        { status: 500 }
      );
    }

    return NextResponse.json({ orders });
  } catch (error) {
    console.error("Orders fetch error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
