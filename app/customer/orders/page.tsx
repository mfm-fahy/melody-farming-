"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ArrowLeft, Package, Clock, CheckCircle2, MapPin, AlertTriangle, Video } from "lucide-react"
import Link from "next/link"

export default function OrdersPage() {
  const activeOrders = [
    {
      id: "ORD-2401",
      farmer: "Raju Goud, Chevella",
      product: "Goat - 24-26kg",
      amount: 18750,
      status: "in_transit",
      date: "2025-12-24",
      time: "11:00 AM",
      eta: "12 mins",
      canComplain: true,
    },
    {
      id: "ORD-2398",
      farmer: "Krishna Dairy, Moinabad",
      product: "Fresh Milk - 10L",
      amount: 650,
      status: "preparing",
      date: "2025-12-24",
      time: "10:30 AM",
      eta: "45 mins",
      canComplain: false,
    },
  ]

  const completedOrders = [
    {
      id: "ORD-2395",
      farmer: "Lakshmi Farms, Shankarpally",
      product: "Desi Chicken - 3kg",
      amount: 3780,
      status: "delivered",
      date: "2025-12-23",
      time: "08:30 AM",
      deliveredAt: "09:15 AM",
      canComplain: false,
    },
    {
      id: "ORD-2392",
      farmer: "Srinivas Organic, Vikarabad",
      product: "Mixed Vegetables - 5kg",
      amount: 225,
      status: "delivered",
      date: "2025-12-22",
      time: "07:00 AM",
      deliveredAt: "08:00 AM",
      canComplain: false,
    },
  ]

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "in_transit":
        return (
          <Badge className="bg-blue-500/10 text-blue-700 border-blue-500/20">
            <MapPin className="h-3 w-3 mr-1" />
            In Transit
          </Badge>
        )
      case "preparing":
        return (
          <Badge className="bg-yellow-500/10 text-yellow-700 border-yellow-500/20">
            <Clock className="h-3 w-3 mr-1" />
            Preparing
          </Badge>
        )
      case "delivered":
        return (
          <Badge className="bg-green-500/10 text-green-700 border-green-500/20">
            <CheckCircle2 className="h-3 w-3 mr-1" />
            Delivered
          </Badge>
        )
      default:
        return null
    }
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="bg-card border-b shadow-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center gap-4">
            <Link href="/customer">
              <Button variant="ghost" size="icon">
                <ArrowLeft className="h-5 w-5" />
              </Button>
            </Link>
            <div>
              <h1 className="text-xl font-bold flex items-center gap-2">
                <Package className="h-5 w-5 text-primary" />
                My Orders
              </h1>
              <p className="text-sm text-muted-foreground">Track and manage your orders</p>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-6">
        <Tabs defaultValue="active" className="space-y-4">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="active" className="gap-2">
              <Clock className="h-4 w-4" />
              Active ({activeOrders.length})
            </TabsTrigger>
            <TabsTrigger value="completed" className="gap-2">
              <CheckCircle2 className="h-4 w-4" />
              Completed ({completedOrders.length})
            </TabsTrigger>
          </TabsList>

          {/* Active Orders */}
          <TabsContent value="active" className="space-y-4">
            {activeOrders.length === 0 ? (
              <Card>
                <CardContent className="p-12 text-center">
                  <Package className="h-16 w-16 mx-auto mb-4 text-muted-foreground opacity-50" />
                  <p className="text-lg font-medium mb-2">No active orders</p>
                  <p className="text-sm text-muted-foreground mb-4">Start shopping for fresh farm products</p>
                  <Link href="/customer">
                    <Button>Browse Products</Button>
                  </Link>
                </CardContent>
              </Card>
            ) : (
              activeOrders.map((order) => (
                <Card key={order.id} className="overflow-hidden">
                  <CardHeader className="pb-3 bg-muted/30">
                    <div className="flex items-start justify-between">
                      <div>
                        <CardTitle className="text-base">{order.id}</CardTitle>
                        <p className="text-sm text-muted-foreground mt-1">
                          {order.date} • {order.time}
                        </p>
                      </div>
                      {getStatusBadge(order.status)}
                    </div>
                  </CardHeader>
                  <CardContent className="pt-4 space-y-4">
                    <div className="space-y-2">
                      <p className="font-semibold">{order.product}</p>
                      <p className="text-sm text-muted-foreground">{order.farmer}</p>
                    </div>

                    <div className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
                      <div>
                        <p className="text-sm text-muted-foreground">Order Amount</p>
                        <p className="text-lg font-bold text-primary">₹{order.amount.toLocaleString()}</p>
                      </div>
                      {order.eta && (
                        <div className="text-right">
                          <p className="text-sm text-muted-foreground">ETA</p>
                          <p className="font-semibold">{order.eta}</p>
                        </div>
                      )}
                    </div>

                    <div className="flex gap-2">
                      <Link href={`/customer/track/${order.id}`} className="flex-1">
                        <Button variant="outline" size="sm" className="w-full gap-1 bg-transparent">
                          <MapPin className="h-4 w-4" />
                          Track Live
                        </Button>
                      </Link>
                      <Button variant="outline" size="sm" className="flex-1 gap-1 bg-transparent">
                        <Video className="h-4 w-4" />
                        View Videos
                      </Button>
                      {order.canComplain && (
                        <Link href={`/customer/complaint/${order.id}`}>
                          <Button variant="outline" size="sm" className="gap-1 bg-transparent">
                            <AlertTriangle className="h-4 w-4" />
                          </Button>
                        </Link>
                      )}
                    </div>
                  </CardContent>
                </Card>
              ))
            )}
          </TabsContent>

          {/* Completed Orders */}
          <TabsContent value="completed" className="space-y-4">
            {completedOrders.map((order) => (
              <Card key={order.id}>
                <CardHeader className="pb-3 bg-muted/30">
                  <div className="flex items-start justify-between">
                    <div>
                      <CardTitle className="text-base">{order.id}</CardTitle>
                      <p className="text-sm text-muted-foreground mt-1">
                        Ordered: {order.date} • {order.time}
                      </p>
                      <p className="text-sm text-muted-foreground">Delivered: {order.deliveredAt}</p>
                    </div>
                    {getStatusBadge(order.status)}
                  </div>
                </CardHeader>
                <CardContent className="pt-4 space-y-4">
                  <div className="space-y-2">
                    <p className="font-semibold">{order.product}</p>
                    <p className="text-sm text-muted-foreground">{order.farmer}</p>
                  </div>

                  <div className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
                    <div>
                      <p className="text-sm text-muted-foreground">Order Amount</p>
                      <p className="text-lg font-bold text-primary">₹{order.amount.toLocaleString()}</p>
                    </div>
                  </div>

                  <div className="flex gap-2">
                    <Button variant="outline" size="sm" className="flex-1 gap-1 bg-transparent">
                      <Video className="h-4 w-4" />
                      View Videos
                    </Button>
                    <Button variant="outline" size="sm" className="flex-1 gap-1 bg-transparent">
                      <Package className="h-4 w-4" />
                      Order Details
                    </Button>
                    <Button variant="outline" size="sm" className="flex-1 gap-1 bg-transparent">
                      Reorder
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
