"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  ArrowLeft,
  User,
  MapPin,
  Phone,
  Sprout,
  TruckIcon,
  ChevronRight,
  ShieldCheck,
  Wallet,
  Bell,
  LogOut,
  Briefcase,
  Calendar,
  GraduationCap,
  HardHat,
} from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function SettingsPage() {
  const router = useRouter();
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    const userData = localStorage.getItem("melody_current_user");
    if (userData) {
      setUser(JSON.parse(userData));
    } else {
      router.push("/auth");
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("melody_current_user");
    router.push("/");
  };

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin h-8 w-8 border-4 border-primary border-t-transparent rounded-full" />
      </div>
    );
  }

  const hasFarmerRole = user.roles?.includes("farmer");
  const hasDriverRole = user.roles?.includes("driver");
  const hasEmployerRole = user.roles?.includes("employer");
  const hasStudentRole = user.roles?.includes("student");
  const hasWorkerRole = user.roles?.includes("worker");
  const farmerPending = user.farmerStatus === "pending";
  const driverPending = user.driverStatus === "pending";
  const employerPending = user.employerStatus === "pending";

  return (
    <div className="min-h-screen bg-background">
      <header className="sticky top-0 z-50 bg-card border-b shadow-sm">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center gap-4">
            <Link href="/customer">
              <Button variant="ghost" size="icon">
                <ArrowLeft className="h-5 w-5" />
              </Button>
            </Link>
            <h1 className="text-2xl font-bold">Settings & Profile</h1>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-6 max-w-2xl">
        {/* Profile Card */}
        <Card className="mb-6">
          <CardHeader>
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center">
                <User className="h-8 w-8 text-primary" />
              </div>
              <div>
                <CardTitle>{user.name}</CardTitle>
                <CardDescription className="flex items-center gap-2 mt-1">
                  <Phone className="h-3 w-3" />
                  +91 {user.phone}
                </CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="flex items-start gap-2 text-sm">
              <MapPin className="h-4 w-4 text-muted-foreground mt-0.5" />
              <span className="text-muted-foreground">{user.address}</span>
            </div>
            <div className="flex gap-2">
              {user.roles?.map((role: string) => (
                <Badge key={role} variant="secondary" className="capitalize">
                  {role}
                </Badge>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card className="mb-6 border-2 border-primary/20">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <ShieldCheck className="h-5 w-5 text-primary" />
              Upgrade Your Account
            </CardTitle>
            <CardDescription>
              Expand your role to sell products or deliver orders
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            {/* Become a Farmer */}
            <Link
              href={
                hasFarmerRole
                  ? "/farmer"
                  : farmerPending
                  ? "/farmer/kyc/pending"
                  : "/farmer/kyc"
              }
            >
              <Card className="hover:shadow-md transition-shadow cursor-pointer">
                <CardContent className="p-4 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-lg bg-secondary/10 flex items-center justify-center">
                      <Sprout className="h-6 w-6 text-secondary" />
                    </div>
                    <div>
                      <p className="font-semibold">Become a Farmer</p>
                      <p className="text-xs text-muted-foreground">
                        {hasFarmerRole
                          ? "Farmer dashboard active"
                          : farmerPending
                          ? "KYC pending approval"
                          : "Sell your products directly"}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    {hasFarmerRole && (
                      <Badge className="bg-green-500">Active</Badge>
                    )}
                    {farmerPending && (
                      <Badge variant="secondary">Pending</Badge>
                    )}
                    <ChevronRight className="h-5 w-5 text-muted-foreground" />
                  </div>
                </CardContent>
              </Card>
            </Link>

            {/* Become a Driver */}
            <Link
              href={
                hasDriverRole
                  ? "/driver"
                  : driverPending
                  ? "/driver/kyc/pending"
                  : "/driver/kyc"
              }
            >
              <Card className="hover:shadow-md transition-shadow cursor-pointer">
                <CardContent className="p-4 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-lg bg-accent/20 flex items-center justify-center">
                      <TruckIcon className="h-6 w-6 text-accent-foreground" />
                    </div>
                    <div>
                      <p className="font-semibold">Become a Driver</p>
                      <p className="text-xs text-muted-foreground">
                        {hasDriverRole
                          ? "Driver dashboard active"
                          : driverPending
                          ? "KYC pending approval"
                          : "Earn by delivering orders"}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    {hasDriverRole && (
                      <Badge className="bg-green-500">Active</Badge>
                    )}
                    {driverPending && (
                      <Badge variant="secondary">Pending</Badge>
                    )}
                    <ChevronRight className="h-5 w-5 text-muted-foreground" />
                  </div>
                </CardContent>
              </Card>
            </Link>

            {/* Become an Employer */}
            <Link
              href={
                hasEmployerRole
                  ? "/employer"
                  : employerPending
                  ? "/employer/kyc/pending"
                  : "/employer/kyc"
              }
            >
              <Card className="hover:shadow-md transition-shadow cursor-pointer">
                <CardContent className="p-4 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center">
                      <Briefcase className="h-6 w-6 text-primary" />
                    </div>
                    <div>
                      <p className="font-semibold">Become an Employer</p>
                      <p className="text-xs text-muted-foreground">
                        {hasEmployerRole
                          ? "Employer dashboard active"
                          : employerPending
                          ? "KYC pending approval"
                          : "Hire drivers and manage deliveries"}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    {hasEmployerRole && (
                      <Badge className="bg-green-500">Active</Badge>
                    )}
                    {employerPending && (
                      <Badge variant="secondary">Pending</Badge>
                    )}
                    <ChevronRight className="h-5 w-5 text-muted-foreground" />
                  </div>
                </CardContent>
              </Card>
            </Link>

            {/* Become a Student */}
            <Link
              href={
                hasStudentRole
                  ? "/customer/settings/services"
                  : "/customer/settings/services/student/register"
              }
            >
              <Card className="hover:shadow-md transition-shadow cursor-pointer">
                <CardContent className="p-4 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-lg bg-green-500/10 flex items-center justify-center">
                      <GraduationCap className="h-6 w-6 text-green-600" />
                    </div>
                    <div>
                      <p className="font-semibold">Become a Student</p>
                      <p className="text-xs text-muted-foreground">
                        {hasStudentRole
                          ? "Student services active"
                          : "Offer part-time work and earn"}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    {hasStudentRole && (
                      <Badge className="bg-green-500">Active</Badge>
                    )}
                    <ChevronRight className="h-5 w-5 text-muted-foreground" />
                  </div>
                </CardContent>
              </Card>
            </Link>

            {/* Become a Worker */}
            <Link href="/customer/settings/services">
              <Card className="hover:shadow-md transition-shadow cursor-pointer">
                <CardContent className="p-4 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-lg bg-orange-500/10 flex items-center justify-center">
                      <HardHat className="h-6 w-6 text-orange-600" />
                    </div>
                    <div>
                      <p className="font-semibold">Become a Worker</p>
                      <p className="text-xs text-muted-foreground">
                        {hasWorkerRole
                          ? "Worker services active"
                          : "Find daily-wage jobs and earn"}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    {hasWorkerRole && (
                      <Badge className="bg-green-500">Active</Badge>
                    )}
                    <ChevronRight className="h-5 w-5 text-muted-foreground" />
                  </div>
                </CardContent>
              </Card>
            </Link>
          </CardContent>
        </Card>

        {/* Other Settings */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle>Account Settings</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <Link href="/customer/subscriptions">
              <Card className="hover:shadow-md transition-shadow cursor-pointer">
                <CardContent className="p-4 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <Calendar className="h-5 w-5 text-primary" />
                    <span className="font-medium">My Plans</span>
                  </div>
                  <ChevronRight className="h-5 w-5 text-muted-foreground" />
                </CardContent>
              </Card>
            </Link>

            <Link href="/customer/wallet">
              <Card className="hover:shadow-md transition-shadow cursor-pointer">
                <CardContent className="p-4 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <Wallet className="h-5 w-5 text-primary" />
                    <span className="font-medium">Wallet & Payments</span>
                  </div>
                  <ChevronRight className="h-5 w-5 text-muted-foreground" />
                </CardContent>
              </Card>
            </Link>

            <Link href="/customer/notifications">
              <Card className="hover:shadow-md transition-shadow cursor-pointer">
                <CardContent className="p-4 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <Bell className="h-5 w-5 text-primary" />
                    <span className="font-medium">Notifications</span>
                  </div>
                  <ChevronRight className="h-5 w-5 text-muted-foreground" />
                </CardContent>
              </Card>
            </Link>
          </CardContent>
        </Card>

        {/* Logout */}
        <Button
          variant="destructive"
          className="w-full"
          size="lg"
          onClick={handleLogout}
        >
          <LogOut className="h-5 w-5 mr-2" />
          Logout
        </Button>
      </div>
    </div>
  );
}
