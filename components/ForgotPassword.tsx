"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import Link from "next/link"
import { TwoFactorAuth } from "./TwoFactorAuth"
import { verifyTFA } from "@/utils/auth"
import { Eye, EyeOff } from "lucide-react"

const formatPhoneNumber = (input: string) => {
  const numbers = input.replace(/\D/g, "").slice(0, 10)
  if (numbers.length <= 3) return numbers
  if (numbers.length <= 6) return `${numbers.slice(0, 3)}-${numbers.slice(3)}`
  return `${numbers.slice(0, 3)}-${numbers.slice(3, 6)}-${numbers.slice(6)}`
}

export default function ForgotPassword() {
  const [phoneNumber, setPhoneNumber] = useState("")
  const [showTwoFactor, setShowTwoFactor] = useState(false)
  const [showNewPassword, setShowNewPassword] = useState(false)
  const [newPassword, setNewPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [error, setError] = useState("")
  const [showNewPasswordText, setShowNewPasswordText] = useState(false)
  const [showConfirmPasswordText, setShowConfirmPasswordText] = useState(false)

  const handlePhoneSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setError("")
    // Here you would typically verify if the phone number exists in your system
    // For this example, we'll just move to the TFA step
    setShowTwoFactor(true)
  }

  const handleTwoFactorSubmit = (code: string) => {
    if (verifyTFA(code)) {
      setShowNewPassword(true)
    } else {
      setError("Invalid verification code. Please try again.")
    }
  }

  const handleNewPasswordSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setError("")

    if (newPassword !== confirmPassword) {
      setError("Passwords do not match.")
      return
    }

    if (newPassword.length < 8) {
      setError("Password must be at least 8 characters long.")
      return
    }

    // Here you would typically update the password in your system
    // For this example, we'll just show a success message
    alert("Password has been reset successfully. Please sign in with your new password.")
    window.location.href = "/signin"
  }

  if (showNewPassword) {
    return (
      <div className="w-full max-w-md space-y-8">
        <div>
          <h2 className="mt-6 text-center text-3xl font-bold tracking-tight text-white">
            Reset Your <span className="text-[#DC1C3C] font-bold">Krimson</span> Password
          </h2>
        </div>
        <form className="mt-8 space-y-6" onSubmit={handleNewPasswordSubmit}>
          <div className="space-y-4 rounded-md shadow-sm">
            <div>
              <Label htmlFor="new-password" className="block text-sm font-medium text-white mb-1">
                New Password
              </Label>
              <div className="relative">
                <Input
                  id="new-password"
                  name="newPassword"
                  type={showNewPasswordText ? "text" : "password"}
                  required
                  className="bg-transparent text-white placeholder-white border-white pr-10"
                  placeholder="Enter new password"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                />
                <button
                  type="button"
                  className="absolute inset-y-0 right-0 pr-3 flex items-center"
                  onClick={() => setShowNewPasswordText(!showNewPasswordText)}
                >
                  {showNewPasswordText ? (
                    <EyeOff className="h-5 w-5 text-white" />
                  ) : (
                    <Eye className="h-5 w-5 text-white" />
                  )}
                </button>
              </div>
            </div>
            <div>
              <Label htmlFor="confirm-password" className="block text-sm font-medium text-white mb-1">
                Confirm New Password
              </Label>
              <div className="relative">
                <Input
                  id="confirm-password"
                  name="confirmPassword"
                  type={showConfirmPasswordText ? "text" : "password"}
                  required
                  className="bg-transparent text-white placeholder-white border-white pr-10"
                  placeholder="Confirm new password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                />
                <button
                  type="button"
                  className="absolute inset-y-0 right-0 pr-3 flex items-center"
                  onClick={() => setShowConfirmPasswordText(!showConfirmPasswordText)}
                >
                  {showConfirmPasswordText ? (
                    <EyeOff className="h-5 w-5 text-white" />
                  ) : (
                    <Eye className="h-5 w-5 text-white" />
                  )}
                </button>
              </div>
            </div>
          </div>
          {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
          <div>
            <Button type="submit" className="w-full bg-white text-black hover:bg-gray-200">
              Reset Password
            </Button>
          </div>
        </form>
      </div>
    )
  }

  if (showTwoFactor) {
    return <TwoFactorAuth onSubmit={handleTwoFactorSubmit} />
  }

  return (
    <div className="w-full max-w-md space-y-8">
      <div>
        <h2 className="mt-6 text-center text-3xl font-bold tracking-tight text-white">
          Forgot Your <span className="text-[#DC1C3C] font-bold">Krimson</span> Password?
        </h2>
        <p className="mt-2 text-center text-sm text-gray-300">Enter your phone number to reset your password.</p>
      </div>
      <form className="mt-8 space-y-6" onSubmit={handlePhoneSubmit}>
        <div className="rounded-md shadow-sm">
          <Label htmlFor="phone-number" className="block text-sm font-medium text-white mb-1">
            Phone Number
          </Label>
          <Input
            id="phone-number"
            name="phoneNumber"
            type="tel"
            autoComplete="tel"
            required
            className="bg-transparent text-white placeholder-white border-white"
            placeholder="123-456-7890"
            value={phoneNumber}
            onChange={(e) => {
              const formatted = formatPhoneNumber(e.target.value)
              setPhoneNumber(formatted)
            }}
            maxLength={12}
          />
        </div>
        {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
        <div>
          <Button type="submit" className="w-full bg-white text-black hover:bg-gray-200">
            Send Verification Code
          </Button>
        </div>
      </form>
      <div className="text-center">
        <Link href="/signin" className="text-white hover:underline">
          Back to Sign In
        </Link>
      </div>
    </div>
  )
}

