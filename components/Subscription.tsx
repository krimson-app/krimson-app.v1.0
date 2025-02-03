"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"

interface SubscriptionProps {
  onSubmit: (plan: string) => void
}

export function Subscription({ onSubmit }: SubscriptionProps) {
  const [selectedPlan, setSelectedPlan] = useState("")

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSubmit(selectedPlan)
  }

  return (
    <div className="w-full max-w-md space-y-8">
      <div>
        <h2 className="mt-6 text-center text-3xl font-bold tracking-tight text-white">Krimson Subscription</h2>
        <p className="mt-2 text-center text-sm text-gray-300">Choose your subscription plan</p>
      </div>
      <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
        <RadioGroup value={selectedPlan} onValueChange={setSelectedPlan}>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="monthly" id="monthly" className="border-white text-white" />
            <Label htmlFor="monthly" className="text-white">
              Monthly Plan - $5.99/month
            </Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="annual" id="annual" className="border-white text-white" />
            <Label htmlFor="annual" className="text-white">
              Annual Plan - $49.99/year (Save 30%)
            </Label>
          </div>
        </RadioGroup>
        <div>
          <Button type="submit" className="w-full bg-white text-black hover:bg-gray-200" disabled={!selectedPlan}>
            Continue
          </Button>
        </div>
        <p className="mt-4 text-center text-sm text-white">
          On the next page there will be options for you to receive free months off your subscription.
        </p>
        <style jsx global>{`
          .RadioGroupItem[data-state="checked"] {
            background-color: white;
          }
        `}</style>
      </form>
    </div>
  )
}

