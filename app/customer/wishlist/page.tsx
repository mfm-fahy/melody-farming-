"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Heart,
  ShoppingCart,
  MapPin,
  Star,
  ShieldCheck,
  Video,
  X,
  Loader2,
} from "lucide-react";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

interface WishlistItem {
  id: string;
  customer_id: string;
  farmer_id: string;
  product_type: string;
  breed: string;
  quantity: number;
  price_per_unit: number;
  weight: string | null;
  minimum_guaranteed_weight: number | null;
  created_at: string;
  updated_at: string;
  farmer: {
    name: string;
    village: string;
    phone: string;
    is_verified: boolean;
  };
}

export default function WishlistScreen() {
  const router = useRouter();
  const [wishlistItems, setWishlistItems] = useState<WishlistItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    const userData = localStorage.getItem("melody_current_user");
    if (!userData) {
      router.push("/auth");
      return;
    }
    setUser(JSON.parse(userData));
  }, [router]);

  useEffect(() => {
    if (user) {
      fetchWishlist();
    }
  }, [user]);

  const fetchWishlist = async () => {
    try {
      const response = await fetch(`/api/wishlist?customerId=${user.id}`);
      if (response.ok) {
        const data = await response.json();
        setWishlistItems(data.wishlist || []);
      }
    } catch (error) {
      console.error("Error fetching wishlist:", error);
    } finally {
      setLoading(false);
    }
  };

  const removeFromWishlist = async (itemId: string) => {
    try {
      const response = await fetch(
        `/api/wishlist?customerId=${user.id}&itemId=${itemId}`,
        {
          method: "DELETE",
        }
      );
      if (response.ok) {
        setWishlistItems(wishlistItems.filter((item) => item.id !== itemId));
      }
    } catch (error) {
      console.error("Error removing from wishlist:", error);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-6">
      <div className="mb-6">
        <h1 className="text-2xl font-bold mb-2">My Wishlist</h1>
        <p className="text-muted-foreground">Your saved farm-fresh favorites</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {wishlistItems.map((item) => (
          <Card key={item.id} className="overflow-hidden group relative">
            {/* Remove from wishlist button */}
            <Button
              variant="ghost"
              size="icon"
              className="absolute top-2 right-2 z-10 bg-white/80 hover:bg-white"
              onClick={() => removeFromWishlist(item.id)}
            >
              <X className="h-4 w-4" />
            </Button>

            {/* Product Image */}
            <div className="relative h-40 sm:h-48 overflow-hidden">
              <img
                src="/placeholder.svg"
                alt={item.farmer.name}
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
              />
              {item.farmer.is_verified && (
                <Badge className="absolute top-3 left-3 bg-accent text-accent-foreground gap-1">
                  <ShieldCheck className="h-3 w-3" />
                  Verified
                </Badge>
              )}
            </div>

            <CardHeader className="pb-3">
              <div className="flex items-start justify-between">
                <div>
                  <CardTitle className="text-lg">{item.farmer.name}</CardTitle>
                  <p className="text-sm text-muted-foreground flex items-center gap-1 mt-1">
                    <MapPin className="h-3 w-3" />
                    {item.farmer.village}
                  </p>
                </div>
                <div className="flex items-center gap-1 bg-primary/10 px-2 py-1 rounded-md">
                  <Star className="h-4 w-4 fill-primary text-primary" />
                  <span className="text-sm font-semibold">4.5</span>
                </div>
              </div>
            </CardHeader>

            <CardContent className="space-y-3">
              <div className="border-t pt-3">
                <div className="flex items-start justify-between mb-2">
                  <div>
                    <p className="font-semibold text-foreground">
                      {item.product_type}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      {item.breed}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="text-lg font-bold text-primary">
                      ₹{item.price_per_unit}/kg
                    </p>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-2 text-xs text-muted-foreground mb-3">
                  <div>
                    <span className="font-medium">Weight:</span>{" "}
                    {item.weight || "N/A"}
                  </div>
                  <div>
                    <span className="font-medium">Quantity:</span>{" "}
                    {item.quantity}
                  </div>
                  <div className="col-span-2">
                    <span className="font-medium">Min Weight:</span>{" "}
                    <span className="text-primary font-semibold">
                      {item.minimum_guaranteed_weight || "N/A"} kg
                    </span>
                  </div>
                </div>

                <div className="flex gap-2">
                  <Button
                    size="sm"
                    variant="outline"
                    className="flex-1 gap-1 bg-transparent"
                  >
                    <Video className="h-4 w-4" />
                    View Video
                  </Button>
                  <Button size="sm" className="flex-1">
                    <ShoppingCart className="h-4 w-4 mr-1" />
                    Add to Cart
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {wishlistItems.length === 0 && (
        <div className="text-center py-12">
          <Heart className="h-16 w-16 mx-auto mb-4 text-muted-foreground" />
          <h3 className="text-xl font-semibold mb-2">Your wishlist is empty</h3>
          <p className="text-muted-foreground mb-4">
            Start adding your favorite farm-fresh products
          </p>
          <Button>Explore Products</Button>
        </div>
      )}
    </div>
  );
}
