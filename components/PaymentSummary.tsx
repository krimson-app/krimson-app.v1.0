"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

interface PaymentSummaryProps {
  subscriptionPlan: string
  freeMonths: number
  onSubmit: (paymentOption: string) => void
}

export function PaymentSummary({ subscriptionPlan, freeMonths, onSubmit }: PaymentSummaryProps) {
  const [subtotal, setSubtotal] = useState(0)
  const [discount, setDiscount] = useState(0)
  const [total, setTotal] = useState(0)
  const [paymentOption, setPaymentOption] = useState("")

  useEffect(() => {
    const monthlyRate = subscriptionPlan === "monthly" ? 5.99 : 49.99 / 12
    const subtotalAmount = subscriptionPlan === "monthly" ? 5.99 : 49.99
    const discountAmount = monthlyRate * freeMonths

    setSubtotal(subtotalAmount)
    setDiscount(Math.min(discountAmount, subtotalAmount))
    setTotal(Math.max(0, subtotalAmount - discountAmount))
  }, [subscriptionPlan, freeMonths])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (paymentOption) {
      onSubmit(paymentOption)
    } else {
      alert("Please select a payment option")
    }
  }

  return (
    <div className="w-full max-w-md space-y-8">
      <div>
        <h2 className="mt-6 text-center text-3xl font-bold tracking-tight text-white">Payment Summary</h2>
      </div>
      <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
        <div className="space-y-4 text-white">
          <div className="flex justify-between">
            <Label>Subscription Subtotal:</Label>
            <span>${subtotal.toFixed(2)}</span>
          </div>
          <div className="flex justify-between">
            <Label>Discount ({freeMonths} free months):</Label>
            <span>-${discount.toFixed(2)}</span>
          </div>
          <div className="flex justify-between font-bold text-lg">
            <Label>Total Due Today:</Label>
            <span>${total.toFixed(2)}</span>
          </div>
        </div>
        <div className="space-y-2">
          <Label htmlFor="payment-option" className="text-white">
            Payment Option
          </Label>
          <Select value={paymentOption} onValueChange={setPaymentOption} required>
            <SelectTrigger id="payment-option" className="bg-transparent text-white border-white">
              <SelectValue placeholder="Select payment option" />
            </SelectTrigger>
            <SelectContent className="bg-black text-white border-white">
              <SelectItem value="credit-card" className="hover:bg-gray-700">
                Credit Card
              </SelectItem>
              <SelectItem value="apple-pay" className="hover:bg-gray-700">
                Apple Pay
              </SelectItem>
              <SelectItem value="samsung-pay" className="hover:bg-gray-700">
                Samsung Pay
              </SelectItem>
              <SelectItem value="venmo" className="hover:bg-gray-700">
                Venmo
              </SelectItem>
              <SelectItem value="cash-app" className="hover:bg-gray-700">
                Cash App
              </SelectItem>
              <SelectItem value="paypal" className="hover:bg-gray-700">
                PayPal
              </SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div>
          <Button type="submit" className="w-full bg-white text-black hover:bg-gray-200">
            Complete Registration
          </Button>
        </div>
      </form>
    </div>
  )
}

