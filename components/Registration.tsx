"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import Link from "next/link"
import { TwoFactorAuth } from "./TwoFactorAuth"
import { DriverDetails, type DriverDetailsType } from "./DriverDetails"
import { VehicleInformation, type VehicleInformationType } from "./VehicleInformation"
import { InsuranceInformation, type InsuranceInformationType } from "./InsuranceInformation"
import { Subscription } from "./Subscription"
import { KrimsonSwag, type KrimsonSwagType } from "./KrimsonSwag"
import { PaymentSummary } from "./PaymentSummary"

export default function Registration() {
  const [emailOrPhone, setEmailOrPhone] = useState("")
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [showTwoFactor, setShowTwoFactor] = useState(false)
  const [showDriverDetails, setShowDriverDetails] = useState(false)
  const [showVehicleInformation, setShowVehicleInformation] = useState(false)
  const [showInsuranceInformation, setShowInsuranceInformation] = useState(false)
  const [showSubscription, setShowSubscription] = useState(false)
  const [showKrimsonSwag, setShowKrimsonSwag] = useState(false)
  const [showPaymentSummary, setShowPaymentSummary] = useState(false)
  const [error, setError] = useState("")
  const [subscriptionPlan, setSubscriptionPlan] = useState("")
  const [freeMonths, setFreeMonths] = useState(0)

  const validatePassword = (pass: string) => {
    const regex = /^(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,}$/
    return regex.test(pass)
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setError("")

    if (!validatePassword(password)) {
      setError(
        "Password must be at least 8 characters long and include a capital letter, a number, and a special character.",
      )
      return
    }

    if (password !== confirmPassword) {
      setError("Passwords do not match.")
      return
    }

    // Here you would typically send the registration data to your backend
    // and receive a response to trigger the two-factor authentication
    console.log({ emailOrPhone, password })
    setShowTwoFactor(true)
  }

  const handleTwoFactorSubmit = (code: string) => {
    // Here you would verify the two-factor code with your backend
    console.log("Two-factor code:", code)
    setShowDriverDetails(true)
  }

  const handleDriverDetailsSubmit = (details: DriverDetailsType) => {
    // Here you would send the driver details to your backend
    console.log("Driver details:", details)
    setShowVehicleInformation(true)
  }

  const handleVehicleInformationSubmit = (details: VehicleInformationType) => {
    // Here you would send the vehicle information to your backend
    console.log("Vehicle information:", details)
    setShowInsuranceInformation(true)
  }

  const handleInsuranceInformationSubmit = (details: InsuranceInformationType) => {
    // Here you would send the insurance information to your backend
    console.log("Insurance information:", details)
    setShowSubscription(true)
  }

  const handleSubscriptionSubmit = (plan: string) => {
    // Here you would send the subscription plan to your backend
    console.log("Subscription plan:", plan)
    setSubscriptionPlan(plan)
    setShowKrimsonSwag(true)
  }

  const handleKrimsonSwagSubmit = (preferences: KrimsonSwagType) => {
    // Here you would send the Krimson swag preferences to your backend
    console.log("Krimson Swag preferences:", preferences)
    // Calculate free months based on swag selection
    const calculatedFreeMonths =
      preferences.licensePlateFrame * 2 +
      preferences.windowDecals +
      preferences.bumperMagnets * 2 +
      preferences.carDoorMagnets * 3
    setFreeMonths(Math.min(calculatedFreeMonths, 18)) // Cap at 18 months
    setShowPaymentSummary(true)
  }

  const handlePaymentSummarySubmit = (paymentOption: string) => {
    // Here you would process the payment and complete the registration
    console.log("Registration completed with payment option:", paymentOption)
    alert(`Registration successful! Payment will be processed via ${paymentOption}`)
    // Reset form and state
    setEmailOrPhone("")
    setPassword("")
    setConfirmPassword("")
    setShowTwoFactor(false)
    setShowDriverDetails(false)
    setShowVehicleInformation(false)
    setShowInsuranceInformation(false)
    setShowSubscription(false)
    setShowKrimsonSwag(false)
    setShowPaymentSummary(false)
    setSubscriptionPlan("")
    setFreeMonths(0)
  }

  if (showPaymentSummary) {
    return (
      <PaymentSummary
        subscriptionPlan={subscriptionPlan}
        freeMonths={freeMonths}
        onSubmit={handlePaymentSummarySubmit}
      />
    )
  }

  if (showKrimsonSwag) {
    return <KrimsonSwag onSubmit={handleKrimsonSwagSubmit} />
  }

  if (showSubscription) {
    return <Subscription onSubmit={handleSubscriptionSubmit} />
  }

  if (showInsuranceInformation) {
    return <InsuranceInformation onSubmit={handleInsuranceInformationSubmit} />
  }

  if (showVehicleInformation) {
    return <VehicleInformation onSubmit={handleVehicleInformationSubmit} />
  }

  if (showDriverDetails) {
    return <DriverDetails onSubmit={handleDriverDetailsSubmit} />
  }

  if (showTwoFactor) {
    return <TwoFactorAuth onSubmit={handleTwoFactorSubmit} />
  }

  return (
    <div className="w-full max-w-md space-y-8">
      <div>
        <h2 className="mt-6 text-center text-3xl font-bold tracking-tight text-white">
          Create your <span className="text-[#DC1C3C] font-bold">Krimson</span> account
        </h2>
      </div>
      <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
        <div className="space-y-4 rounded-md shadow-sm">
          <div>
            <Label htmlFor="email-or-phone" className="sr-only">
              Email or Phone Number
            </Label>
            <Input
              id="email-or-phone"
              name="emailOrPhone"
              type="text"
              autoComplete="email"
              required
              className="bg-transparent text-white placeholder-white border-white"
              placeholder="Email or Phone Number"
              value={emailOrPhone}
              onChange={(e) => setEmailOrPhone(e.target.value)}
            />
          </div>
          <div>
            <Label htmlFor="password" className="sr-only">
              Password
            </Label>
            <Input
              id="password"
              name="password"
              type="password"
              autoComplete="new-password"
              required
              className="bg-transparent text-white placeholder-white border-white"
              placeholder="Choose a password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div>
            <Label htmlFor="confirm-password" className="sr-only">
              Confirm Password
            </Label>
            <Input
              id="confirm-password"
              name="confirm-password"
              type="password"
              autoComplete="new-password"
              required
              className="bg-transparent text-white placeholder-white border-white"
              placeholder="Confirm your password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
          </div>
        </div>

        {error && <p className="text-red-500 text-sm mt-2">{error}</p>}

        <div>
          <Button type="submit" className="w-full bg-white text-black hover:bg-gray-200">
            Register
          </Button>
        </div>
      </form>
      <div className="text-center">
        <Link href="/" className="text-white hover:underline">
          Back to Home
        </Link>
      </div>
    </div>
  )
}

