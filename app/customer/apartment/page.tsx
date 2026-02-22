"use client"

import { useState } from "react"
import Link from "next/link"
import { ArrowLeft, Milk, Beef, Carrot, Calendar, CheckCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { RazorpayPaymentModal } from "@/components/razorpay-payment-modal"

export default function ApartmentSubscriptionPage() {
  const [step, setStep] = useState<"form" | "confirmation">("form")
  const [showPaymentModal, setShowPaymentModal] = useState(false)
  const [selectedSubscription, setSelectedSubscription] = useState<any>(null)
  const [subscriptions, setSubscriptions] = useState([
    { id: 1, type: "milk", product: "Buffalo Milk", quantity: "1L", frequency: "Daily", price: 60, active: true },
  ])

  const subscriptionOptions = [
    { 
      type: "milk", 
      icon: Milk, 
      title: "Milk Subscription", 
      description: "Daily fresh milk delivery",
      frequency: "Daily",
      products: ["Buffalo Milk - 1L (₹60)", "Cow Milk - 1L (₹55)"],
      color: "from-blue-50 to-blue-100"
    },
    { 
      type: "vegetables", 
      icon: Carrot, 
      title: "Vegetables Subscription", 
      description: "Weekly fresh vegetables",
      frequency: "Weekly",
      products: ["Mixed Vegetables - 5kg (₹200)", "Leafy Greens - 2kg (₹80)"],
      color: "from-green-50 to-green-100"
    },
    { 
      type: "meat", 
      icon: Beef, 
      title: "Meat Subscription", 
      description: "Weekly fresh meat delivery",
      frequency: "Weekly",
      products: ["Chicken - 1kg (₹350)", "Mutton - 1kg (₹650)"],
      color: "from-orange-50 to-orange-100"
    },
  ]

  const handleSubscribe = (option: any) => {
    setSelectedSubscription(option)
    setShowPaymentModal(true)
  }

  const handlePaymentSuccess = (paymentId: string) => {
    console.log("Subscription payment successful:", paymentId)
    setShowPaymentModal(false)
    setStep("confirmation")
  }

  return (
    <div className="min-h-screen bg-white">
      <header className="sticky top-0 z-50 bg-gradient-to-r from-primary to-primary/90 shadow-lg">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center gap-4">
            <Link href="/customer">
              <Button variant="ghost" size="icon" className="text-white hover:bg-white/20">
                <ArrowLeft className="h-5 w-5" />
              </Button>
            </Link>
            <div>
              <h1 className="text-2xl font-bold text-white">Apartment Subscription</h1>
              <p className="text-sm text-white/90">Subscribe for daily/weekly deliveries</p>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-6 max-w-4xl">
        {step === "form" && (
          <>
            {/* Active Subscriptions */}
            {subscriptions.length > 0 && (
              <div className="mb-8">
                <h2 className="text-xl font-bold mb-4">Active Subscriptions</h2>
                <div className="space-y-3">
                  {subscriptions.map((sub) => (
                    <Card key={sub.id} className="border-2 border-green-200">
                      <CardContent className="p-4 flex items-center justify-between">
                        <div>
                          <p className="font-bold">{sub.product}</p>
                          <p className="text-sm text-muted-foreground">{sub.quantity} • {sub.frequency}</p>
                        </div>
                        <div className="text-right">
                          <p className="font-bold text-primary">₹{sub.price}/{sub.frequency === "Daily" ? "day" : "week"}</p>
                          <Badge className="bg-green-500">Active</Badge>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            )}

            {/* Subscription Options */}
            <h2 className="text-xl font-bold mb-4">Available Subscriptions</h2>
            <div className="space-y-4">
              {subscriptionOptions.map((option) => (
                <Card key={option.type} className={`hover:shadow-xl transition-all bg-gradient-to-r ${option.color} border-2`}>
                  <CardHeader>
                    <div className="flex items-center gap-4">
                      <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-green-200 to-green-300 flex items-center justify-center shadow-lg">
                        <option.icon className="h-8 w-8 text-green-700" />
                      </div>
                      <div className="flex-1">
                        <CardTitle className="text-xl">{option.title}</CardTitle>
                        <p className="text-sm text-muted-foreground">{option.description}</p>
                        <Badge className="mt-2">{option.frequency} Delivery</Badge>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <Label className="text-sm font-semibold mb-2 block">Select Product</Label>
                      <Select>
                        <SelectTrigger className="bg-white">
                          <SelectValue placeholder="Choose product" />
                        </SelectTrigger>
                        <SelectContent>
                          {option.products.map((product, idx) => (
                            <SelectItem key={idx} value={product}>{product}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>

                    <div>
                      <Label className="text-sm font-semibold mb-2 block">Quantity</Label>
                      <Input type="number" min="1" defaultValue="1" className="bg-white" />
                    </div>

                    <div>
                      <Label className="text-sm font-semibold mb-2 block">Start Date</Label>
                      <Input type="date" className="bg-white" />
                    </div>

                    <Button className="w-full shadow-lg hover:shadow-xl" size="lg" onClick={() => handleSubscribe(option)}>
                      <CheckCircle className="h-5 w-5 mr-2" />
                      Subscribe Now
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Benefits */}
            <Card className="mt-8 bg-gradient-to-r from-primary/5 to-secondary/5 border-2 border-primary/20">
              <CardContent className="p-6">
                <h3 className="font-bold text-lg mb-4 flex items-center gap-2">
                  <Calendar className="h-5 w-5 text-primary" />
                  Subscription Benefits
                </h3>
                <ul className="space-y-2 text-sm">
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-green-600" />
                    <span>Never run out of essentials</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-green-600" />
                    <span>Scheduled deliveries at your convenience</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-green-600" />
                    <span>Pause or cancel anytime</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-green-600" />
                    <span>Fresh products directly from farmers</span>
                  </li>
                </ul>
              </CardContent>
            </Card>
          </>
        )}

        {step === "confirmation" && (
          <Card className="border-2 border-green-500/30">
            <CardContent className="p-8 text-center space-y-6">
              <div className="w-20 h-20 mx-auto bg-green-500/10 rounded-full flex items-center justify-center">
                <CheckCircle className="h-12 w-12 text-green-600" />
              </div>

              <div>
                <h2 className="text-2xl font-bold mb-2">Subscription Activated!</h2>
                <p className="text-muted-foreground">Subscription ID: SUB-{Math.floor(Math.random() * 10000)}</p>
              </div>

              <div className="bg-muted/50 rounded-lg p-6 text-left space-y-3">
                <div className="flex justify-between">
                  <span className="text-sm text-muted-foreground">Subscription:</span>
                  <span className="font-bold">{selectedSubscription?.title}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-muted-foreground">Frequency:</span>
                  <span className="font-semibold">{selectedSubscription?.frequency}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-muted-foreground">Status:</span>
                  <Badge className="bg-green-500">Active</Badge>
                </div>
              </div>

              <div className="bg-blue-500/10 border border-blue-500/30 rounded-lg p-4 text-left">
                <p className="text-sm font-medium text-blue-900 mb-2">What's Next?</p>
                <ul className="text-xs text-blue-800 space-y-1">
                  <li>✓ First delivery will start from selected date</li>
                  <li>✓ You'll receive SMS/WhatsApp before each delivery</li>
                  <li>✓ Pause or modify subscription anytime</li>
                  <li>✓ Fresh products directly from verified farmers</li>
                </ul>
              </div>

              <Link href="/customer">
                <Button className="w-full bg-primary hover:bg-primary/90">
                  Back to Home
                </Button>
              </Link>
            </CardContent>
          </Card>
        )}
      </div>

      {/* Razorpay Payment Modal */}
      <RazorpayPaymentModal
        isOpen={showPaymentModal}
        onClose={() => setShowPaymentModal(false)}
        amount={100}
        orderDetails={{
          orderId: `SUB-${Math.floor(Math.random() * 10000)}`,
          description: selectedSubscription?.title || "Subscription",
          name: "Apartment Subscription",
        }}
        onSuccess={handlePaymentSuccess}
      />
    </div>
  )
}
