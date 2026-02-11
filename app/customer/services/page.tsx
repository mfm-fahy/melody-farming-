"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  ArrowLeft,
  Users,
  Wrench,
  Droplets,
  Zap,
  Hammer,
  Calendar,
  ChefHat,
  Stethoscope,
  Star,
  Search,
  CheckCircle2,
} from "lucide-react";

const services = [
  {
    id: "function-hall-workers",
    name: "Function Hall Workers",
    icon: Users,
    description: "Skilled staff for event setup, serving, and cleanup",
    price: "₹800/day",
    category: "Event Services",
    rating: 4.8,
    available: true,
  },
  {
    id: "mechanic",
    name: "Mechanic Workers",
    icon: Wrench,
    description: "Professional mechanics for vehicle repairs and maintenance",
    price: "₹500/visit",
    category: "Technical Services",
    rating: 4.6,
    available: true,
  },
  {
    id: "plumbers",
    name: "Plumbers",
    icon: Droplets,
    description: "Expert plumbing services for installation and repairs",
    price: "₹400/visit",
    category: "Technical Services",
    rating: 4.7,
    available: true,
  },
  {
    id: "electrician",
    name: "Electrician",
    icon: Zap,
    description: "Certified electricians for electrical work and repairs",
    price: "₹450/visit",
    category: "Technical Services",
    rating: 4.9,
    available: true,
  },
  {
    id: "construction",
    name: "Construction Workers",
    icon: Hammer,
    description: "Skilled construction workers for building and renovation",
    price: "₹600/day",
    category: "Construction",
    rating: 4.5,
    available: true,
  },
  {
    id: "function-hall-events",
    name: "Function Hall Events",
    icon: Calendar,
    description: "Complete event management for weddings and functions",
    price: "₹2,500/event",
    category: "Event Services",
    rating: 4.8,
    available: true,
  },
  {
    id: "butcher",
    name: "Professional Butcher",
    icon: ChefHat,
    description: "Expert butchers for meat preparation and cutting",
    price: "₹1,200/service",
    category: "Food Services",
    rating: 4.7,
    available: true,
  },
  {
    id: "veterinary",
    name: "Veterinary Services",
    icon: Stethoscope,
    description: "Animal healthcare and veterinary consultations",
    price: "₹300/visit",
    category: "Healthcare",
    rating: 4.6,
    available: true,
  },
];

const categories = [
  "All Services",
  "Event Services",
  "Technical Services",
  "Construction",
  "Food Services",
  "Healthcare",
];

