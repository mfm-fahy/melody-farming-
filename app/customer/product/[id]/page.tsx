"use client";

import { useState, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  ShoppingCart,
  ArrowLeft,
  Star,
  ShieldCheck,
  Video,
  MapPin,
  Truck,
  Heart,
  Share2,
  Plus,
  Minus,
  ChefHat,
  Users,
  Calendar,
  Package,
  Phone,
  MessageCircle,
  CheckCircle,
  Info,
  ArrowDown,
} from "lucide-react";
import { useCart } from "@/hooks/use-cart";

interface Product {
  id: string;
  type: string;
  breed: string;
  weightRangeMin: number;
  weightRangeMax: number;
  age: string;
  available: number;
  price: number;
  category: string;
  bulkAvailable: boolean;
  description: string;
  features: string[];
  certifications: string[];
  images: string[];
}

interface RelatedProduct {
  id: string;
  type: string;
  breed: string;
  price: number;
  unit: string;
  image: string;
  available: number;
  category: string;
}

interface Farmer {
  id: number;
  name: string;
  village: string;
  distance: number;
  rating: number;
  verified: boolean;
  phone: string;
  image: string;
}

const getRelatedProducts = (category: string, productType: string): RelatedProduct[] => {
  const relatedProductsMap: Record<string, RelatedProduct[]> = {
    mutton: [
      {
        id: "2",
        type: "Mutton",
        breed: "Ready to Cook",
        price: 750,
        unit: "per kg",
        image: "/healthy-goat-farm-india.jpg",
        available: 25,
        category: "mutton",
      },
      {
        id: "3",
        type: "Goat Milk",
        breed: "Fresh Daily",
        price: 80,
        unit: "per liter",
        image: "/dairy-buffalo-milk-farm.jpg",
        available: 50,
        category: "dairy",
      },
      {
        id: "4",
        type: "Goat Leg",
        breed: "Premium Cut",
        price: 850,
        unit: "per kg",
        image: "/healthy-goat-farm-india.jpg",
        available: 15,
        category: "mutton",
      },
      {
        id: "5",
        type: "Goat Liver",
        breed: "Fresh Organ Meat",
        price: 400,
        unit: "per kg",
        image: "/healthy-goat-farm-india.jpg",
        available: 10,
        category: "mutton",
      },
      {
        id: "6",
        type: "Sheep",
        breed: "Nellore",
        price: 680,
        unit: "per kg",
        image: "/sheep-farm-india.jpg",
        available: 12,
        category: "mutton",
      },
      {
        id: "15",
        type: "Goat Ribs",
        breed: "Premium Cut",
        price: 900,
        unit: "per kg",
        image: "/healthy-goat-farm-india.jpg",
        available: 8,
        category: "mutton",
      },
    ],
    chicken: [
      {
        id: "7",
        type: "Country Chicken",
        breed: "Desi",
        price: 350,
        unit: "per kg",
        image: "/desi-country-chicken-farm.jpg",
        available: 30,
        category: "chicken",
      },
      {
        id: "8",
        type: "Chicken Eggs",
        breed: "Farm Fresh",
        price: 8,
        unit: "per piece",
        image: "/desi-country-chicken-farm.jpg",
        available: 100,
        category: "dairy",
      },
      {
        id: "9",
        type: "Chicken Breast",
        breed: "Boneless",
        price: 400,
        unit: "per kg",
        image: "/desi-country-chicken-farm.jpg",
        available: 20,
        category: "chicken",
      },
      {
        id: "10",
        type: "Chicken Thighs",
        breed: "Bone-in",
        price: 320,
        unit: "per kg",
        image: "/desi-country-chicken-farm.jpg",
        available: 25,
        category: "chicken",
      },
      {
        id: "16",
        type: "Chicken Wings",
        breed: "Fresh Cut",
        price: 280,
        unit: "per kg",
        image: "/desi-country-chicken-farm.jpg",
        available: 18,
        category: "chicken",
      },
    ],
    dairy: [
      {
        id: "11",
        type: "Buffalo Milk",
        breed: "Fresh",
        price: 60,
        unit: "per liter",
        image: "/dairy-buffalo-milk-farm.jpg",
        available: 40,
        category: "dairy",
      },
      {
        id: "12",
        type: "Cow Milk",
        breed: "A2 Quality",
        price: 70,
        unit: "per liter",
        image: "/dairy-buffalo-milk-farm.jpg",
        available: 35,
        category: "dairy",
      },
      {
        id: "13",
        type: "Paneer",
        breed: "Fresh Cottage Cheese",
        price: 300,
        unit: "per kg",
        image: "/dairy-buffalo-milk-farm.jpg",
        available: 15,
        category: "dairy",
      },
      {
        id: "14",
        type: "Ghee",
        breed: "Pure Desi",
        price: 450,
        unit: "per kg",
        image: "/dairy-buffalo-milk-farm.jpg",
        available: 20,
        category: "dairy",
      },
    ],
  };

  // Enhanced logic for specific product types
  if (productType.toLowerCase().includes('goat')) {
    return relatedProductsMap.mutton || [];
  }
  if (productType.toLowerCase().includes('chicken')) {
    return relatedProductsMap.chicken || [];
  }
  if (productType.toLowerCase().includes('milk') || productType.toLowerCase().includes('dairy')) {
    return relatedProductsMap.dairy || [];
  }
  
  return relatedProductsMap[category] || [];
};

