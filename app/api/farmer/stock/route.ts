import { NextRequest, NextResponse } from 'next/server'

// Mock database - in production, this would be a real database
let farmerStock: any[] = []

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()

    const {
      animalType,
      breed,
      weightRangeMin,
      weightRangeMax,
      age,
      quantity,
      price,
      farmerId // Assuming farmer ID from auth
    } = body

    // Validation
    if (!weightRangeMin || !weightRangeMax) {
      return NextResponse.json(
        { error: 'Both minimum and maximum weights are required' },
        { status: 400 }
      )
    }

    if (weightRangeMin >= weightRangeMax) {
      return NextResponse.json(
        { error: 'Minimum weight must be less than maximum weight' },
        { status: 400 }
      )
    }

    if (weightRangeMin <= 0 || weightRangeMax <= 0) {
      return NextResponse.json(
        { error: 'Weights must be positive values' },
        { status: 400 }
      )
    }

    // Create stock item with guaranteed weight
    const newStockItem = {
      id: Date.now().toString(),
      farmerId: farmerId || 'default-farmer', // In real app, get from auth
      animalType: animalType || 'Unknown',
      breed: breed || '',
      weightRangeMin: Number(weightRangeMin),
      weightRangeMax: Number(weightRangeMax),
      minimumGuaranteedWeight: Number(weightRangeMin), // Automatically set to min
      age: age || '',
      quantity: Number(quantity) || 1,
      price: Number(price) || 0,
      status: 'available',
      videoUploaded: false,
      createdAt: new Date().toISOString()
    }

    // Save to mock database
    farmerStock.push(newStockItem)

    return NextResponse.json({
      success: true,
      stockItem: newStockItem
    })

  } catch (error) {
    console.error('Error adding farmer stock:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

export async function GET(request: NextRequest) {
  try {
    // In real app, get farmerId from auth/session
    const farmerId = request.nextUrl.searchParams.get('farmerId') || 'default-farmer'

    const farmerStockItems = farmerStock.filter(item => item.farmerId === farmerId)

    return NextResponse.json({
      success: true,
      stock: farmerStockItems
    })

  } catch (error) {
    console.error('Error fetching farmer stock:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
