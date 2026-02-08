"use client";

import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
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
} from "lucide-react";
import Link from "next/link";
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

export default function ProductPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [activeTab, setActiveTab] = useState("normal");
  const [quantity, setQuantity] = useState(1);
  const [bulkQuantity, setBulkQuantity] = useState(20);
  const [eventDate, setEventDate] = useState("");
  const [eventType, setEventType] = useState("");
  const [specialRequirements, setSpecialRequirements] = useState("");
  const [touchStart, setTouchStart] = useState(0);
  const [touchEnd, setTouchEnd] = useState(0);

  const {
    addToCart,
    increaseQuantityByProduct,
    decreaseQuantityByProduct,
    getItemQuantity,
  } = useCart();

  // Get URL parameters
  const farmerId = searchParams.get('farmerId');
  const productType = searchParams.get('productType');
  const breed = searchParams.get('breed');

  // Mock data - in real app, fetch based on URL params
  const product: Product = {
    id: farmerId || "1",
    type: productType || "Goat",
    breed: breed || "Osmanabadi",
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
  };

  const farmer: Farmer = {
    id: parseInt(farmerId || "1"),
    name: "Raju Goats",
    village: "Chevella",
    distance: 12,
    rating: 4.8,
    verified: true,
    phone: "+91 98765 43210",
    image: "/healthy-goat-farm-india.jpg",
  };

  // Related products based on category
  const relatedProducts = [
    {
      id: "2",
      type: "Mutton",
      breed: "Ready to Cook",
      price: 750,
      unit: "per kg",
      image: "/healthy-goat-farm-india.jpg",
      available: 25,
    },
    {
      id: "3",
      type: "Goat Milk",
      breed: "Fresh Daily",
      price: 80,
      unit: "per liter",
      image: "/dairy-buffalo-milk-farm.jpg",
      available: 50,
    },
    {
      id: "4",
      type: "Goat Leg",
      breed: "Premium Cut",
      price: 850,
      unit: "per kg",
      image: "/healthy-goat-farm-india.jpg",
      available: 15,
    },
    {
      id: "5",
      type: "Goat Liver",
      breed: "Fresh",
      price: 400,
      unit: "per kg",
      image: "/healthy-goat-farm-india.jpg",
      available: 10,
    },
    {
      id: "6",
      type: "Sheep",
      breed: "Nellore",
      price: 680,
      unit: "per kg",
      image: "/sheep-farm-india.jpg",
      available: 12,
    },
  ];

  // Handle swipe gestures
  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStart(e.targetTouches[0].clientX);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const handleTouchEnd = () => {
    if (touchStart - touchEnd > 75) {
      // Swiped left - show bulk orders
      setActiveTab("bulk");
    }
    if (touchStart - touchEnd < -75) {
      // Swiped right - show normal orders
      setActiveTab("normal");
    }
  };

  const currentQuantity = getItemQuantity(
    farmerId || "1",
    productType || product.type,
    breed || product.breed
  );

  const handleAddToCart = async () => {
    for (let i = 0; i < quantity; i++) {
      await addToCart({
        farmerId: farmerId || "1",
        productType: productType || product.type,
        breed: breed || product.breed,
        price: product.price,
        weight: `${product.weightRangeMin}-${product.weightRangeMax}kg`,
        minimumGuaranteedWeight: product.weightRangeMin,
      });
    }
  };

  const handleBulkOrder = () => {
    // Handle bulk order submission
    alert(
      `Bulk order request submitted!\nQuantity: ${bulkQuantity}kg\nEvent: ${eventType}\nDate: ${eventDate}`
    );
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
          src={farmer.image}
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
              </TabsContent>

              {/* Bulk Order Tab */}
              <TabsContent value="bulk" className="space-y-4 mt-4">
                <div className="bg-blue-50 dark:bg-blue-950/20 p-4 rounded-lg border border-blue-200 dark:border-blue-800">
                  <div className="flex items-start gap-2">
                    <ChefHat className="h-5 w-5 text-blue-600 mt-0.5" />
                    <div>
                      <p className="font-semibold text-blue-900 dark:text-blue-100">
                        Bulk Order for Events
                      </p>
                      <p className="text-sm text-blue-700 dark:text-blue-300 mt-1">
                        Perfect for weddings, ceremonies, and function halls.
                        Minimum order: 20kg
                      </p>
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
                    <Input
                      id="event-type"
                      placeholder="e.g., Wedding, Birthday, Function Hall"
                      value={eventType}
                      onChange={(e) => setEventType(e.target.value)}
                      className="mt-2"
                    />
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

                  <div className="space-y-2 text-sm">
                    <div className="flex items-center gap-2">
                      <Users className="h-4 w-4 text-primary" />
                      <span>Dedicated support for bulk orders</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Calendar className="h-4 w-4 text-primary" />
                      <span>Scheduled delivery on your event date</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Package className="h-4 w-4 text-primary" />
                      <span>Professional cutting & packaging</span>
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
            <h3 className="text-xl font-bold">Related Products</h3>
            <Button variant="ghost" size="sm">
              View All
            </Button>
          </div>
          <div className="grid grid-cols-2 gap-4">
            {relatedProducts.map((item) => (
              <Card
                key={item.id}
                className="cursor-pointer hover:shadow-lg transition-shadow"
                onClick={() => router.push(`/customer/product?id=${item.id}`)}
              >
                <div className="relative h-32 overflow-hidden rounded-t-lg">
                  <img
                    src={item.image}
                    alt={item.type}
                    className="w-full h-full object-cover"
                  />
                </div>
                <CardContent className="p-3">
                  <p className="font-semibold text-sm">{item.type}</p>
                  <p className="text-xs text-muted-foreground">{item.breed}</p>
                  <div className="flex items-center justify-between mt-2">
                    <p className="text-sm font-bold text-primary">
                      ₹{item.price}
                    </p>
                    <p className="text-xs text-muted-foreground">{item.unit}</p>
                  </div>
                  <Badge
                    variant="secondary"
                    className="mt-2 text-xs w-full justify-center"
                  >
                    {item.available} available
                  </Badge>
                </CardContent>
              </Card>
            ))}
          </div>
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
