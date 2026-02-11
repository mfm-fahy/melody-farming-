"use client";

import { useState, useEffect } from "react";
<<<<<<< HEAD
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { ShoppingCart, Plus, Minus, ArrowLeft, Star, ShieldCheck, MapPin, Package, Calendar, ChefHat, ShoppingBag, Layers, RotateCcw } from "lucide-react";
import { useCart } from "@/hooks/use-cart";

const mockProduct = {
  id: "1",
  type: "Goat",
  breed: "Osmanabadi",
  price: 22000,
  image: "/healthy-goat-farm-india.jpg",
  available: 8
};

const allProducts = [
  { id: "1", name: "Goat", price: 22000, image: "/healthy-goat-farm-india.jpg" },
  { id: "2", name: "Buffalo", price: 45000, image: "/dairy-buffalo-milk-farm.jpg" },
  { id: "3", name: "Chicken", price: 250, image: "/desi-country-chicken-farm.jpg" },
  { id: "4", name: "Sheep", price: 18000, image: "/sheep-farm-india.jpg" },
  { id: "5", name: "Cow", price: 35000, image: "/dairy-buffalo-milk-farm.jpg" },
  { id: "6", name: "Duck", price: 180, image: "/desi-country-chicken-farm.jpg" }
];

const getSubProducts = (productName: string) => {
  const name = productName.toLowerCase();
  if (name.includes("goat")) return [
    { id: "g1", name: "Goat Milk", price: 80, unit: "liter", image: "/dairy-buffalo-milk-farm.jpg" },
    { id: "g2", name: "Goat Meat", price: 750, unit: "kg", image: "/healthy-goat-farm-india.jpg" },
    { id: "g3", name: "Goat Liver", price: 400, unit: "kg", image: "/healthy-goat-farm-india.jpg" },
    { id: "g4", name: "Goat Cheese", price: 300, unit: "kg", image: "/dairy-buffalo-milk-farm.jpg" }
  ];
  if (name.includes("buffalo") || name.includes("cow")) return [
    { id: "b1", name: "Milk", price: 60, unit: "liter", image: "/dairy-buffalo-milk-farm.jpg" },
    { id: "b2", name: "Ghee", price: 500, unit: "kg", image: "/dairy-buffalo-milk-farm.jpg" },
    { id: "b3", name: "Curd", price: 50, unit: "kg", image: "/dairy-buffalo-milk-farm.jpg" },
    { id: "b4", name: "Paneer", price: 280, unit: "kg", image: "/dairy-buffalo-milk-farm.jpg" }
  ];
  if (name.includes("chicken") || name.includes("duck")) return [
    { id: "c1", name: "Eggs", price: 6, unit: "piece", image: "/desi-country-chicken-farm.jpg" },
    { id: "c2", name: "Meat", price: 280, unit: "kg", image: "/desi-country-chicken-farm.jpg" },
    { id: "c3", name: "Breast", price: 320, unit: "kg", image: "/desi-country-chicken-farm.jpg" },
    { id: "c4", name: "Wings", price: 250, unit: "kg", image: "/desi-country-chicken-farm.jpg" }
  ];
  return [
    { id: "s1", name: "Meat", price: 650, unit: "kg", image: "/sheep-farm-india.jpg" },
    { id: "s2", name: "Milk", price: 70, unit: "liter", image: "/dairy-buffalo-milk-farm.jpg" }
  ];
};

