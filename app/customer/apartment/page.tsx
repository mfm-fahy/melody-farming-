"use client"

import { useState } from "react"
import Link from "next/link"
import { ArrowLeft, Users, Building2, TrendingDown, CheckCircle, Plus } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"

export default function ApartmentBookingPage() {
  const [groupOrders] = useState([
    {
      id: 1,
      apartmentName: "Green Valley Apartments",
      families: 12,
      totalAmount: 8400,
      discount: 1260,
      finalAmount: 7140,
      status: "active",
      nextDelivery: "Saturday, 8:00 AM",
    },
  ])

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-cream to-green-50">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-white/95 backdrop-blur border-b border-green-100 shadow-sm">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Link href="/customer">
                <Button variant="ghost" size="icon" className="hover:bg-green-50">
                  <ArrowLeft className="w-5 h-5" />
                </Button>
              </Link>
              <div>
                <h1 className="text-2xl font-bold text-farm-green">Apartment Group Booking</h1>
                <p className="text-sm text-muted-foreground">Save more when 10+ families order together</p>
              </div>
            </div>

            <Dialog>
              <DialogTrigger asChild>
                <Button className="bg-farm-green hover:bg-farm-green/90">
                  <Plus className="w-4 h-4 mr-2" />
                  Create Group
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Create Apartment Group Order</DialogTitle>
                </DialogHeader>
                <div className="space-y-4 pt-4">
                  <div>
                    <Label>Apartment Name</Label>
                    <Input placeholder="e.g., Green Valley Apartments" />
                  </div>
                  <div>
                    <Label>Number of Families</Label>
                    <Input type="number" placeholder="Minimum 10 families" />
                  </div>
                  <div>
                    <Label>Delivery Address</Label>
                    <Input placeholder="Gate/Common area" />
                  </div>
                  <div>
                    <Label>Preferred Day & Time</Label>
                    <Input type="datetime-local" />
                  </div>
                  <Button className="w-full bg-farm-green hover:bg-farm-green/90">
                    Create Group - Get 15% Discount
                  </Button>
                </div>
              </DialogContent>
            </Dialog>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8 max-w-6xl">
        {/* Benefits Banner */}
        <Card className="p-6 mb-8 bg-gradient-to-r from-blue-500 to-indigo-600 text-white">
          <div className="flex items-start gap-4">
            <Building2 className="w-12 h-12" />
            <div className="flex-1">
              <h2 className="text-xl font-bold mb-2">Apartment Group Benefits</h2>
              <div className="grid md:grid-cols-3 gap-4 text-sm">
                <div>
                  <div className="font-semibold">Save 15%</div>
                  <div className="opacity-90">Bulk discount for 10+ families</div>
                </div>
                <div>
                  <div className="font-semibold">One Delivery</div>
                  <div className="opacity-90">Combined delivery to gate/common area</div>
                </div>
                <div>
                  <div className="font-semibold">Priority Service</div>
                  <div className="opacity-90">Preferred time slot & faster delivery</div>
                </div>
              </div>
            </div>
          </div>
        </Card>

        {/* How It Works */}
        <Card className="p-6 mb-8">
          <h2 className="text-xl font-bold mb-4">How Apartment Group Booking Works</h2>
          <div className="grid md:grid-cols-4 gap-4">
            {[
              { step: 1, title: "Create Group", desc: "Start a group order for your apartment" },
              { step: 2, title: "Invite Neighbors", desc: "Share code with 10+ families" },
              { step: 3, title: "Place Orders", desc: "Each family adds their items" },
              { step: 4, title: "Get Delivery", desc: "One combined delivery with 15% off" },
            ].map((item) => (
              <div key={item.step} className="text-center">
                <div className="w-12 h-12 rounded-full bg-farm-green text-white font-bold text-xl flex items-center justify-center mx-auto mb-2">
                  {item.step}
                </div>
                <h3 className="font-semibold mb-1">{item.title}</h3>
                <p className="text-sm text-muted-foreground">{item.desc}</p>
              </div>
            ))}
          </div>
        </Card>

        {/* Active Group Orders */}
        <div className="mb-8">
          <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
            <Users className="w-5 h-5 text-farm-green" />
            Your Group Orders ({groupOrders.length})
          </h2>
          <div className="space-y-4">
            {groupOrders.map((order) => (
              <Card key={order.id} className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h3 className="font-bold text-lg flex items-center gap-2">
                      {order.apartmentName}
                      <Badge className="bg-green-500">Active</Badge>
                    </h3>
                    <p className="text-sm text-muted-foreground flex items-center gap-1 mt-1">
                      <Users className="w-4 h-4" />
                      {order.families} families participating
                    </p>
                  </div>
                  <Button variant="outline">Manage Group</Button>
                </div>

                <div className="grid md:grid-cols-4 gap-4 mb-4">
                  <div className="text-center p-4 bg-gray-50 rounded-lg">
                    <div className="text-2xl font-bold text-gray-400 line-through">₹{order.totalAmount}</div>
                    <div className="text-xs text-muted-foreground">Original</div>
                  </div>
                  <div className="text-center p-4 bg-green-50 rounded-lg">
                    <div className="text-2xl font-bold text-green-600">-₹{order.discount}</div>
                    <div className="text-xs text-muted-foreground">Group Discount (15%)</div>
                  </div>
                  <div className="text-center p-4 bg-farm-green/10 rounded-lg">
                    <div className="text-2xl font-bold text-farm-green">₹{order.finalAmount}</div>
                    <div className="text-xs text-muted-foreground">Final Amount</div>
                  </div>
                  <div className="text-center p-4 bg-blue-50 rounded-lg">
                    <div className="text-lg font-bold text-blue-600">
                      ₹{Math.round(order.finalAmount / order.families)}
                    </div>
                    <div className="text-xs text-muted-foreground">Per Family (Avg)</div>
                  </div>
                </div>

                <div className="flex items-center justify-between p-4 bg-blue-50 rounded-lg">
                  <div className="flex items-center gap-2">
                    <CheckCircle className="w-5 h-5 text-farm-green" />
                    <span className="font-semibold">Next Delivery:</span>
                  </div>
                  <span className="text-farm-green font-bold">{order.nextDelivery}</span>
                </div>
              </Card>
            ))}
          </div>
        </div>

        {/* Example Savings */}
        <Card className="p-6 bg-gradient-to-br from-green-50 to-blue-50 border-2 border-green-200">
          <div className="flex items-start gap-4">
            <TrendingDown className="w-12 h-12 text-farm-green" />
            <div>
              <h3 className="font-bold text-lg mb-2">Example: 10 Families Ordering Together</h3>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span>Each family orders ₹700 worth products</span>
                  <span className="font-semibold">₹7,000 total</span>
                </div>
                <div className="flex justify-between text-green-600">
                  <span>15% Group Discount</span>
                  <span className="font-semibold">- ₹1,050</span>
                </div>
                <div className="flex justify-between text-lg font-bold text-farm-green pt-2 border-t">
                  <span>Final Amount</span>
                  <span>₹5,950</span>
                </div>
                <div className="flex justify-between text-blue-600">
                  <span>Per Family Savings</span>
                  <span className="font-semibold">₹105 each!</span>
                </div>
              </div>
            </div>
          </div>
        </Card>
      </div>
    </div>
  )
}
