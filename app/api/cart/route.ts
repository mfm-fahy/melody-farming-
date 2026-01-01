import { NextRequest, NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    console.log("Request body:", body);
    const {
      customerId,
      farmerId,
      productType,
      breed,
      quantity,
      price,
      weight,
      minimumGuaranteedWeight,
    } = body;

    // Validation
    if (!customerId || !farmerId || !productType) {
      return NextResponse.json(
        { error: "Customer ID, Farmer ID, and Product Type are required" },
        { status: 400 }
      );
    }

    // Parse and validate numeric fields
    const parsedQuantity = quantity !== undefined ? parseFloat(quantity) : 1;
    const parsedPrice = price !== undefined ? parseFloat(price) : 0;
    const parsedWeight = weight ? parseFloat(weight) : null;
    const parsedMinWeight = minimumGuaranteedWeight
      ? parseFloat(minimumGuaranteedWeight)
      : null;

    // Normalize breed (treat empty string as null)
    const normalizedBreed = breed && breed.trim() !== "" ? breed.trim() : null;

    console.log("Adding to cart:", {
      customerId,
      farmerId,
      productType,
      breed: normalizedBreed,
    });

    // Check if item already exists in cart
    const { data: existingItem, error: checkError } = await supabase
      .from("cart")
      .select("id, quantity")
      .eq("customer_id", customerId)
      .eq("farmer_id", farmerId)
      .eq("product_type", productType)
      .eq("breed", normalizedBreed)
      .single();

    if (checkError && checkError.code !== "PGRST116") {
      // PGRST116 is "not found" error
      console.error("Error checking existing cart item:", checkError);
      return NextResponse.json(
        {
          error: "Failed to check existing cart item",
          details: checkError.message,
        },
        { status: 500 }
      );
    }

    if (existingItem) {
      // Update quantity
      const newQuantity = existingItem.quantity + parsedQuantity;
      const { data, error } = await supabase
        .from("cart")
        .update({
          quantity: newQuantity,
          updated_at: new Date().toISOString(),
        })
        .eq("id", existingItem.id)
        .select()
        .single();

      if (error) {
        console.error("Error updating cart item:", error);
        return NextResponse.json(
          { error: "Failed to update cart item", details: error.message },
          { status: 500 }
        );
      }

      return NextResponse.json({
        success: true,
        cartItem: data,
        message: "Cart item quantity updated",
      });
    } else {
      // Add new item
      const { data, error } = await supabase
        .from("cart")
        .insert({
          customer_id: customerId,
          farmer_id: farmerId,
          product_type: productType,
          breed: normalizedBreed,
          quantity: parsedQuantity,
          price_per_unit: parsedPrice,
          weight: parsedWeight,
          minimum_guaranteed_weight: parsedMinWeight,
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString(),
        })
        .select()
        .single();

      if (error) {
        console.error("Error adding to cart:", error);
        console.error("Insert data:", {
          customer_id: customerId,
          farmer_id: farmerId,
          product_type: productType,
          breed: normalizedBreed,
          quantity: parsedQuantity,
          price_per_unit: parsedPrice,
          weight: parsedWeight,
          minimum_guaranteed_weight: parsedMinWeight,
        });
        return NextResponse.json(
          { error: "Failed to add item to cart", details: error.message },
          { status: 500 }
        );
      }

      return NextResponse.json({
        success: true,
        cartItem: data,
      });
    }
  } catch (error) {
    console.error("Cart add error:", error);
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

    if (!customerId) {
      return NextResponse.json(
        { error: "Customer ID is required" },
        { status: 400 }
      );
    }

    const { data: cartItems, error } = await supabase
      .from("cart")
      .select("*")
      .eq("customer_id", customerId)
      .order("created_at", { ascending: false });

    if (error) {
      console.error("Cart fetch error:", error);
      console.error("Customer ID:", customerId);
      return NextResponse.json(
        { error: "Failed to fetch cart", details: error.message },
        { status: 500 }
      );
    }

    return NextResponse.json({ cart: cartItems });
  } catch (error) {
    console.error("Cart fetch error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const customerId = searchParams.get("customerId");
    const itemId = searchParams.get("itemId");

    if (!customerId || !itemId) {
      return NextResponse.json(
        { error: "Customer ID and Item ID are required" },
        { status: 400 }
      );
    }

    const { error } = await supabase
      .from("cart")
      .delete()
      .eq("id", itemId)
      .eq("customer_id", customerId);

    if (error) {
      console.error("Cart delete error:", error);
      return NextResponse.json(
        { error: "Failed to remove item from cart" },
        { status: 500 }
      );
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Cart delete error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

export async function PATCH(request: NextRequest) {
  try {
    const body = await request.json();
    const { customerId, itemId, quantity } = body;

    if (!customerId || !itemId || quantity === undefined) {
      return NextResponse.json(
        { error: "Customer ID, Item ID, and quantity are required" },
        { status: 400 }
      );
    }

    const parsedQuantity = parseFloat(quantity);

    const { data, error } = await supabase
      .from("cart")
      .update({
        quantity: parsedQuantity,
        updated_at: new Date().toISOString(),
      })
      .eq("id", itemId)
      .eq("customer_id", customerId)
      .select()
      .single();

    if (error) {
      console.error("Cart update error:", error);
      return NextResponse.json(
        { error: "Failed to update cart item" },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      cartItem: data,
    });
  } catch (error) {
    console.error("Cart update error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
