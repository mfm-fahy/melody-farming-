"use client";

import { useState, useMemo, useEffect } from "react";
import { useRouter } from "next/navigation";
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
  Users,
  Calendar,
  Package,
  Filter,
  Truck,
} from "lucide-react";
import Link from "next/link";
import { useCart } from "@/hooks/use-cart";
import { Farmer } from "@/lib/cart-utils";
import { FloatingCartButton } from "@/components/floating-cart-button";
import { FarmerCardSkeleton } from "@/components/ui/skeleton";
import { useFavorites } from "@/hooks/use-favorites";
import { QuickFilters } from "@/components/quick-filters";
import { SortDropdown } from "@/components/sort-dropdown";

export default function CustomerPage() {
  const router = useRouter();
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [currentBannerIndex, setCurrentBannerIndex] = useState(0);
  const [placeholderIndex, setPlaceholderIndex] = useState(0);
  const [quickFilters, setQuickFilters] = useState<string[]>([]);
  const [sortBy, setSortBy] = useState("distance");
  const [currentScreen, setCurrentScreen] = useState(0);
  const [touchStart, setTouchStart] = useState(0);
  const [touchEnd, setTouchEnd] = useState(0);

  const bannerImages = [
    "/banner-1.jpeg",
    "/banner-2.jpeg",
    "/banner-3.jpeg",
    "/banner-4.jpeg",
  ];

  const placeholders = [
    "Search for chicken...",
    "Search for mutton...",
    "Search for milk...",
    "Search for vegetables...",
    "Search for dairy products...",
    "Search for nuts...",
  ];

  useEffect(() => {
    const userData = localStorage.getItem("melody_current_user");
    if (!userData) {
      router.push("/auth");
    } else {
      setUser(JSON.parse(userData));
      setLoading(false);
    }
  }, [router]);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentBannerIndex((prev) => (prev + 1) % bannerImages.length);
    }, 3000);
    return () => clearInterval(interval);
  }, [bannerImages.length]);

  useEffect(() => {
    const interval = setInterval(() => {
      setPlaceholderIndex((prev) => (prev + 1) % placeholders.length);
    }, 2000);
    return () => clearInterval(interval);
  }, [placeholders.length]);

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
  const { favorites, toggleFavorite, isFavorite } = useFavorites();
  const {
    cartSummary,
    addToCart,
    increaseQuantityByProduct,
    decreaseQuantityByProduct,
    getItemQuantity,
    canAddItem,
  } = useCart();

  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStart(e.targetTouches[0].clientX);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const handleTouchEnd = () => {
    if (!touchStart || !touchEnd) return;
    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > 50;
    const isRightSwipe = distance < -50;

    if (isLeftSwipe && currentScreen < 2) {
      setCurrentScreen(currentScreen + 1);
    }
    if (isRightSwipe && currentScreen > 0) {
      setCurrentScreen(currentScreen - 1);
    }
    setTouchStart(0);
    setTouchEnd(0);
  };

  const farmTypes = [
    { id: "goat", name: "Goat Farm", icon: Beef, image: "https://images.unsplash.com/photo-1516467508483-a7212febe31a?w=400&h=300&fit=crop", bgColor: "#fef3c7" },
    { id: "chicken", name: "Poultry Farm", icon: ChefHat, image: "https://images.unsplash.com/photo-1548550023-2bdb3c5beed7?w=400&h=300&fit=crop", bgColor: "#ffedd5" },
    { id: "dairy", name: "Dairy Farm", icon: Milk, image: "https://images.unsplash.com/photo-1563636619-e9143da7973b?w=400&h=300&fit=crop", bgColor: "#e0f2fe" },
    { id: "vegetables", name: "Vegetable Farm", icon: Carrot, image: "https://images.unsplash.com/photo-1464226184884-fa280b87c399?w=400&h=300&fit=crop", bgColor: "#dcfce7" },
  ];

  const byProducts = [
    { id: "dried-meat", name: "Dried Meat", image: "https://images.unsplash.com/photo-1607623814075-e51df1bdc82f?w=400&h=300&fit=crop", bgColor: "#fef3c7" },
    { id: "dried-veg", name: "Dried Vegetables", image: "https://images.unsplash.com/photo-1566385101042-1a0aa0c1268c?w=400&h=300&fit=crop", bgColor: "#dcfce7" },
    { id: "groundnut", name: "Groundnut Haulms", image: "https://images.unsplash.com/photo-1589927986089-35812388d1f4?w=400&h=300&fit=crop", bgColor: "#f3e8ff" },
    { id: "eggs", name: "Country Eggs", image: "https://images.unsplash.com/photo-1582722872445-44dc5f7e3c8f?w=400&h=300&fit=crop", bgColor: "#ffedd5" },
  ];

  const categories = [
    { id: "all", name: "All Products", icon: Home, image: "https://images.unsplash.com/photo-1488459716781-31db52582fe9?w=200&h=200&fit=crop", bgColor: "#f1f5f9" },
    { id: "chicken", name: "Desi Chicken", icon: ChefHat, image: "https://images.unsplash.com/photo-1587593810167-a84920ea0781?w=200&h=200&fit=crop", bgColor: "#ffedd5" },
    { id: "mutton", name: "Organic Mutton", icon: Beef, image: "https://images.unsplash.com/photo-1602470520998-f4a52199a3d6?w=200&h=200&fit=crop", bgColor: "#fef3c7" },
    { id: "milk", name: "Fresh Milk", icon: Milk, image: "https://images.unsplash.com/photo-1563636619-e9143da7973b?w=200&h=200&fit=crop", bgColor: "#e0f2fe" },
    { id: "dairy", name: "Dairy Products", icon: Milk, image: "https://images.unsplash.com/photo-1628088062854-d1870b4553da?w=200&h=200&fit=crop", bgColor: "#e0f2fe" },
    { id: "vegetables", name: "Vegetables", icon: Carrot, image: "https://images.unsplash.com/photo-1540420773420-3366772f4999?w=200&h=200&fit=crop", bgColor: "#dcfce7" },
    { id: "nuts", name: "Nuts & By-Products", icon: Package, image: "https://images.unsplash.com/photo-1508747703725-719777637510?w=200&h=200&fit=crop", bgColor: "#f3e8ff" },
    { id: "bulk", name: "Function Halls", icon: ShoppingCart, image: "https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?w=200&h=200&fit=crop", bgColor: "#fef3c7" },
  ];

  const farmers = useMemo(
    () => [
      {
        id: 1,
        name: "Raju Goats",
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
            price: 22000,
            category: "mutton",
            bulkAvailable: true,
          },
          {
            type: "Mutton ",
            breed: "ready to cook",
            weightRangeMin: 1,
            weightRangeMax: 1,
            age: "Daily Fresh",
            available: 25,
            price: 750,
            category: "mutton",
            bulkAvailable: false,
          },
        ],
        image: "https://images.unsplash.com/photo-1516467508483-a7212febe31a?w=800&h=600&fit=crop",
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
        image: "https://images.unsplash.com/photo-1548550023-2bdb3c5beed7?w=800&h=600&fit=crop",
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
        image: "https://images.unsplash.com/photo-1563636619-e9143da7973b?w=800&h=600&fit=crop",
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
        image: "https://images.unsplash.com/photo-1464226184884-fa280b87c399?w=800&h=600&fit=crop",
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
        image: "https://images.unsplash.com/photo-1628088062854-d1870b4553da?w=800&h=600&fit=crop",
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
        image: "https://images.unsplash.com/photo-1602470520998-f4a52199a3d6?w=800&h=600&fit=crop",
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
        image: "https://images.unsplash.com/photo-1592921870789-04563d55041c?w=800&h=600&fit=crop",
      },
    ],
    []
  );

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
          ((p as any).weightRangeMax ?? (p as any).weightMax ?? 0) >=
            filters.weightMin &&
          ((p as any).weightRangeMin ?? (p as any).weightMin ?? 0) <=
            filters.weightMax
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
      const aAvgPrice =
        a.products.reduce((sum, p) => sum + p.price, 0) / a.products.length;
      const bAvgPrice =
        b.products.reduce((sum, p) => sum + p.price, 0) / b.products.length;
      return aAvgPrice - bAvgPrice;
    });

    return filtered;
  }, [filters, farmers]);

  if (loading) {
    return (
      <div className="min-h-screen">
        <header className="sticky top-0 z-50 bg-gradient-to-r from-primary to-primary/90 shadow-lg">
          <div className="container mx-auto px-4 py-4">
            <div className="h-12 bg-white/20 rounded animate-pulse" />
          </div>
        </header>
        <div className="container mx-auto px-4 py-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <FarmerCardSkeleton key={i} />
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white" onTouchStart={handleTouchStart} onTouchMove={handleTouchMove} onTouchEnd={handleTouchEnd}>
      {/* Header */}
      <header className="sticky top-0 z-50 bg-gradient-to-r from-primary to-primary/90 shadow-lg">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Link href="/customer/settings">
                <Button variant="ghost" size="icon" className="text-white hover:bg-white/20">
                  <Settings className="h-5 w-5" />
                </Button>
              </Link>
              <div>
                <h1 className="text-2xl font-bold text-white">Melody</h1>
                <p className="text-sm text-white/90 flex items-center gap-1">
                  <MapPin className="h-3 w-3" />
                  Hyderabad Area
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <Button
                variant="ghost"
                size="icon"
                aria-label="Filters"
                className="relative text-white hover:bg-white/20"
                onClick={() => setShowFilters(!showFilters)}
              >
                <Filter className="h-5 w-5" />
                {Object.values(filters).some((v) =>
                  Array.isArray(v)
                    ? v.length > 0
                    : v !== "" && v !== false && v !== 0 && v !== 50 && v !== 1000
                ) && (
                  <span className="absolute -top-1 -right-1 h-4 w-4 bg-secondary rounded-full flex items-center justify-center text-xs text-white font-bold">
                    !
                  </span>
                )}
              </Button>
              <Link href="/customer/services">
                <Button
                  variant="ghost"
                  size="icon"
                  aria-label="Open services"
                  className="relative text-white hover:bg-white/20"
                >
                  <Users className="h-5 w-5" />
                </Button>
              </Link>
              <Link href="/customer/butcher">
                <div className="w-9 h-9 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center hover:bg-white/30 transition-all duration-300 cursor-pointer shadow-lg p-0.5 hover:shadow-[0_0_20px_rgba(255,248,220,0.8)]">
                  <img 
                    src="/butcher-icon.png" 
                    alt="Butcher"
                    className="w-[110%] h-[110%] object-contain drop-shadow-[0_0_12px_rgba(255,248,220,0.9)]"
                  />
                </div>
              </Link>
            </div>
          </div>

          {/* Search Bar and Filters */}
          <div className="mt-4 space-y-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-muted-foreground z-10" />
              <Input
                placeholder={placeholders[placeholderIndex]}
                className="pl-10 bg-white border-white/20"
                value={filters.keyword}
                onChange={(e) =>
                  setFilters((prev) => ({ ...prev, keyword: e.target.value }))
                }
              />
            </div>

            {/* Advanced Filters */}
            {showFilters && (
              <Card className="p-4">
                <div className="space-y-4">
                  {/* Product Types */}
                  <div>
                    <Label className="text-sm font-medium">Product Types</Label>
                    <div className="flex flex-wrap gap-2 mt-2">
                      {["Goat", "Sheep", "Desi Chicken"].map((type) => (
                        <div key={type} className="flex items-center space-x-2">
                          <Checkbox
                            id={type}
                            checked={filters.productTypes.includes(type)}
                            onCheckedChange={(checked) => {
                              if (checked) {
                                setFilters((prev) => ({
                                  ...prev,
                                  productTypes: [...prev.productTypes, type],
                                }));
                              } else {
                                setFilters((prev) => ({
                                  ...prev,
                                  productTypes: prev.productTypes.filter(
                                    (t) => t !== type
                                  ),
                                }));
                              }
                            }}
                          />
                          <Label htmlFor={type} className="text-sm">
                            {type}
                          </Label>
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
                        setFilters((prev) => ({
                          ...prev,
                          weightMin: min,
                          weightMax: max,
                        }))
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
                        setFilters((prev) => ({
                          ...prev,
                          priceMin: min,
                          priceMax: max,
                        }))
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
                          setFilters((prev) => ({
                            ...prev,
                            nearbyOnly: !!checked,
                          }))
                        }
                      />
                      <Label htmlFor="nearby" className="text-sm">
                        {"Nearby farmers (< 10km)"}
                      </Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id="bulk"
                        checked={filters.bulkOnly}
                        onCheckedChange={(checked) =>
                          setFilters((prev) => ({
                            ...prev,
                            bulkOnly: !!checked,
                          }))
                        }
                      />
                      <Label htmlFor="bulk" className="text-sm">
                        Bulk/function hall supply available
                      </Label>
                    </div>
                  </div>

                  {/* Clear All Filters */}
                  <Button
                    variant="outline"
                    onClick={() =>
                      setFilters({
                        productTypes: [],
                        keyword: "",
                        weightMin: 0,
                        weightMax: 50,
                        priceMin: 0,
                        priceMax: 1000,
                        nearbyOnly: false,
                        bulkOnly: false,
                      })
                    }
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
      <div className="border-b bg-white shadow-sm">
        <div className="container mx-auto px-4 py-4">
          <div className="flex gap-3 overflow-x-auto pb-2" style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
            <style jsx>{`
              div::-webkit-scrollbar {
                display: none;
              }
            `}</style>
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`flex-shrink-0 w-[90px] h-[100px] rounded-[16px] flex flex-col items-center justify-center gap-1.5 transition-all duration-300 ${
                  selectedCategory === cat.id
                    ? "border-2 border-[#16a34a] shadow-[0_0_20px_rgba(22,163,74,0.3)]"
                    : "border-2 border-transparent shadow-[0_4px_12px_rgba(0,0,0,0.08)] hover:scale-105"
                }`}
                style={{ backgroundColor: cat.bgColor }}
              >
                <div className="w-14 h-14 flex items-center justify-center overflow-hidden rounded-xl">
                  <img 
                    src={cat.image} 
                    alt={cat.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <span className="text-xs font-medium text-center leading-tight px-1">
                  {cat.name}
                </span>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Promotional Banner */}
      <div className="bg-white border-b">
        <div className="container mx-auto px-4 py-4">
          <div className="relative w-full h-[200px] rounded-[20px] overflow-hidden shadow-[0_8px_20px_rgba(0,0,0,0.08)] group cursor-pointer hover:shadow-[0_12px_28px_rgba(0,0,0,0.12)] transition-shadow duration-300">
            {bannerImages.map((image, index) => (
              <img
                key={index}
                src={image}
                alt={`Banner ${index + 1}`}
                className="absolute inset-0 w-full h-full object-cover transition-opacity duration-1000"
                style={{ opacity: currentBannerIndex === index ? 1 : 0 }}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Trust Banner */}
      <div className="bg-white border-b border-accent/30">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-center gap-6 text-sm flex-wrap">
            <div className="flex items-center gap-2 bg-white px-4 py-2 rounded-full shadow-sm">
              <ShieldCheck className="h-5 w-5 text-accent" />
              <span className="font-semibold text-accent">Verified Farmers</span>
            </div>
            <div className="flex items-center gap-2 bg-white px-4 py-2 rounded-full shadow-sm">
              <Video className="h-5 w-5 text-primary" />
              <span className="font-semibold text-primary">Video Verification</span>
            </div>
            <div className="flex items-center gap-2 bg-white px-4 py-2 rounded-full shadow-sm">
              <Truck className="h-5 w-5 text-secondary" />
              <span className="font-semibold text-secondary">Live Tracking</span>
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
          <div className="flex items-center gap-2">
            <p className="text-sm text-muted-foreground">
              {filteredFarmers.length} farmers
            </p>
            <SortDropdown onSortChange={setSortBy} currentSort={sortBy} />
          </div>
        </div>

        <QuickFilters
          onFilterChange={(filter) => {
            setQuickFilters((prev) =>
              prev.includes(filter)
                ? prev.filter((f) => f !== filter)
                : [...prev, filter]
            );
          }}
          activeFilters={quickFilters}
        />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredFarmers.length === 0 ? (
            <div className="col-span-full flex flex-col items-center justify-center py-12 text-center">
              <div className="text-6xl mb-4">🔍</div>
              <h3 className="text-xl font-semibold text-muted-foreground mb-2">
                No matching stock found
              </h3>
              <p className="text-muted-foreground mb-4 max-w-md">
                Try adjusting your filters or search terms to find more farmers
                and products.
              </p>
              <Button
                variant="outline"
                onClick={() =>
                  setFilters({
                    productTypes: [],
                    keyword: "",
                    weightMin: 0,
                    weightMax: 50,
                    priceMin: 0,
                    priceMax: 1000,
                    nearbyOnly: false,
                    bulkOnly: false,
                  })
                }
              >
                Clear All Filters
              </Button>
            </div>
          ) : (
            filteredFarmers.map((farmer) => (
              <Card
                key={farmer.id}
                className="hover:shadow-xl transition-all duration-300 overflow-hidden group cursor-pointer bg-white border-2 border-gray-100 hover:border-primary/30 hover:scale-[1.02]"
                onClick={() => {
                  const firstProduct = farmer.products[0];
                  router.push(`/customer/product?farmerId=${farmer.id}&productType=${encodeURIComponent(firstProduct.type)}&breed=${encodeURIComponent(firstProduct.breed)}`);
                }}
              >
                {/* Farmer Image */}
                <div className="relative h-40 sm:h-48 overflow-hidden">
                  <img
                    src={farmer.image || "/placeholder.svg"}
                    alt={farmer.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                  />
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      toggleFavorite(farmer.id.toString());
                    }}
                    className="absolute top-3 right-3 bg-white/90 hover:bg-white rounded-full p-2 transition-all"
                  >
                    <Heart
                      className={`h-5 w-5 ${
                        isFavorite(farmer.id.toString())
                          ? "fill-red-500 text-red-500"
                          : "text-gray-600"
                      }`}
                    />
                  </button>
                  {farmer.verified && (
                    <Badge className="absolute bottom-3 right-3 bg-accent text-accent-foreground gap-1">
                      <ShieldCheck className="h-3 w-3" />
                      Verified
                    </Badge>
                  )}
                </div>

                <CardHeader className="pb-3 bg-gradient-to-b from-gray-50 to-white">
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

                <CardContent className="space-y-3 bg-white">
                  {farmer.products.map((product, idx) => (
                    <div key={idx} className="border-t pt-3 bg-gradient-to-b from-white to-gray-50/50 rounded-lg p-3 -mx-3">
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
                            {farmer.name === "Raju Goats" ? (
                              <>₹{product.price} </>
                            ) : (
                              <>₹{product.price}/kg</>
                            )}
                          </p>
                        </div>
                      </div>

                      <div className="grid grid-cols-2 gap-2 text-xs text-muted-foreground mb-3">
                        <div>
                          <span className="font-medium">Weight:</span>{" "}
                          {farmer.name === "Raju Goats"
                            ? product.weightRangeMin === product.weightRangeMax
                              ? `${product.weightRangeMin}`
                              : `${product.weightRangeMin}-${product.weightRangeMax}`
                            : `${product.weightRangeMin}-${
                                product.weightRangeMax
                              }${product.category === "milk" ? "L" : "kg"}`}
                        </div>
                        <div>
                          <span className="font-medium">Age:</span>{" "}
                          {product.age}
                        </div>
                        <div className="col-span-2 flex items-center gap-2">
                          <span className="font-medium">Available:</span>{" "}
                          <span className="text-primary font-semibold">
                            {product.available} units
                          </span>
                          {product.bulkAvailable && (
                            <Badge
                              variant="secondary"
                              className="text-xs gap-1 bg-blue-100 text-blue-800"
                            >
                              <ChefHat className="h-3 w-3" />
                              Bulk Available
                            </Badge>
                          )}
                        </div>
                      </div>

                      <div className="flex gap-2" onClick={(e) => e.stopPropagation()}>
                        <div className="flex-1 flex items-center justify-center gap-1">
                          {(() => {
                            const currentQuantity = getItemQuantity(
                              farmer.id.toString(),
                              product.type,
                              product.breed
                            );
                            const canAdd = canAddItem(
                              farmer.id.toString(),
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
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    console.log('Adding to cart:', product.type);
                                    addToCart({
                                      farmerId: farmer.id.toString(),
                                      productType: product.type,
                                      breed: product.breed,
                                      price: product.price,
                                      weight:
                                        product.weightRangeMin &&
                                        product.weightRangeMax
                                          ? `${product.weightRangeMin}-${product.weightRangeMax}kg`
                                          : undefined,
                                      minimumGuaranteedWeight:
                                        product.weightRangeMin,
                                    });
                                  }}
                                >
                                  <ShoppingCart className="h-4 w-4 mr-1" />
                                  {canAdd ? "Add to Cart" : "Out of Stock"}
                                </Button>
                              );
                            }

                            return (
                              <div className="flex items-center gap-1 bg-primary/10 rounded-md p-1 w-full">
                                <Button
                                  size="sm"
                                  variant="ghost"
                                  className="h-8 w-8 p-0 hover:bg-primary/20"
                                  disabled={!canDecrease}
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    console.log('Decreasing quantity');
                                    decreaseQuantityByProduct(
                                      farmer.id.toString(),
                                      product.type,
                                      product.breed
                                    );
                                  }}
                                >
                                  <Minus className="h-4 w-4" />
                                </Button>
                                <span className="flex-1 text-center font-semibold text-sm">
                                  {currentQuantity}
                                </span>
                                <Button
                                  size="sm"
                                  variant="ghost"
                                  className="h-8 w-8 p-0 hover:bg-primary/20"
                                  disabled={!canIncrease}
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    console.log('Increasing quantity');
                                    increaseQuantityByProduct(
                                      farmer.id.toString(),
                                      product.type,
                                      product.breed
                                    );
                                  }}
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
          <Card className="mt-8 border-0 shadow-luxury-lg overflow-hidden relative group">
            <div className="absolute inset-0">
              <img 
                src="https://images.unsplash.com/photo-1519225421980-715cb0215aed?w=1200&h=600&fit=crop" 
                alt="Function Hall"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-br from-primary/90 via-accent/85 to-primary/90" />
            </div>
            <CardContent className="p-10 md:p-12 text-center relative z-10">
              <div className="inline-block px-6 py-2 bg-white/20 backdrop-blur-sm rounded-full mb-4">
                <span className="text-white text-sm font-semibold tracking-wide flex items-center gap-2">
                  <Calendar className="h-4 w-4" />
                  PREMIUM BULK SERVICE
                </span>
              </div>
              <h3 className="text-4xl md:text-5xl font-bold mb-4 text-white drop-shadow-lg">
                Function Hall Bulk Orders
              </h3>
              <p className="text-white/95 mb-8 max-w-2xl mx-auto text-lg md:text-xl leading-relaxed">
                Need 20-80kg of fresh meat for weddings, ceremonies or events?
                Get special pricing with live cutting, video verification and
                guaranteed delivery.
              </p>
              <div className="flex flex-wrap items-center justify-center gap-6 mb-8">
                <div className="flex items-center gap-2 text-white">
                  <div className="w-10 h-10 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center">
                    <ShieldCheck className="h-5 w-5" />
                  </div>
                  <span className="font-medium">Verified Quality</span>
                </div>
                <div className="flex items-center gap-2 text-white">
                  <div className="w-10 h-10 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center">
                    <Video className="h-5 w-5" />
                  </div>
                  <span className="font-medium">Live Cutting</span>
                </div>
                <div className="flex items-center gap-2 text-white">
                  <div className="w-10 h-10 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center">
                    <Truck className="h-5 w-5" />
                  </div>
                  <span className="font-medium">Fast Delivery</span>
                </div>
              </div>
              <Link href="/customer/bulk">
                <Button
                  size="lg"
                  className="bg-white text-primary hover:bg-white/95 hover:scale-105 font-bold text-lg px-10 py-7 rounded-full shadow-2xl transition-all duration-300 group"
                >
                  <ShoppingCart className="h-5 w-5 mr-2 group-hover:animate-bounce" />
                  Place Bulk Order Now
                  <span className="ml-2 group-hover:translate-x-1 transition-transform">→</span>
                </Button>
              </Link>
            </CardContent>
          </Card>
        )}
      </div>
      <FloatingCartButton />
    </div>
  );
}
