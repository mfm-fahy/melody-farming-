"use client";

import { useState, useEffect } from "react";
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
                        <Plus className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
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