export default function ServicesPage() {
  const router = useRouter();
  const [selectedCategory, setSelectedCategory] = useState("All Services");
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedService, setSelectedService] = useState<string | null>(null);
  const [bookingForm, setBookingForm] = useState({
    name: "",
    phone: "",
    address: "",
    date: "",
    time: "",
    requirements: "",
    quantity: 1,
  });
  const [showConfirmation, setShowConfirmation] = useState(false);

  const filteredServices = services.filter((service) => {
    const matchesCategory = selectedCategory === "All Services" || service.category === selectedCategory;
    const matchesSearch = service.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         service.description.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const handleBooking = () => {
    // Handle booking logic here
    alert("Booking request submitted! Our team will contact you shortly.");
    setSelectedService(null);
    setBookingForm({
      name: "",
      phone: "",
      address: "",
      date: "",
      time: "",
      requirements: "",
      quantity: 1,
    });
    setShowConfirmation(true);
  };

  if (showConfirmation) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center p-4">
        <Card className="max-w-md w-full border-2 border-green-500/30">
          <CardContent className="p-8 text-center space-y-6">
            <div className="w-20 h-20 mx-auto bg-green-500/10 rounded-full flex items-center justify-center">
              <CheckCircle2 className="h-12 w-12 text-green-600" />
            </div>
            <div>
              <h2 className="text-2xl font-bold mb-2">Service Booked!</h2>
              <p className="text-muted-foreground">
                Booking ID: {`BK-${Math.floor(Math.random() * 10000)}`}
              </p>
            </div>
            <div className="bg-muted/50 rounded-lg p-4 text-left space-y-2">
              <div className="flex justify-between">
                <span className="text-sm text-muted-foreground">
                  Service:
                </span>
                <span className="font-medium">
                  {services.find(s => s.id === selectedService)?.name}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-muted-foreground">
                  ETA:
                </span>
                <span className="font-medium">Within 2 hours</span>
              </div>
            </div>
            <div className="bg-blue-500/10 border border-blue-500/30 rounded-lg p-4 text-left">
              <p className="text-sm font-medium text-blue-900 mb-2">
                What's Next?
              </p>
              <ul className="text-xs text-blue-800 space-y-1">
                <li>✓ Service provider will be assigned</li>
                <li>✓ Live tracking available</li>
                <li>✓ Quality assurance check</li>
                <li>✓ Payment after service completion</li>
              </ul>
            </div>
            <div className="flex gap-3">
              <Button
                variant="outline"
                className="flex-1 bg-transparent"
                onClick={() => router.push("/customer")}
              >
                Back to Home
              </Button>
              <Button
                className="flex-1"
                onClick={() => {
                  setShowConfirmation(false);
                  setSelectedService(null);
                }}
              >
                Book Another Service
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="bg-card border-b shadow-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center gap-4">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => router.push("/customer")}
            >
              <ArrowLeft className="h-5 w-5" />
            </Button>
            <div>
              <h1 className="text-xl font-bold flex items-center gap-2">
                <Users className="h-5 w-5 text-primary" />
                Services
              </h1>
              <p className="text-sm text-muted-foreground">
                Professional services at your doorstep
              </p>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-6 max-w-6xl">
        {!selectedService ? (
          <>
            {/* Search */}
            <div className="mb-6">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                <Input
                  placeholder="Search services..."
                  className="pl-10"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
            </div>

            {/* Categories */}
            <div className="mb-6">
              <div className="flex gap-2 overflow-x-auto pb-2">
                {categories.map((category) => (
                  <Button
                    key={category}
                    variant={selectedCategory === category ? "default" : "outline"}
                    size="sm"
                    onClick={() => setSelectedCategory(category)}
                    className="flex-shrink-0"
                  >
                    {category}
                  </Button>
                ))}
              </div>
            </div>

            {/* Services Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredServices.map((service) => (
                <Card
                  key={service.id}
                  className="cursor-pointer hover:shadow-lg transition-shadow"
                  onClick={() => setSelectedService(service.id)}
                >
                  <CardContent className="p-6">
                    <div className="flex items-start gap-4">
                      <div className="p-3 bg-primary/10 rounded-lg">
                        <service.icon className="h-8 w-8 text-primary" />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-start justify-between mb-2">
                          <h3 className="font-semibold text-lg">{service.name}</h3>
                          <Badge variant="secondary" className="text-sm">
                            {service.price}
                          </Badge>
                        </div>
                        <p className="text-sm text-muted-foreground mb-3">
                          {service.description}
                        </p>
                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                          <div className="flex items-center gap-1">
                            <Star className="h-4 w-4 fill-primary text-primary" />
                            {service.rating}
                          </div>
                          <span>•</span>
                          <span className={`flex items-center gap-1 ${service.available ? 'text-green-600' : 'text-red-600'}`}>
                            <div className={`w-2 h-2 rounded-full ${service.available ? 'bg-green-600' : 'bg-red-600'}`} />
                            {service.available ? 'Available' : 'Unavailable'}
                          </span>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </>
        ) : (
          /* Booking Form */
          <div className="max-w-2xl mx-auto">
            {(() => {
              const service = services.find(s => s.id === selectedService);
              if (!service) return null;

              return (
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-3">
                      <service.icon className="h-6 w-6 text-primary" />
                      Book {service.name}
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="flex items-center gap-3 p-4 bg-primary/5 rounded-lg">
                      <service.icon className="h-8 w-8 text-primary" />
                      <div>
                        <h3 className="font-semibold">{service.name}</h3>
                        <p className="text-sm text-muted-foreground">{service.price}</p>
                      </div>
                    </div>

                    <div className="space-y-4">
                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="name">Name *</Label>
                          <Input
                            id="name"
                            placeholder="Your name"
                            value={bookingForm.name}
                            onChange={(e) => setBookingForm(prev => ({ ...prev, name: e.target.value }))}
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="phone">Phone *</Label>
                          <Input
                            id="phone"
                            type="tel"
                            placeholder="+91 9876543210"
                            value={bookingForm.phone}
                            onChange={(e) => setBookingForm(prev => ({ ...prev, phone: e.target.value }))}
                          />
                        </div>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="address">Address *</Label>
                        <Textarea
                          id="address"
                          placeholder="Complete address with landmarks"
                          value={bookingForm.address}
                          onChange={(e) => setBookingForm(prev => ({ ...prev, address: e.target.value }))}
                          rows={3}
                        />
                      </div>

                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="date">Date *</Label>
                          <Input
                            id="date"
                            type="date"
                            value={bookingForm.date}
                            onChange={(e) => setBookingForm(prev => ({ ...prev, date: e.target.value }))}
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="time">Time *</Label>
                          <Input
                            id="time"
                            type="time"
                            value={bookingForm.time}
                            onChange={(e) => setBookingForm(prev => ({ ...prev, time: e.target.value }))}
                          />
                        </div>
                      </div>

                      {service.category === "Event Services" || service.category === "Construction" ? (
                        <div className="space-y-2">
                          <Label htmlFor="quantity">Number of Workers *</Label>
                          <Input
                            id="quantity"
                            type="number"
                            min="1"
                            max="20"
                            value={bookingForm.quantity}
                            onChange={(e) => setBookingForm(prev => ({ ...prev, quantity: Number(e.target.value) || 1 }))}
                          />
                        </div>
                      ) : null}

                      <div className="space-y-2">
                        <Label htmlFor="requirements">Special Requirements</Label>
                        <Textarea
                          id="requirements"
                          placeholder="Any specific instructions or requirements..."
                          value={bookingForm.requirements}
                          onChange={(e) => setBookingForm(prev => ({ ...prev, requirements: e.target.value }))}
                          rows={3}
                        />
                      </div>

                      <div className="pt-4 space-y-3">
                        <div className="p-3 bg-muted/50 rounded-lg">
                          <div className="flex justify-between text-sm">
                            <span>Service:</span>
                            <span className="font-medium">{service.name}</span>
                          </div>
                          {bookingForm.quantity > 1 && (
                            <div className="flex justify-between text-sm mt-1">
                              <span>Quantity:</span>
                              <span className="font-medium">{bookingForm.quantity}</span>
                            </div>
                          )}
                          <div className="flex justify-between text-sm mt-1 font-semibold border-t pt-2">
                            <span>Total:</span>
                            <span>₹{(parseInt(service.price.replace(/[^\d]/g, '')) * bookingForm.quantity).toLocaleString()}</span>
                          </div>
                        </div>

                        <div className="flex gap-3">
                          <Button variant="outline" onClick={() => setSelectedService(null)} className="flex-1">
                            Back
                          </Button>
                          <Button onClick={handleBooking} className="flex-1">
                            Book Service
                          </Button>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              );
            })()}
          </div>
        )}
      </div>
    </div>
  );
}
