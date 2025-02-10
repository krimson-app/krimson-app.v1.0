"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import Link from "next/link"
import { TwoFactorAuth } from "./TwoFactorAuth"
import { signIn, verifyTFA, getUser } from "@/utils/auth"
import { Eye, EyeOff } from "lucide-react"
import { useRouter } from "next/navigation"
import { useAuth } from "@/contexts/AuthContext"

const formatPhoneNumber = (input: string) => {
  const numbers = input.replace(/\D/g, "").slice(0, 10)
  if (numbers.length <= 3) return numbers
  if (numbers.length <= 6) return `${numbers.slice(0, 3)}-${numbers.slice(3)}`
  return `${numbers.slice(0, 3)}-${numbers.slice(3, 6)}-${numbers.slice(6)}`
}

export default function SignIn() {
  const router = useRouter()
  const [phoneNumber, setPhoneNumber] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")
  const [showTwoFactor, setShowTwoFactor] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  const { setUser } = useAuth()

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setError("")

    if (signIn(phoneNumber, password)) {
      setShowTwoFactor(true)
    } else {
      setError("Invalid phone number or password")
    }
  }

  const handleTwoFactorSubmit = (code: string) => {
    if (verifyTFA(code)) {
      const user = getUser()
      localStorage.setItem("user", JSON.stringify(user))
      // Use the setUser function from AuthContext to update the global state
      setUser(user)
      router.push("/dashboard")
    } else {
      setError("Invalid verification code. Please try again.")
    }
  }

  if (showTwoFactor) {
    return <TwoFactorAuth onSubmit={handleTwoFactorSubmit} phoneNumber={phoneNumber} />
  }

  return (
    <div className="w-full max-w-md space-y-8">
      <div>
        <h2 className="mt-6 text-center text-3xl font-bold tracking-tight text-white">
          Sign in to your <span className="text-[#DC1C3C] font-bold">Krimson</span> account
        </h2>
      </div>
      <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
        <div className="space-y-4 rounded-md shadow-sm">
          <div>
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
          <div>
            <Label htmlFor="password" className="block text-sm font-medium text-white mb-1">
              Password
            </Label>
            <div className="relative">
              <Input
                id="password"
                name="password"
                type={showPassword ? "text" : "password"}
                autoComplete="current-password"
                required
                className="bg-transparent text-white placeholder-white border-white pr-10"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <button
                type="button"
                className="absolute inset-y-0 right-0 pr-3 flex items-center"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <EyeOff className="h-5 w-5 text-white" /> : <Eye className="h-5 w-5 text-white" />}
              </button>
            </div>
          </div>
        </div>

        {error && <p className="text-red-500 text-sm mt-2">{error}</p>}

        <div>
          <Button type="submit" className="w-full bg-white text-black hover:bg-gray-200">
            Sign In
          </Button>
        </div>
      </form>
      <div className="text-center">
        <Link href="/" className="text-white hover:underline">
          Back to Home
        </Link>
        <Link href="/forgot-password" className="text-white hover:underline ml-4">
          Forgot Password
        </Link>
      </div>
    </div>
  )
}

