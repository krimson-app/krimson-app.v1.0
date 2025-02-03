'use client'

import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

interface InsuranceInformationProps {
  onSubmit: (details: InsuranceInformationType) => void
}

export type InsuranceInformationType = {
  provider: string
  policyNumber: string
  effectiveDate: string
  expirationDate: string
}

export function InsuranceInformation({ onSubmit }: InsuranceInformationProps) {
  const [provider, setProvider] = useState('')
  const [policyNumber, setPolicyNumber] = useState('')
  const [effectiveDate, setEffectiveDate] = useState('')
  const [expirationDate, setExpirationDate] = useState('')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSubmit({
      provider,
      policyNumber,
      effectiveDate,
      expirationDate
    })
  }

  return (
    <div className="w-full max-w-md space-y-8">
      <div>
        <h2 className="mt-6 text-center text-3xl font-bold tracking-tight text-white">
          Insurance Information
        </h2>
      </div>
      <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
        <div className="space-y-4 rounded-md shadow-sm">
          <div>
            <Label htmlFor="insurance-provider" className="text-white">Insurance Provider</Label>
            <Input
              id="insurance-provider"
              name="insuranceProvider"
              type="text"
              required
              className="bg-transparent text-white placeholder-gray-400 border-white"
              placeholder="Insurance Provider"
              value={provider}
              onChange={(e) => setProvider(e.target.value)}
            />
          </div>
          <div>
            <Label htmlFor="policy-number" className="text-white">Policy Number</Label>
            <Input
              id="policy-number"
              name="policyNumber"
              type="text"
              required
              className="bg-transparent text-white placeholder-gray-400 border-white"
              placeholder="Policy Number"
              value={policyNumber}
              onChange={(e) => setPolicyNumber(e.target.value)}
            />
          </div>
          <div>
            <Label htmlFor="effective-date" className="text-white">Policy Effective Date</Label>
            <Input
              id="effective-date"
              name="effectiveDate"
              type="date"
              required
              className="bg-transparent text-white placeholder-gray-400 border-white [&::-webkit-calendar-picker-indicator]:filter [&::-webkit-calendar-picker-indicator]:invert [&::-webkit-calendar-picker-indicator]:opacity-50"
              value={effectiveDate}
              onChange={(e) => setEffectiveDate(e.target.value)}
            />
          </div>
          <div>
            <Label htmlFor="expiration-date" className="text-white">Policy Expiration Date</Label>
            <Input
              id="expiration-date"
              name="expirationDate"
              type="date"
              required
              className="bg-transparent text-white placeholder-gray-400 border-white [&::-webkit-calendar-picker-indicator]:filter [&::-webkit-calendar-picker-indicator]:invert [&::-webkit-calendar-picker-indicator]:opacity-50"
              value={expirationDate}
              onChange={(e) => setExpirationDate(e.target.value)}
            />
          </div>
        </div>
        <div>
          <Button
            type="submit"
            className="w-full bg-white text-black hover:bg-gray-200"
          >
            Submit
          </Button>
        </div>
      </form>
    </div>
  )
}