export default function ProductPage() {
  const router = useRouter();
  const params = useParams();
  const [activeTab, setActiveTab] = useState("normal");
  const [quantity, setQuantity] = useState(1);
  const [bulkQuantity, setBulkQuantity] = useState(20);
  const [eventDate, setEventDate] = useState("");
  const [eventType, setEventType] = useState("");
  const [specialRequirements, setSpecialRequirements] = useState("");
  const [touchStart, setTouchStart] = useState(0);
  const [touchEnd, setTouchEnd] = useState(0);
  const [showBulkIcon, setShowBulkIcon] = useState(true);

  const { addToCart } = useCart();

  // Mock data - in real app, fetch based on params.id
  const product: Product = {
    id: params.id as string,
    type: "Goat",
    breed: "Osmanabadi",
    weightRangeMin: 22,
    weightRangeMax: 28,
    age: "8 months",
    available: 8,
    price: 22000,
    category: "mutton",
    bulkAvailable: true,
    description:
      "Premium quality Osmanabadi goat, raised naturally on organic feed. Known for tender meat and excellent taste. Perfect for special occasions and family gatherings.",
    features: [
      "100% Organic Feed",
      "Free Range Farming",
      "Regular Health Checkups",
      "No Antibiotics or Hormones",
      "Video Verification Available",
      "Live Delivery Option",
    ],
    certifications: ["Organic Certified", "Veterinary Approved", "Halal"],
    images: ["/healthy-goat-farm-india.jpg"],
  };

  const farmer: Farmer = {
    id: 1,
    name: "Raju Goats",
    village: "Chevella",
    distance: 12,
    rating: 4.8,
    verified: true,
    phone: "+91 98765 43210",
    image: "/healthy-goat-farm-india.jpg",
  };

  const relatedProducts = getRelatedProducts(product.category, product.type);

  // Handle swipe gestures
  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStart(e.targetTouches[0].clientX);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const handleTouchEnd = () => {
    if (touchStart - touchEnd > 75) {
      setActiveTab("bulk");
      setShowBulkIcon(false);
    }
    if (touchStart - touchEnd < -75) {
      setActiveTab("normal");
      setShowBulkIcon(true);
    }
  };

  const handleAddToCart = async () => {
    await addToCart({
      farmerId: farmer.id.toString(),
      productType: product.type,
      breed: product.breed,
      price: product.price,
      weight: `${product.weightRangeMin}-${product.weightRangeMax}kg`,
      minimumGuaranteedWeight: product.weightRangeMin,
    });
  };

  const handleBulkOrder = async () => {
    const bulkOrderData = {
      productId: product.id,
      farmerId: farmer.id,
      quantity: bulkQuantity,
      eventType,
      eventDate,
      specialRequirements,
      totalAmount: Math.round(
        (product.price / product.weightRangeMin) * bulkQuantity * 0.9
      ),
    };

    try {
      const response = await fetch("/api/bulk-orders", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(bulkOrderData),
      });

      if (response.ok) {
        alert("Bulk order request submitted successfully!");
        router.push("/customer/orders");
      } else {
        alert("Failed to submit bulk order. Please try again.");
      }
    } catch (error) {
      alert("Error submitting bulk order. Please try again.");
    }
  };

  return (
    <div className="min-h-screen bg-background pb-20">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-card border-b shadow-sm">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => router.back()}
              aria-label="Go back"
            >
              <ArrowLeft className="h-5 w-5" />
            </Button>
            <h1 className="text-lg font-bold">Product Details</h1>
            <div className="flex items-center gap-2">
              <Button variant="ghost" size="icon">
                <Share2 className="h-5 w-5" />
              </Button>
              <Button variant="ghost" size="icon">
                <Heart className="h-5 w-5" />
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Product Image Gallery */}
      <div className="relative h-80 bg-muted">
        <img
          src={product.images[0] || farmer.image}
          alt={product.type}
          className="w-full h-full object-cover"
        />
        {farmer.verified && (
          <Badge className="absolute top-4 right-4 bg-accent text-accent-foreground gap-1">
            <ShieldCheck className="h-3 w-3" />
            Verified Farmer
          </Badge>
        )}
        {product.bulkAvailable && (
          <Badge className="absolute top-4 left-4 bg-blue-500 text-white gap-1">
            <ChefHat className="h-3 w-3" />
            Bulk Available
          </Badge>
        )}
      </div>

      {/* Product Info */}
      <div className="container mx-auto px-4 py-6 space-y-6">
        {/* Basic Info */}
        <div>
          <div className="flex items-start justify-between mb-2">
            <div>
              <h2 className="text-2xl font-bold">{product.type}</h2>
              <p className="text-muted-foreground">{product.breed}</p>
            </div>
            <div className="text-right">
              <p className="text-3xl font-bold text-primary">
                ₹{product.price.toLocaleString()}
              </p>
              <p className="text-sm text-muted-foreground">
                {product.weightRangeMin}-{product.weightRangeMax}kg
              </p>
            </div>
          </div>

          {/* Farmer Info */}
          <Card className="mt-4">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="h-12 w-12 rounded-full bg-muted overflow-hidden">
                    <img
                      src={farmer.image}
                      alt={farmer.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div>
                    <p className="font-semibold">{farmer.name}</p>
                    <p className="text-sm text-muted-foreground flex items-center gap-1">
                      <MapPin className="h-3 w-3" />
                      {farmer.village} • {farmer.distance}km away
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-1 bg-primary/10 px-2 py-1 rounded-md">
                  <Star className="h-4 w-4 fill-primary text-primary" />
                  <span className="font-semibold">{farmer.rating}</span>
                </div>
              </div>
              <div className="flex gap-2 mt-3">
                <Button variant="outline" size="sm" className="flex-1 gap-1">
                  <Phone className="h-4 w-4" />
                  Call
                </Button>
                <Button variant="outline" size="sm" className="flex-1 gap-1">
                  <MessageCircle className="h-4 w-4" />
                  Chat
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Product Details */}
        <Card>
          <CardHeader>
            <CardTitle>Product Details</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-muted-foreground">{product.description}</p>
            <Separator />
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-sm text-muted-foreground">Weight Range</p>
                <p className="font-semibold">
                  {product.weightRangeMin}-{product.weightRangeMax}kg
                </p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Age</p>
                <p className="font-semibold">{product.age}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Available</p>
                <p className="font-semibold text-primary">
                  {product.available} units
                </p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Category</p>
                <p className="font-semibold capitalize">{product.category}</p>
              </div>
            </div>
            <Separator />
            <div>
              <p className="font-semibold mb-2">Key Features</p>
              <ul className="space-y-2">
                {product.features.map((feature, idx) => (
                  <li key={idx} className="flex items-center gap-2 text-sm">
                    <CheckCircle className="h-4 w-4 text-primary flex-shrink-0" />
                    {feature}
                  </li>
                ))}
              </ul>
            </div>
            <Separator />
            <div>
              <p className="font-semibold mb-2">Certifications</p>
              <div className="flex flex-wrap gap-2">
                {product.certifications.map((cert, idx) => (
                  <Badge key={idx} variant="secondary">
                    {cert}
                  </Badge>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Order Type Tabs with Swipe Support */}
        <Card
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
        >
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle>Order Options</CardTitle>
              <div className="flex items-center gap-2 text-xs text-muted-foreground">
                <Info className="h-3 w-3" />
                Swipe to switch
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <Tabs value={activeTab} onValueChange={setActiveTab}>
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="normal">Normal Order</TabsTrigger>
                <TabsTrigger value="bulk" className="gap-1">
                  <ChefHat className="h-4 w-4" />
                  Bulk Order
                </TabsTrigger>
              </TabsList>

              {/* Normal Order Tab */}
              <TabsContent value="normal" className="space-y-4 mt-4">
                <div className="bg-muted/50 p-4 rounded-lg space-y-3">
                  <div className="flex items-center justify-between">
                    <Label>Quantity</Label>
                    <div className="flex items-center gap-2">
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => setQuantity(Math.max(1, quantity - 1))}
                        disabled={quantity <= 1}
                      >
                        <Minus className="h-4 w-4" />
                      </Button>
                      <span className="w-12 text-center font-semibold">
                        {quantity}
                      </span>
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() =>
                          setQuantity(
                            Math.min(product.available, quantity + 1)
                          )
                        }
                        disabled={quantity >= product.available}
                      >
                        <Plus className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                  <Separator />
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">
                      Subtotal
                    </span>
                    <span className="text-xl font-bold text-primary">
                      ₹{(product.price * quantity).toLocaleString()}
                    </span>
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-sm">
                    <Truck className="h-4 w-4 text-primary" />
                    <span>Free delivery on orders above ₹500</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <Video className="h-4 w-4 text-primary" />
                    <span>Video verification before delivery</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <ShieldCheck className="h-4 w-4 text-primary" />
                    <span>100% quality guarantee</span>
                  </div>
                </div>

                <Button
                  className="w-full"
                  size="lg"
                  onClick={handleAddToCart}
                  disabled={product.available === 0}
                >
                  <ShoppingCart className="h-5 w-5 mr-2" />
                  Add to Cart
                </Button>

                {/* Bulk Order Icon */}
                {showBulkIcon && product.bulkAvailable && (
                  <div className="flex justify-center mt-6">
                    <div className="text-center">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => setActiveTab("bulk")}
                        className="gap-2 animate-pulse bg-gradient-to-r from-blue-50 to-purple-50 border-blue-200 hover:from-blue-100 hover:to-purple-100"
                      >
                        <ArrowDown className="h-4 w-4 animate-bounce" />
                        Bulk Orders for Events
                        <ChefHat className="h-4 w-4" />
                      </Button>
                      <p className="text-xs text-muted-foreground mt-2">
                        👆 Swipe right or tap for marriage halls & events
                      </p>
                    </div>
                  </div>
                )}
              </TabsContent>

              {/* Bulk Order Tab */}
              <TabsContent value="bulk" className="space-y-4 mt-4">
                <div className="bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-950/20 dark:to-purple-950/20 p-4 rounded-lg border border-blue-200 dark:border-blue-800">
                  <div className="flex items-start gap-3">
                    <div className="bg-blue-100 dark:bg-blue-900 p-2 rounded-full">
                      <ChefHat className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                    </div>
                    <div className="flex-1">
                      <p className="font-semibold text-blue-900 dark:text-blue-100 text-lg">
                        Bulk Orders for Special Events
                      </p>
                      <p className="text-sm text-blue-700 dark:text-blue-300 mt-1 leading-relaxed">
                        Perfect for weddings, marriage halls, function halls, birthday parties, and corporate events.
                        <span className="block mt-1 font-medium">✨ Minimum order: 20kg • Special event pricing • Professional service</span>
                      </p>
                      <div className="flex flex-wrap gap-2 mt-3">
                        <Badge variant="secondary" className="text-xs bg-blue-100 text-blue-800">
                          Marriage Halls
                        </Badge>
                        <Badge variant="secondary" className="text-xs bg-purple-100 text-purple-800">
                          Weddings
                        </Badge>
                        <Badge variant="secondary" className="text-xs bg-green-100 text-green-800">
                          Corporate Events
                        </Badge>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <div>
                    <Label htmlFor="bulk-quantity">
                      Quantity (kg) - Min: 20kg
                    </Label>
                    <div className="flex items-center gap-2 mt-2">
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() =>
                          setBulkQuantity(Math.max(20, bulkQuantity - 5))
                        }
                      >
                        <Minus className="h-4 w-4" />
                      </Button>
                      <Input
                        id="bulk-quantity"
                        type="number"
                        value={bulkQuantity}
                        onChange={(e) =>
                          setBulkQuantity(
                            Math.max(20, parseInt(e.target.value) || 20)
                          )
                        }
                        className="text-center"
                        min={20}
                      />
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => setBulkQuantity(bulkQuantity + 5)}
                      >
                        <Plus className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="event-type">Event Type</Label>
                    <select
                      id="event-type"
                      value={eventType}
                      onChange={(e) => setEventType(e.target.value)}
                      className="w-full mt-2 px-3 py-2 border border-input bg-background rounded-md text-sm"
                    >
                      <option value="">Select Event Type</option>
                      <option value="Wedding">Wedding</option>
                      <option value="Marriage Hall">Marriage Hall</option>
                      <option value="Function Hall">Function Hall</option>
                      <option value="Birthday Party">Birthday Party</option>
                      <option value="Anniversary">Anniversary</option>
                      <option value="Corporate Event">Corporate Event</option>
                      <option value="Festival Celebration">Festival Celebration</option>
                      <option value="Other">Other</option>
                    </select>
                  </div>

                  <div>
                    <Label htmlFor="event-date">Event Date</Label>
                    <Input
                      id="event-date"
                      type="date"
                      value={eventDate}
                      onChange={(e) => setEventDate(e.target.value)}
                      className="mt-2"
                      min={new Date().toISOString().split("T")[0]}
                    />
                  </div>

                  <div>
                    <Label htmlFor="special-requirements">
                      Special Requirements (Optional)
                    </Label>
                    <Textarea
                      id="special-requirements"
                      placeholder="Any specific cutting style, delivery time, or other requirements..."
                      value={specialRequirements}
                      onChange={(e) => setSpecialRequirements(e.target.value)}
                      className="mt-2"
                      rows={3}
                    />
                  </div>

                  <Separator />

                  <div className="bg-muted/50 p-4 rounded-lg space-y-2">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-muted-foreground">
                        Quantity (kg)
                      </span>
                      <span className="font-semibold">{bulkQuantity}kg</span>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-muted-foreground">
                        Price per kg
                      </span>
                      <span className="font-semibold">
                        ₹{Math.round(product.price / product.weightRangeMin)}
                      </span>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-muted-foreground">
                        Bulk Discount (10%)
                      </span>
                      <span className="font-semibold text-green-600">
                        -₹
                        {Math.round(
                          (product.price / product.weightRangeMin) *
                            bulkQuantity *
                            0.1
                        ).toLocaleString()}
                      </span>
                    </div>
                    <Separator />
                    <div className="flex items-center justify-between">
                      <span className="font-semibold">Estimated Total</span>
                      <span className="text-xl font-bold text-primary">
                        ₹
                        {Math.round(
                          (product.price / product.weightRangeMin) *
                            bulkQuantity *
                            0.9
                        ).toLocaleString()}
                      </span>
                    </div>
                  </div>

                  <div className="bg-gradient-to-r from-green-50 to-blue-50 dark:from-green-950/20 dark:to-blue-950/20 p-4 rounded-lg border border-green-200 dark:border-green-800">
                    <h4 className="font-semibold text-green-900 dark:text-green-100 mb-3 flex items-center gap-2">
                      <CheckCircle className="h-4 w-4" />
                      Bulk Order Benefits
                    </h4>
                    <div className="grid grid-cols-1 gap-3 text-sm">
                      <div className="flex items-center gap-3 p-2 bg-white/50 dark:bg-gray-800/50 rounded-md">
                        <Users className="h-4 w-4 text-primary flex-shrink-0" />
                        <span>Dedicated event coordinator & 24/7 support</span>
                      </div>
                      <div className="flex items-center gap-3 p-2 bg-white/50 dark:bg-gray-800/50 rounded-md">
                        <Calendar className="h-4 w-4 text-primary flex-shrink-0" />
                        <span>Guaranteed delivery on your event date</span>
                      </div>
                      <div className="flex items-center gap-3 p-2 bg-white/50 dark:bg-gray-800/50 rounded-md">
                        <Package className="h-4 w-4 text-primary flex-shrink-0" />
                        <span>Professional cutting, cleaning & packaging</span>
                      </div>
                      <div className="flex items-center gap-3 p-2 bg-white/50 dark:bg-gray-800/50 rounded-md">
                        <ShieldCheck className="h-4 w-4 text-primary flex-shrink-0" />
                        <span>Quality guarantee with video verification</span>
                      </div>
                    </div>
                  </div>

                  <Button
                    className="w-full"
                    size="lg"
                    onClick={handleBulkOrder}
                    disabled={!eventType || !eventDate || bulkQuantity < 20}
                  >
                    <ChefHat className="h-5 w-5 mr-2" />
                    Request Bulk Order Quote
                  </Button>
                </div>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>

        {/* Related Products */}
        <div>
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="text-xl font-bold">You might also like</h3>
              <p className="text-sm text-muted-foreground">
                {product.type.toLowerCase().includes('goat') 
                  ? 'More goat products - mutton, milk, organs & cuts'
                  : `More ${product.category} products`
                }
              </p>
            </div>
            <Button variant="ghost" size="sm">
              View All
            </Button>
          </div>
          <div className="grid grid-cols-2 gap-4">
            {relatedProducts.slice(0, 6).map((item) => (
              <Card
                key={item.id}
                className="cursor-pointer hover:shadow-lg transition-all duration-200 hover:scale-105"
                onClick={() => router.push(`/customer/product/${item.id}`)}
              >
                <div className="relative h-32 overflow-hidden rounded-t-lg">
                  <img
                    src={item.image}
                    alt={item.type}
                    className="w-full h-full object-cover transition-transform duration-200 hover:scale-110"
                  />
                  <div className="absolute top-2 right-2">
                    <Badge variant="secondary" className="text-xs bg-white/90 text-gray-800">
                      {item.available} left
                    </Badge>
                  </div>
                </div>
                <CardContent className="p-3">
                  <p className="font-semibold text-sm truncate">{item.type}</p>
                  <p className="text-xs text-muted-foreground truncate">{item.breed}</p>
                  <div className="flex items-center justify-between mt-2">
                    <p className="text-sm font-bold text-primary">
                      ₹{item.price}
                    </p>
                    <p className="text-xs text-muted-foreground">{item.unit}</p>
                  </div>
                  <Button 
                    size="sm" 
                    variant="outline" 
                    className="w-full mt-2 text-xs h-7"
                    onClick={(e) => {
                      e.stopPropagation();
                      // Add to cart logic here
                    }}
                  >
                    Quick Add
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
          
          {/* Show more related products button */}
          {relatedProducts.length > 6 && (
            <div className="flex justify-center mt-4">
              <Button variant="outline" className="gap-2">
                <Plus className="h-4 w-4" />
                Show {relatedProducts.length - 6} more products
              </Button>
            </div>
          )}
        </div>

        {/* Video Verification */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Video className="h-5 w-5 text-primary" />
              Video Verification
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="aspect-video bg-muted rounded-lg flex items-center justify-center">
              <Button variant="outline" size="lg" className="gap-2">
                <Video className="h-5 w-5" />
                Watch Product Video
              </Button>
            </div>
            <p className="text-sm text-muted-foreground mt-3">
              Watch live video of the product before purchase. Our farmers
              provide real-time verification to ensure quality and transparency.
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}