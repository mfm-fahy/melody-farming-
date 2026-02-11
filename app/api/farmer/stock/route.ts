import { NextRequest, NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    const {
      animalType,
      breed,
      weightRangeMin,
      weightRangeMax,
      age,
      quantity,
      price,
      farmerId, // Assuming farmer ID from auth
    } = body;

    // Validation
    if (!weightRangeMin || !weightRangeMax) {
      return NextResponse.json(
        { error: "Both minimum and maximum weights are required" },
        { status: 400 }
      );
    }

    if (weightRangeMin >= weightRangeMax) {
      return NextResponse.json(
        { error: "Minimum weight must be less than maximum weight" },
        { status: 400 }
      );
    }

    if (weightRangeMin <= 0 || weightRangeMax <= 0) {
      return NextResponse.json(
        { error: "Weights must be positive values" },
        { status: 400 }
      );
    }

    // Create stock item with guaranteed weight
    const newStockItem = {
      id: Date.now().toString(),
      farmer_id: farmerId || "default-farmer", // In real app, get from auth
      animal_type: animalType || "Unknown",
      breed: breed || "",
      weight_range_min: Number(weightRangeMin),
      weight_range_max: Number(weightRangeMax),
      minimum_guaranteed_weight: Number(weightRangeMin), // Automatically set to min
      age: age || "",
      quantity: Number(quantity) || 1,
      price: Number(price) || 0,
      status: "available",
      video_uploaded: false,
      created_at: new Date().toISOString(),
    };

    // Save to Supabase
    const { data, error } = await supabase
      .from("farmer_stock")
      .insert([newStockItem])
      .select();

    if (error) {
      console.error("Error saving farmer stock:", error);
      return NextResponse.json(
        { error: "Failed to save stock item" },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      stockItem: data[0],
    });
  } catch (error) {
    console.error("Error adding farmer stock:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

export async function GET(request: NextRequest) {
  try {
    // In real app, get farmerId from auth/session
    const farmerId =
      request.nextUrl.searchParams.get("farmerId") || "default-farmer";

    const { data, error } = await supabase
      .from("farmer_stock")
      .select("*")
      .eq("farmer_id", farmerId);

    if (error) {
      console.error("Error fetching farmer stock:", error);
      return NextResponse.json(
        { error: "Failed to fetch stock items" },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      stock: data,
    });
  } catch (error) {
    console.error("Error fetching farmer stock:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
