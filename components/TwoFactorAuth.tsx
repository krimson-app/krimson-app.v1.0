"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { sendTFACode } from "@/utils/auth"

interface TwoFactorAuthProps {
  onSubmit: (code: string, phoneNumber: string) => void
  phoneNumber: string
}

export function TwoFactorAuth({ onSubmit, phoneNumber }: TwoFactorAuthProps) {
  const [code, setCode] = useState("")

  useEffect(() => {
    const code = sendTFACode(phoneNumber)
    console.log(`Verification code sent: ${code}`)
  }, [phoneNumber])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const sentCode = sendTFACode(phoneNumber)
    onSubmit(code, phoneNumber)
  }

  return (
    <div className="w-full max-w-md space-y-8">
      <div>
        <h2 className="mt-6 text-center text-3xl font-bold tracking-tight text-white">Two-Factor Authentication</h2>
        <p className="mt-2 text-center text-sm text-gray-600">Please enter the 6-digit code sent to your phone.</p>
      </div>
      <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
        <div>
          <Label htmlFor="two-factor-code" className="sr-only">
            6-digit code
          </Label>
          <Input
            id="two-factor-code"
            name="twoFactorCode"
            type="text"
            required
            className="bg-white text-black border-gray-300"
            placeholder="Enter 6-digit code"
            value={code}
            onChange={(e) => setCode(e.target.value)}
            maxLength={6}
            pattern="\d{6}"
          />
        </div>
        <div>
          <Button type="submit" className="w-full bg-[#DC1C3C] text-white hover:bg-[#B01730]">
            Verify
          </Button>
        </div>
      </form>
    </div>
  )
}