export default function ProductPage() {
  const router = useRouter();
  const [page, setPage] = useState(0);
  const [touchStart, setTouchStart] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [bulkQty, setBulkQty] = useState(20);
  const [eventType, setEventType] = useState("");
  const [eventDate, setEventDate] = useState("");
  const { addToCart } = useCart();

  const subProducts = getSubProducts(mockProduct.type);



  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStart(e.touches[0].clientX);
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    const touchEnd = e.changedTouches[0].clientX;
    const diff = touchStart - touchEnd;
    if (Math.abs(diff) > 50) {
      if (diff > 0) {
        setPage((p) => (p + 1) % 3);
      } else {
        setPage((p) => (p - 1 + 3) % 3);
      }
    }
  };

  const handleAddToCart = async () => {
    await addToCart({
      farmerId: "1",
      productType: mockProduct.type,
      breed: mockProduct.breed,
      price: mockProduct.price,
      weight: "22-28kg",
      minimumGuaranteedWeight: 22,
    });
  };

  const renderPage = () => {
    switch(page) {
      case 0:
        return (
          <div className="space-y-4">
            <div className="relative h-64">
              <img src={mockProduct.image} alt={mockProduct.type} className="w-full h-full object-cover rounded-lg" />
              <Badge className="absolute top-4 right-4 bg-accent text-accent-foreground gap-1">
                <ShieldCheck className="h-3 w-3" />
                Verified
              </Badge>
            </div>
            
            <div className="flex justify-between items-start">
              <div>
                <h1 className="text-2xl font-bold">{mockProduct.type}</h1>
                <p className="text-muted-foreground">{mockProduct.breed}</p>
              </div>
              <p className="text-2xl font-bold text-primary">₹{mockProduct.price.toLocaleString()}</p>
            </div>

            <Card>
              <CardContent className="p-4">
                <div className="flex items-center gap-3 mb-3">
                  <div className="h-12 w-12 rounded-full bg-muted overflow-hidden">
                    <img src={mockProduct.image} alt="Farmer" className="w-full h-full object-cover" />
                  </div>
                  <div>
                    <p className="font-semibold">Raju Goats</p>
                    <p className="text-sm text-muted-foreground flex items-center gap-1">
                      <MapPin className="h-3 w-3" />
                      Chevella • 12km away
                    </p>
                  </div>
                  <div className="ml-auto flex items-center gap-1 bg-primary/10 px-2 py-1 rounded-md">
                    <Star className="h-4 w-4 fill-primary text-primary" />
                    <span className="font-semibold">4.8</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-4 space-y-3">
                <div className="flex items-center justify-between">
                  <span>Quantity</span>
                  <div className="flex items-center gap-2">
                    <Button size="sm" variant="outline" onClick={() => setQuantity(Math.max(1, quantity - 1))}>
                      <Minus className="h-4 w-4" />
                    </Button>
                    <span className="w-12 text-center font-semibold">{quantity}</span>
                    <Button size="sm" variant="outline" onClick={() => setQuantity(quantity + 1)}>
                      <Plus className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
                <div className="flex justify-between pt-2 border-t">
                  <span className="font-semibold">Total</span>
                  <span className="text-xl font-bold text-primary">₹{(mockProduct.price * quantity).toLocaleString()}</span>
                </div>
              </CardContent>
            </Card>

            <Button className="w-full" size="lg" onClick={handleAddToCart}>
              <ShoppingCart className="h-5 w-5 mr-2" />
              Add to Cart
            </Button>

            <Card className="bg-blue-50 border-blue-200">
              <CardContent className="p-4">
                <div className="flex items-center gap-2 mb-3">
                  <ChefHat className="h-5 w-5 text-blue-600" />
                  <h3 className="font-bold text-lg">Bulk Orders for Events</h3>
                </div>
                <p className="text-sm text-muted-foreground mb-4">Perfect for weddings, ceremonies, and function halls. Minimum order: 20kg</p>
                
                <div className="space-y-3">
                  <div className="flex items-center gap-2">
                    <span className="text-sm">Quantity (kg):</span>
                    <div className="flex items-center gap-2">
                      <Button size="sm" variant="outline" onClick={() => setBulkQty(Math.max(20, bulkQty - 5))}>
                        <Minus className="h-4 w-4" />
                      </Button>
                      <span className="w-12 text-center font-semibold">{bulkQty}</span>
                      <Button size="sm" variant="outline" onClick={() => setBulkQty(bulkQty + 5)}>
=======
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
>>>>>>> 9b5b248559c427b61e5acce082ccb4965512ec14
                        <Plus className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
<<<<<<< HEAD
                  
                  <Input placeholder="Event type (Wedding, Birthday, etc.)" value={eventType} onChange={(e) => setEventType(e.target.value)} />
                  <Input type="date" value={eventDate} onChange={(e) => setEventDate(e.target.value)} min={new Date().toISOString().split("T")[0]} />
                  
                  <div className="bg-white p-3 rounded border">
                    <div className="flex justify-between text-sm">
                      <span>Estimated Total ({bulkQty}kg)</span>
                      <span className="font-bold text-primary">₹{Math.round((mockProduct.price / 25) * bulkQty * 0.9).toLocaleString()}</span>
                    </div>
                    <p className="text-xs text-green-600 mt-1">10% bulk discount applied</p>
                  </div>
                  
                  <Button className="w-full" disabled={!eventType || !eventDate}>
                    Request Bulk Quote
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        );
      
      case 1:
        return (
          <div>
            <h2 className="text-2xl font-bold mb-4">{mockProduct.type} Products</h2>
            <div className="space-y-4">
              {subProducts.map((sub) => (
                <Card key={sub.id}>
                  <CardContent className="p-4 flex gap-4">
                    <img src={sub.image} alt={sub.name} className="w-20 h-20 object-cover rounded-lg" />
                    <div className="flex-1">
                      <p className="font-semibold">{sub.name}</p>
                      <p className="text-sm text-muted-foreground">per {sub.unit}</p>
                      <p className="text-lg font-bold text-primary mt-1">₹{sub.price}</p>
                      <Button size="sm" className="mt-2">Add to Cart</Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        );
      
      case 2:
        return (
          <div>
            <h2 className="text-2xl font-bold mb-4">Subscription Plans</h2>
            <div className="space-y-4">
              <Card className="border-2 border-primary">
                <CardContent className="p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <Calendar className="h-5 w-5 text-primary" />
                    <p className="font-bold text-lg">Weekly Plan</p>
                  </div>
                  <p className="text-sm text-muted-foreground mb-3">Fresh {mockProduct.type.toLowerCase()} products every week</p>
                  <div className="flex justify-between items-center mb-3">
                    <span className="text-2xl font-bold text-primary">₹{Math.round(mockProduct.price * 0.9).toLocaleString()}</span>
                    <Badge>Save 10%</Badge>
                  </div>
                  <Button className="w-full">Subscribe Weekly</Button>
                </CardContent>
              </Card>

              <Card className="border-2 border-green-500">
                <CardContent className="p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <Package className="h-5 w-5 text-green-600" />
                    <p className="font-bold text-lg">Monthly Plan</p>
                  </div>
                  <p className="text-sm text-muted-foreground mb-3">Fresh {mockProduct.type.toLowerCase()} products every month</p>
                  <div className="flex justify-between items-center mb-3">
                    <span className="text-2xl font-bold text-green-600">₹{Math.round(mockProduct.price * 0.8).toLocaleString()}</span>
                    <Badge className="bg-green-600">Save 20%</Badge>
                  </div>
                  <Button className="w-full bg-green-600 hover:bg-green-700">Subscribe Monthly</Button>
                </CardContent>
              </Card>
            </div>
          </div>
        );
      
      default:
        return null;
    }
  };

  return (
    <div className="fixed inset-0 bg-background flex flex-col">
      <header className="sticky top-0 z-50 bg-card border-b p-4">
        <div className="flex items-center justify-between">
          <Button variant="ghost" size="icon" onClick={() => router.back()}>
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <h1 className="text-lg font-bold">Product Details</h1>
          <div className="w-10" />
        </div>
      </header>

      <div className="flex-1 overflow-y-auto p-4" onTouchStart={handleTouchStart} onTouchEnd={handleTouchEnd}>
        {renderPage()}
      </div>

      <div className="border-t bg-card p-2 flex justify-around">
        <Button 
          variant={page === 0 ? "default" : "ghost"} 
          size="sm" 
          onClick={() => setPage(0)}
          className="flex-1 flex-col gap-1 h-12"
        >
          <ShoppingBag className="h-4 w-4" />
          <span className="text-xs">Order</span>
        </Button>
        <Button 
          variant={page === 1 ? "default" : "ghost"} 
          size="sm" 
          onClick={() => setPage(1)}
          className="flex-1 flex-col gap-1 h-12"
        >
          <Layers className="h-4 w-4" />
          <span className="text-xs">Sub Product</span>
        </Button>
        <Button 
          variant={page === 2 ? "default" : "ghost"} 
          size="sm" 
          onClick={() => setPage(2)}
          className="flex-1 flex-col gap-1 h-12"
        >
          <RotateCcw className="h-4 w-4" />
          <span className="text-xs">Subscription</span>
        </Button>
      </div>
    </div>
  );
}
=======
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
>>>>>>> 9b5b248559c427b61e5acce082ccb4965512ec14
