import { NextRequest, NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
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

    // Check if item already exists in wishlist
    const { data: existingItem } = await supabase
      .from("wishlist")
      .select("id")
      .eq("customer_id", customerId)
      .eq("farmer_id", farmerId)
      .eq("product_type", productType)
      .eq("breed", breed || "")
      .single();

    if (existingItem) {
      return NextResponse.json(
        { error: "Item already exists in wishlist" },
        { status: 409 }
      );
    }

    // Add to wishlist
    const { data, error } = await supabase
      .from("wishlist")
      .insert({
        customer_id: customerId,
        farmer_id: farmerId,
        product_type: productType,
        breed: breed || "",
        quantity: quantity || 1,
        price_per_unit: price || 0,
        weight: weight || null,
        minimum_guaranteed_weight: minimumGuaranteedWeight || null,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      })
      .select()
      .single();

    if (error) {
      console.error("Error adding to wishlist:", error);
      return NextResponse.json(
        { error: "Failed to add item to wishlist" },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      wishlistItem: data,
    });
  } catch (error) {
    console.error("Wishlist add error:", error);
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

    const { data: wishlistItems, error } = await supabase
      .from("wishlist")
      .select(
        `
        *,
        farmer:farmer_id (
          name,
          village,
          phone,
          is_verified
        )
      `
      )
      .eq("customer_id", customerId)
      .order("created_at", { ascending: false });

    if (error) {
      console.error("Wishlist fetch error:", error);
      return NextResponse.json(
        { error: "Failed to fetch wishlist" },
        { status: 500 }
      );
    }

    return NextResponse.json({ wishlist: wishlistItems });
  } catch (error) {
    console.error("Wishlist fetch error:", error);
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
      .from("wishlist")
      .delete()
      .eq("id", itemId)
      .eq("customer_id", customerId);

    if (error) {
      console.error("Wishlist delete error:", error);
      return NextResponse.json(
        { error: "Failed to remove item from wishlist" },
        { status: 500 }
      );
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Wishlist delete error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
