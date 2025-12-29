"use client";

import { useState, useMemo } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Slider } from "@/components/ui/slider";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import {
  ShoppingCart,
  Search,
  MapPin,
  Star,
  ShieldCheck,
  Video,
  TruckIcon,
  Home,
  Beef,
  Milk,
  Carrot,
  ChefHat,
  Heart,
  Settings,
  Plus,
  Minus,
  X,
  Filter,
  Users,
  Calendar,
  Package,
} from "lucide-react";
import Link from "next/link";
import { useCart } from "@/hooks/use-cart";
import { Farmer } from "@/lib/cart-utils";

export default function CustomerPage() {
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [filters, setFilters] = useState({
    productTypes: [] as string[],
    keyword: "",
    weightMin: 0,
    weightMax: 50,
    priceMin: 0,
    priceMax: 1000,
    nearbyOnly: false,
    bulkOnly: false,
  });
  const [showFilters, setShowFilters] = useState(false);
  const [showServices, setShowServices] = useState(false);
  const {
    cartSummary,
    addToCart,
    increaseQuantity,
    decreaseQuantity,
    getItemQuantity,
    canAddItem,
  } = useCart();

  const categories = [
    { id: "all", name: "All Products", icon: Home },
    { id: "chicken", name: "Desi Chicken", icon: ChefHat },
    { id: "mutton", name: "Organic Mutton", icon: Beef },
    { id: "milk", name: "Fresh Milk", icon: Milk },
    { id: "dairy", name: "Dairy Products", icon: Milk },
    { id: "vegetables", name: "Vegetables", icon: Carrot },
    { id: "nuts", name: "Nuts & By-Products", icon: Package },
    { id: "bulk", name: "Function Halls", icon: ShoppingCart },
  ];

  const farmers = [
    {
      id: 1,
      name: "Raju Goud",
      village: "Chevella",
      distance: 12,
      rating: 4.8,
      verified: true,
      location: { lat: 17.3064, lng: 78.3381 },
      products: [
        {
          type: "Goat",
          breed: "Osmanabadi",
          weightRangeMin: 22,
          weightRangeMax: 28,
          age: "8 months",
          available: 8,
          price: 750,
          category: "mutton",
          bulkAvailable: true,
        },
      ],
      image: "/healthy-goat-farm-india.jpg",
    },
    {
      id: 2,
      name: "Lakshmi Farms",
      village: "Shankarpally",
      distance: 8,
      rating: 4.9,
      verified: true,
      location: { lat: 17.4563, lng: 78.1234 },
      products: [
        {
          type: "Desi Chicken",
          breed: "Country Chicken",
          weightRangeMin: 1.2,
          weightRangeMax: 1.8,
          age: "6 months",
          available: 25,
          price: 420,
          category: "chicken",
          bulkAvailable: false,
        },
      ],
      image: "/desi-country-chicken-farm.jpg",
    },
    {
      id: 3,
      name: "Krishna Dairy",
      village: "Moinabad",
      distance: 15,
      rating: 4.7,
      verified: true,
      location: { lat: 17.2345, lng: 78.5678 },
      products: [
        {
          type: "Buffalo Milk",
          breed: "Murrah Buffalo",
          weightRangeMin: 1,
          weightRangeMax: 1,
          age: "Fresh Daily",
          available: 50,
          price: 65,
          category: "milk",
          bulkAvailable: true,
        },
      ],
      image: "/dairy-buffalo-milk-farm.jpg",
    },
    {
      id: 4,
      name: "Srinivas Organic",
      village: "Vikarabad",
      distance: 20,
      rating: 4.6,
      verified: true,
      location: { lat: 17.3456, lng: 77.9012 },
      products: [
        {
          type: "Mixed Vegetables",
          breed: "Organic",
          weightRangeMin: 1,
          weightRangeMax: 1,
          age: "Fresh Harvest",
          available: 100,
          price: 45,
          category: "vegetables",
          bulkAvailable: false,
        },
      ],
      image: "/organic-vegetable-farm-india.jpg",
    },
    {
      id: 6,
      name: "Pure Dairy Farms",
      village: "Sangareddy",
      distance: 18,
      rating: 4.8,
      verified: true,
      location: { lat: 17.4567, lng: 78.9012 },
      products: [
        {
          type: "Organic Ghee",
          breed: "Cow Ghee",
          weightRangeMin: 0.5,
          weightRangeMax: 5,
          age: "Fresh Made",
          available: 30,
          price: 850,
          category: "dairy",
          bulkAvailable: true,
        },
        {
          type: "Fresh Paneer",
          breed: "Cow Milk",
          weightRangeMin: 0.25,
          weightRangeMax: 2,
          age: "Daily Fresh",
          available: 50,
          price: 320,
          category: "dairy",
          bulkAvailable: false,
        },
        {
          type: "Natural Yogurt",
          breed: "Cow Milk",
          weightRangeMin: 0.5,
          weightRangeMax: 5,
          age: "Daily Fresh",
          available: 40,
          price: 180,
          category: "dairy",
          bulkAvailable: true,
        },
        {
          type: "Farm Cheese",
          breed: "Cow Milk",
          weightRangeMin: 0.25,
          weightRangeMax: 1,
          age: "Aged 2 weeks",
          available: 25,
          price: 450,
          category: "dairy",
          bulkAvailable: false,
        },
      ],
      image: "/dairy-buffalo-milk-farm.jpg",
    },
    {
      id: 5,
      name: "Sheep Valley",
      village: "Medchal",
      distance: 6,
      rating: 4.5,
      verified: false,
      location: { lat: 17.6789, lng: 78.3456 },
      products: [
        {
          type: "Sheep",
          breed: "Nellore",
          weightRangeMin: 15,
          weightRangeMax: 25,
          age: "7 months",
          available: 12,
          price: 680,
          category: "mutton",
          bulkAvailable: true,
        },
      ],
      image: "/healthy-goat-farm-india.jpg",
    },
    {
      id: 7,
      name: "Groundnut Farms",
      village: "Nalgonda",
      distance: 25,
      rating: 4.7,
      verified: true,
      location: { lat: 17.1234, lng: 79.5678 },
      products: [
        {
          type: "Groundnut",
          breed: "Organic",
          weightRangeMin: 1,
          weightRangeMax: 10,
          age: "Fresh Harvest",
          available: 200,
          price: 120,
          category: "nuts",
          bulkAvailable: true,
        },
        {
          type: "Peanut Butter",
          breed: "Organic",
          weightRangeMin: 0.5,
          weightRangeMax: 5,
          age: "Fresh Made",
          available: 50,
          price: 350,
          category: "nuts",
          bulkAvailable: false,
        },
      ],
      image: "/organic-vegetable-farm-india.jpg",
    },
  ];

  const filteredFarmers = useMemo(() => {
    let filtered = farmers.filter((farmer) => {
      if (!farmer.products) return false;
      // Product type filter
      if (filters.productTypes.length > 0) {
        const hasMatchingProduct = farmer.products.some((p) =>
          filters.productTypes.includes(p.type)
        );
        if (!hasMatchingProduct) return false;
      }

      // Keyword search
      if (filters.keyword) {
        const keyword = filters.keyword.toLowerCase();
        const matchesKeyword =
          farmer.name.toLowerCase().includes(keyword) ||
          farmer.village.toLowerCase().includes(keyword) ||
          farmer.products.some(
            (p) =>
              p.type.toLowerCase().includes(keyword) ||
              p.breed.toLowerCase().includes(keyword)
          );
        if (!matchesKeyword) return false;
      }

      // Weight range filter
      const hasWeightMatch = farmer.products.some(
        (p) =>
          (((p as any).weightRangeMax ?? (p as any).weightMax ?? 0) >= filters.weightMin && ((p as any).weightRangeMin ?? (p as any).weightMin ?? 0) <= filters.weightMax)
      );
      if (!hasWeightMatch) return false;

      // Price range filter
      const hasPriceMatch = farmer.products.some(
        (p) => p.price >= filters.priceMin && p.price <= filters.priceMax
      );
      if (!hasPriceMatch) return false;

      // Nearby filter (mock distance < 10km)
      if (filters.nearbyOnly && farmer.distance >= 10) return false;

      // Bulk only filter
      if (filters.bulkOnly) {
        const hasBulkProduct = farmer.products.some((p) => p.bulkAvailable);
        if (!hasBulkProduct) return false;
      }

      return true;
    });

    // Prioritization: verified first, then in-stock, nearest distance, best price
    filtered.sort((a, b) => {
      // Verified farmers first
      if (a.verified && !b.verified) return -1;
      if (!a.verified && b.verified) return 1;

      // In-stock items first (farmers with available > 0)
      const aInStock = a.products.some((p) => p.available > 0);
      const bInStock = b.products.some((p) => p.available > 0);
      if (aInStock && !bInStock) return -1;
      if (!aInStock && bInStock) return 1;

      // Nearest distance
      if (a.distance !== b.distance) return a.distance - b.distance;

      // Best price (lowest average price)
      const aAvgPrice = a.products.reduce((sum, p) => sum + p.price, 0) / a.products.length;
      const bAvgPrice = b.products.reduce((sum, p) => sum + p.price, 0) / b.products.length;
      return aAvgPrice - bAvgPrice;
    });

    return filtered;
  }, [filters, farmers]);

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-card border-b shadow-sm">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Link href="/customer/settings">
                <Button variant="ghost" size="icon">
                  <Settings className="h-5 w-5" />
                </Button>
              </Link>
              <div>
                <h1 className="text-2xl font-bold text-primary">Melody</h1>
                <p className="text-sm text-muted-foreground flex items-center gap-1">
                  <MapPin className="h-3 w-3" />
                  Hyderabad Area
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <Link href="/customer/services">
                <Button
                  variant="ghost"
                  size="icon"
                  aria-label="Open services"
                  className="relative"
                >
                  <Users className="h-5 w-5" />
                </Button>
              </Link>
              <Link href="/customer/orders">
                <Button variant="ghost" size="icon" className="relative">
                  <Heart className="h-5 w-5" />
                </Button>
              </Link>
              <Link href="/customer/cart">
                <Button
                  variant="default"
                  size="icon"
                  className="relative"
                  aria-label="Open cart"
                >
                  <ShoppingCart className="h-5 w-5" />
                  {cartSummary.totalItems > 0 && (
                    <Badge className="absolute -top-2 -right-2 h-5 w-5 flex items-center justify-center p-0 bg-secondary">
                      {cartSummary.totalItems}
                    </Badge>
                  )}
                </Button>
              </Link>
            </div>
          </div>

          {/* Search Bar and Filters */}
          <div className="mt-4 space-y-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-muted-foreground" />
              <Input
                placeholder="Search for meat, milk, dairy products, vegetables..."
                className="pl-10"
                value={filters.keyword}
                onChange={(e) => setFilters(prev => ({ ...prev, keyword: e.target.value }))}
              />
            </div>

            {/* Filter Toggle */}
            <Button
              variant={showFilters ? "default" : "outline"}
              onClick={() => setShowFilters(!showFilters)}
              className={`w-full gap-2 ${showFilters ? "bg-primary text-primary-foreground hover:bg-primary/90" : ""}`}
            >
              <Filter className="h-4 w-4" />
              {showFilters ? "Hide Filters" : "Show Filters"}
              {Object.values(filters).some(v =>
                Array.isArray(v) ? v.length > 0 : v !== "" && v !== false && v !== 0 && v !== 50 && v !== 1000
              ) && (
                <Badge variant="secondary" className="ml-2">
                  Active
                </Badge>
              )}
            </Button>

            {/* Applied Filters Tags */}
            {(filters.productTypes.length > 0 || filters.keyword || filters.nearbyOnly || filters.bulkOnly ||
              filters.weightMin > 0 || filters.weightMax < 50 || filters.priceMin > 0 || filters.priceMax < 1000) && (
              <div className="flex flex-wrap gap-2">
                {filters.productTypes.map(type => (
                  <Badge key={type} variant="secondary" className="gap-1">
                    {type}
                    <X
                      className="h-3 w-3 cursor-pointer"
                      onClick={() => setFilters(prev => ({
                        ...prev,
                        productTypes: prev.productTypes.filter(t => t !== type)
                      }))}
                    />
                  </Badge>
                ))}
                {filters.keyword && (
                  <Badge variant="secondary" className="gap-1">
                    "{filters.keyword}"
                    <X
                      className="h-3 w-3 cursor-pointer"
                      onClick={() => setFilters(prev => ({ ...prev, keyword: "" }))}
                    />
                  </Badge>
                )}
                {filters.nearbyOnly && (
                  <Badge variant="secondary" className="gap-1">
                    {'Nearby (<10km)'}
                    <X
                      className="h-3 w-3 cursor-pointer"
                      onClick={() => setFilters(prev => ({ ...prev, nearbyOnly: false }))}
                    />
                  </Badge>
                )}
                {filters.bulkOnly && (
                  <Badge variant="secondary" className="gap-1">
                    Bulk Available
                    <X
                      className="h-3 w-3 cursor-pointer"
                      onClick={() => setFilters(prev => ({ ...prev, bulkOnly: false }))}
                    />
                  </Badge>
                )}
                {(filters.weightMin > 0 || filters.weightMax < 50) && (
                  <Badge variant="secondary" className="gap-1">
                    Weight: {filters.weightMin}-{filters.weightMax}kg
                    <X
                      className="h-3 w-3 cursor-pointer"
                      onClick={() => setFilters(prev => ({ ...prev, weightMin: 0, weightMax: 50 }))}
                    />
                  </Badge>
                )}
                {(filters.priceMin > 0 || filters.priceMax < 1000) && (
                  <Badge variant="secondary" className="gap-1">
                    Price: ₹{filters.priceMin}-₹{filters.priceMax}
                    <X
                      className="h-3 w-3 cursor-pointer"
                      onClick={() => setFilters(prev => ({ ...prev, priceMin: 0, priceMax: 1000 }))}
                    />
                  </Badge>
                )}
              </div>
            )}

            {/* Advanced Filters */}
            {showFilters && (
              <Card className="p-4">
                <div className="space-y-4">
                  {/* Product Types */}
                  <div>
                    <Label className="text-sm font-medium">Product Types</Label>
                    <div className="flex flex-wrap gap-2 mt-2">
                      {["Goat", "Sheep", "Desi Chicken"].map(type => (
                        <div key={type} className="flex items-center space-x-2">
                          <Checkbox
                            id={type}
                            checked={filters.productTypes.includes(type)}
                            onCheckedChange={(checked) => {
                              if (checked) {
                                setFilters(prev => ({
                                  ...prev,
                                  productTypes: [...prev.productTypes, type]
                                }));
                              } else {
                                setFilters(prev => ({
                                  ...prev,
                                  productTypes: prev.productTypes.filter(t => t !== type)
                                }));
                              }
                            }}
                          />
                          <Label htmlFor={type} className="text-sm">{type}</Label>
                        </div>
                      ))}
                    </div>
                  </div>

                  <Separator />

                  {/* Weight Range */}
                  <div>
                    <Label className="text-sm font-medium">
                      Weight Range: {filters.weightMin} - {filters.weightMax} kg
                    </Label>
                    <Slider
                      value={[filters.weightMin, filters.weightMax]}
                      onValueChange={([min, max]) =>
                        setFilters(prev => ({ ...prev, weightMin: min, weightMax: max }))
                      }
                      max={50}
                      min={0}
                      step={0.5}
                      className="mt-2"
                    />
                  </div>

                  {/* Price Range */}
                  <div>
                    <Label className="text-sm font-medium">
                      Price Range: ₹{filters.priceMin} - ₹{filters.priceMax}
                    </Label>
                    <Slider
                      value={[filters.priceMin, filters.priceMax]}
                      onValueChange={([min, max]) =>
                        setFilters(prev => ({ ...prev, priceMin: min, priceMax: max }))
                      }
                      max={1000}
                      min={0}
                      step={10}
                      className="mt-2"
                    />
                  </div>

                  <Separator />

                  {/* Additional Filters */}
                  <div className="space-y-2">
                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id="nearby"
                        checked={filters.nearbyOnly}
                        onCheckedChange={(checked) =>
                          setFilters(prev => ({ ...prev, nearbyOnly: !!checked }))
                        }
                      />
                      <Label htmlFor="nearby" className="text-sm">{'Nearby farmers (< 10km)'}</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id="bulk"
                        checked={filters.bulkOnly}
                        onCheckedChange={(checked) =>
                          setFilters(prev => ({ ...prev, bulkOnly: !!checked }))
                        }
                      />
                      <Label htmlFor="bulk" className="text-sm">Bulk/function hall supply available</Label>
                    </div>
                  </div>

                  {/* Clear All Filters */}
                  <Button
                    variant="outline"
                    onClick={() => setFilters({
                      productTypes: [],
                      keyword: "",
                      weightMin: 0,
                      weightMax: 50,
                      priceMin: 0,
                      priceMax: 1000,
                      nearbyOnly: false,
                      bulkOnly: false,
                    })}
                    className="w-full"
                  >
                    Clear All Filters
                  </Button>
                </div>
              </Card>
            )}
          </div>
        </div>
      </header>

      {/* Category Pills */}
      <div className="border-b bg-card">
        <div className="container mx-auto px-4 py-4">
          <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
            {categories.map((cat) => (
              <Button
                key={cat.id}
                variant={selectedCategory === cat.id ? "default" : "outline"}
                onClick={() => setSelectedCategory(cat.id)}
                className="flex-shrink-0 gap-2"
              >
                <cat.icon className="h-4 w-4" />
                {cat.name}
              </Button>
            ))}
          </div>
        </div>
      </div>

      {/* Unique Feature - Butcher & Live Animal Facility */}
      <div className="bg-primary/5 border-b">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-center">
            <div className="relative w-full max-w-5xl bg-card border-2 border-primary/20 rounded-lg shadow-sm p-4 flex items-center justify-center animate-float hover:scale-110 transition-transform duration-300">
              <div className="text-center">
                <h2 className="text-xl font-bold mb-1">Butcher Facility + Live Animal Delivery</h2>
                <p className="text-sm text-muted-foreground max-w-2xl">
                  Unlike other platforms, we provide professional butcher services alongside live animal delivery to your doorstep.
                  Experience fresh, hygienic meat prepared by expert butchers.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Trust Banner */}
      <div className="bg-primary/5 border-b">
        <div className="container mx-auto px-4 py-3">
          <div className="flex items-center justify-center gap-6 text-sm flex-wrap">
            <div className="flex items-center gap-2">
              <ShieldCheck className="h-4 w-4 text-primary" />
              <span className="font-medium">Verified Farmers</span>
            </div>
            <div className="flex items-center gap-2">
              <Video className="h-4 w-4 text-primary" />
              <span className="font-medium">Video Verification</span>
            </div>
            <div className="flex items-center gap-2">
              <TruckIcon className="h-4 w-4 text-primary" />
              <span className="font-medium">Live Tracking</span>
            </div>
          </div>
        </div>
      </div>

      {/* Farmers List */}
      <div className="container mx-auto px-4 py-6">
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-xl font-bold">
            {selectedCategory === "all"
              ? "All Farmers"
              : categories.find((c) => c.id === selectedCategory)?.name}
          </h2>
          <p className="text-sm text-muted-foreground">
            {filteredFarmers.length} farmers available
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredFarmers.length === 0 ? (
            <div className="col-span-full flex flex-col items-center justify-center py-12 text-center">
              <div className="text-6xl mb-4">🔍</div>
              <h3 className="text-xl font-semibold text-muted-foreground mb-2">
                No matching stock found
              </h3>
              <p className="text-muted-foreground mb-4 max-w-md">
                Try adjusting your filters or search terms to find more farmers and products.
              </p>
              <Button
                variant="outline"
                onClick={() => setFilters({
                  productTypes: [],
                  keyword: "",
                  weightMin: 0,
                  weightMax: 50,
                  priceMin: 0,
                  priceMax: 1000,
                  nearbyOnly: false,
                  bulkOnly: false,
                })}
              >
                Clear All Filters
              </Button>
            </div>
          ) : (
            filteredFarmers.map((farmer) => (
            <Card
              key={farmer.id}
              className="hover:shadow-lg transition-shadow overflow-hidden group"
            >
              {/* Farmer Image */}
              <div className="relative h-40 sm:h-48 overflow-hidden">
                <img
                  src={farmer.image || "/placeholder.svg"}
                  alt={farmer.name}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                />
                {farmer.verified && (
                  <Badge className="absolute top-3 right-3 bg-accent text-accent-foreground gap-1">
                    <ShieldCheck className="h-3 w-3" />
                    Verified
                  </Badge>
                )}
              </div>

              <CardHeader className="pb-3">
                <div className="flex items-start justify-between">
                  <div>
                    <CardTitle className="text-lg">{farmer.name}</CardTitle>
                    <p className="text-sm text-muted-foreground flex items-center gap-1 mt-1">
                      <MapPin className="h-3 w-3" />
                      {farmer.village} • {farmer.distance}
                    </p>
                  </div>
                  <div className="flex items-center gap-1 bg-primary/10 px-2 py-1 rounded-md">
                    <Star className="h-4 w-4 fill-primary text-primary" />
                    <span className="text-sm font-semibold">
                      {farmer.rating}
                    </span>
                  </div>
                </div>
              </CardHeader>

              <CardContent className="space-y-3">
                {farmer.products.map((product, idx) => (
                  <div key={idx} className="border-t pt-3">
                    <div className="flex items-start justify-between mb-2">
                      <div>
                        <p className="font-semibold text-foreground">
                          {product.type}
                        </p>
                        <p className="text-xs text-muted-foreground">
                          {product.breed}
                        </p>
                      </div>
                      <div className="text-right">
                        <p className="text-lg font-bold text-primary">
                          ₹{product.price}/kg
                        </p>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-2 text-xs text-muted-foreground mb-3">
                      <div>
                        <span className="font-medium">Weight:</span>{" "}
                        {product.weightRangeMin + "-" + product.weightRangeMax + "kg"}
                      </div>
                      <div>
                        <span className="font-medium">Age:</span> {product.age}
                      </div>
                      <div className="col-span-2 flex items-center gap-2">
                        <span className="font-medium">Available:</span>{" "}
                        <span className="text-primary font-semibold">
                          {product.available} units
                        </span>
                        {product.bulkAvailable && (
                          <Badge variant="secondary" className="text-xs gap-1 bg-blue-100 text-blue-800">
                            <ChefHat className="h-3 w-3" />
                            Bulk Available
                          </Badge>
                        )}
                      </div>
                    </div>

                    <div className="flex gap-2">
                      <Button
                        size="sm"
                        variant="outline"
                        className="flex-1 gap-1 bg-transparent"
                        onClick={() =>
                          alert(
                            `Viewing video for ${farmer.name}'s ${product.type}`
                          )
                        }
                      >
                        <Video className="h-4 w-4" />
                        View Video
                      </Button>
                      <div className="flex-1 flex items-center justify-center gap-1">
                        {(() => {
                          const currentQuantity = getItemQuantity(
                            farmer.id,
                            product.type,
                            product.breed
                          );
                          const canAdd = canAddItem(
                            farmer.id,
                            product.type,
                            product.breed,
                            product.available
                          );
                          const canIncrease =
                            currentQuantity < product.available;
                          const canDecrease = currentQuantity > 0;

                          if (currentQuantity === 0) {
                            return (
                              <Button
                                size="sm"
                                className="w-full"
                                disabled={!canAdd}
                                onClick={() =>
                                  addToCart(farmer as Farmer, product)
                                }
                              >
                                <ShoppingCart className="h-4 w-4 mr-1" />
                                {canAdd ? "Add to Cart" : "Out of Stock"}
                              </Button>
                            );
                          }

                          return (
                            <div className="flex items-center gap-1 bg-primary/10 rounded-md p-1">
                              <Button
                                size="sm"
                                variant="ghost"
                                className="h-8 w-8 p-0 hover:bg-primary/20"
                                disabled={!canDecrease}
                                onClick={() =>
                                  decreaseQuantity(
                                    `${farmer.id}-${product.type}-${product.breed}`
                                      .replace(/\s+/g, "-")
                                      .toLowerCase()
                                  )
                                }
                              >
                                <Minus className="h-4 w-4" />
                              </Button>
                              <span className="w-8 text-center font-semibold text-sm">
                                {currentQuantity}
                              </span>
                              <Button
                                size="sm"
                                variant="ghost"
                                className="h-8 w-8 p-0 hover:bg-primary/20"
                                disabled={!canIncrease}
                                onClick={() =>
                                  increaseQuantity(
                                    `${farmer.id}-${product.type}-${product.breed}`
                                      .replace(/\s+/g, "-")
                                      .toLowerCase()
                                  )
                                }
                              >
                                <Plus className="h-4 w-4" />
                              </Button>
                            </div>
                          );
                        })()}
                      </div>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          ))
        )}
        </div>

        {/* Bulk Order CTA */}
        {selectedCategory === "all" && (
          <Card className="mt-8 bg-gradient-to-r from-secondary/10 via-primary/10 to-accent/10 border-2 border-primary/20">
            <CardContent className="p-6 text-center">
              <ShoppingCart className="h-12 w-12 mx-auto mb-3 text-primary" />
              <h3 className="text-2xl font-bold mb-2">
                Function Hall Bulk Orders
              </h3>
              <p className="text-muted-foreground mb-4 max-w-2xl mx-auto">
                Need 20-80kg of fresh meat for weddings, ceremonies or events?
                Get special pricing with live cutting, video verification and
                guaranteed delivery.
              </p>
              <Link href="/customer/bulk">
                <Button
                  size="lg"
                  className="bg-secondary hover:bg-secondary/90"
                >
                  Place Bulk Order
                </Button>
              </Link>
            </CardContent>
          </Card>
        )}
      </div>


      </div>
  );
}
