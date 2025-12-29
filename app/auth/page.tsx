"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Sprout, ArrowLeft, Smartphone, Lock, ShieldCheck, UserPlus } from "lucide-react"
import Link from "next/link"

export default function AuthPage() {
  const router = useRouter()

  const [mode, setMode] = useState<"login" | "register">("login")
  const [step, setStep] = useState<"phone" | "otp" | "details">("phone")
  const [phone, setPhone] = useState("")
  const [otp, setOtp] = useState("")
  const [name, setName] = useState("")
  const [address, setAddress] = useState("")
  const [isLoading, setIsLoading] = useState(false)

  const handleSendOTP = async () => {
    if (phone.length !== 10) {
      alert("Please enter a valid 10-digit phone number")
      return
    }

    setIsLoading(true)
    await new Promise((resolve) => setTimeout(resolve, 1000))
    setIsLoading(false)

    const existingUser = localStorage.getItem(`melody_user_${phone}`)
    if (mode === "login" && !existingUser) {
      alert("Phone number not registered. Please register first.")
      setMode("register")
      return
    }

    setStep("otp")
    alert(`Demo: OTP sent to ${phone}. Use any 6 digits to continue.`)
  }

  const handleVerifyOTP = async () => {
    if (otp.length !== 6) {
      alert("Please enter a valid 6-digit OTP")
      return
    }

    setIsLoading(true)
    await new Promise((resolve) => setTimeout(resolve, 1000))
    setIsLoading(false)

    if (mode === "register") {
      const existingUser = localStorage.getItem(`melody_user_${phone}`)
      if (!existingUser) {
        setStep("details")
        return
      }
    }

    const userData = localStorage.getItem(`melody_user_${phone}`)
    if (userData) {
      localStorage.setItem("melody_current_user", userData)
      router.push("/customer")
    } else {
      alert("User not found. Please register.")
      setMode("register")
      setStep("phone")
    }
  }

  const handleRegister = async () => {
    if (!name || !address) {
      alert("Please fill all fields")
      return
    }

    setIsLoading(true)
    await new Promise((resolve) => setTimeout(resolve, 1000))
    setIsLoading(false)

    const userData = {
      phone,
      name,
      address,
      roles: ["customer"], // Default role only
      createdAt: new Date().toISOString(),
    }

    localStorage.setItem(`melody_user_${phone}`, JSON.stringify(userData))
    localStorage.setItem("melody_current_user", JSON.stringify(userData))

    alert("Registration successful! Welcome to Melody.")
    router.push("/customer")
  }

  return (
    <div
      className="min-h-screen flex items-center justify-center p-4"
      style={{
        backgroundImage: "url(/images/corn-field-sunset.jpeg)",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div className="absolute inset-0 bg-black/60" />

      <div className="relative z-10 w-full max-w-md">
        <Card className="shadow-2xl border-2">
          <CardHeader className="space-y-4">
            <Link href="/">
              <Button variant="ghost" size="sm" className="gap-2 mb-2">
                <ArrowLeft className="h-4 w-4" />
                Back to Home
              </Button>
            </Link>

            <div className="flex items-center justify-center gap-3">
              <div className="bg-primary/10 p-3 rounded-xl">
                <Smartphone className="h-8 w-8 text-primary" />
              </div>
              <div className="text-center">
                <div className="flex items-center justify-center gap-2">
                  <Sprout className="h-6 w-6 text-primary" />
                  <span className="text-2xl font-bold">Melody</span>
                </div>
                <p className="text-sm text-muted-foreground font-medium mt-1">FROM OUR ROOTS</p>
              </div>
            </div>

            <div className="text-center">
              <CardTitle className="text-2xl mb-2">{mode === "login" ? "Welcome Back" : "Create Account"}</CardTitle>
              <CardDescription>
                {mode === "login"
                  ? "Login to start shopping from local farmers"
                  : "Register to get fresh products delivered"}
              </CardDescription>
            </div>
          </CardHeader>

          <CardContent className="space-y-6">
            {step === "phone" && (
              <>
                <div className="space-y-2">
                  <Label htmlFor="phone">Phone Number</Label>
                  <div className="flex gap-2">
                    <div className="flex items-center justify-center bg-muted px-3 rounded-lg border">
                      <span className="text-sm font-semibold">+91</span>
                    </div>
                    <Input
                      id="phone"
                      type="tel"
                      placeholder="9876543210"
                      maxLength={10}
                      value={phone}
                      onChange={(e) => setPhone(e.target.value.replace(/\D/g, ""))}
                      className="flex-1"
                    />
                  </div>
                </div>

                <Button
                  onClick={handleSendOTP}
                  disabled={isLoading || phone.length !== 10}
                  className="w-full"
                  size="lg"
                >
                  {isLoading ? "Sending..." : "Send OTP"}
                </Button>

                <div className="relative">
                  <div className="absolute inset-0 flex items-center">
                    <span className="w-full border-t" />
                  </div>
                  <div className="relative flex justify-center text-xs uppercase">
                    <span className="bg-background px-2 text-muted-foreground">Or continue with</span>
                  </div>
                </div>

                <Button
                  variant="outline"
                  className="w-full gap-2"
                  size="lg"
                  onClick={() => alert("Google login not implemented in demo")}
                >
                  <svg className="h-5 w-5" viewBox="0 0 24 24">
                    <path
                      fill="currentColor"
                      d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                    />
                    <path
                      fill="currentColor"
                      d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                    />
                    <path
                      fill="currentColor"
                      d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                    />
                    <path
                      fill="currentColor"
                      d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                    />
                  </svg>
                  Continue with Google
                </Button>

                <div className="text-center pt-4 border-t">
                  <p className="text-sm text-muted-foreground">
                    {mode === "login" ? "Don't have an account?" : "Already have an account?"}
                    <button
                      onClick={() => setMode(mode === "login" ? "register" : "login")}
                      className="ml-2 text-primary font-semibold underline"
                    >
                      {mode === "login" ? "Register" : "Login"}
                    </button>
                  </p>
                </div>
              </>
            )}

            {step === "otp" && (
              <>
                <div className="space-y-2">
                  <Label htmlFor="otp">Enter OTP</Label>
                  <div className="flex items-center gap-2">
                    <Lock className="h-5 w-5 text-muted-foreground" />
                    <Input
                      id="otp"
                      type="text"
                      placeholder="000000"
                      maxLength={6}
                      value={otp}
                      onChange={(e) => setOtp(e.target.value.replace(/\D/g, ""))}
                      className="flex-1 text-center text-lg tracking-widest"
                    />
                  </div>
                  <p className="text-xs text-muted-foreground">
                    OTP sent to +91 {phone}
                    <button onClick={() => setStep("phone")} className="ml-2 text-primary underline">
                      Change
                    </button>
                  </p>
                </div>

                <Button onClick={handleVerifyOTP} disabled={isLoading || otp.length !== 6} className="w-full" size="lg">
                  {isLoading ? "Verifying..." : "Verify OTP"}
                </Button>

                <Button variant="ghost" onClick={handleSendOTP} className="w-full" size="sm">
                  Resend OTP
                </Button>
              </>
            )}

            {step === "details" && (
              <>
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="name">Full Name</Label>
                    <Input
                      id="name"
                      type="text"
                      placeholder="Enter your full name"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="address">Delivery Address</Label>
                    <Input
                      id="address"
                      type="text"
                      placeholder="House no, Street, Area, City"
                      value={address}
                      onChange={(e) => setAddress(e.target.value)}
                    />
                  </div>
                </div>

                <Button onClick={handleRegister} disabled={isLoading} className="w-full" size="lg">
                  <UserPlus className="h-5 w-5 mr-2" />
                  {isLoading ? "Creating Account..." : "Complete Registration"}
                </Button>
              </>
            )}

            <div className="flex items-center justify-center gap-2 pt-4 border-t">
              <ShieldCheck className="h-4 w-4 text-green-600" />
              <span className="text-xs text-muted-foreground">Secure OTP Authentication</span>
            </div>
          </CardContent>
        </Card>

        <Card className="mt-4 bg-yellow-500/10 border-yellow-500/30">
          <CardContent className="p-4">
            <p className="text-sm text-center text-yellow-800">
              <strong>Demo Mode:</strong> Use any 10-digit phone and any 6-digit OTP
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
