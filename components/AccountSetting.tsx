"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Eye, EyeOff } from "lucide-react"
import { TwoFactorAuth } from "./TwoFactorAuth"
import { verifyTFA } from "@/utils/auth"

export function AccountSettings() {
  const [firstName, setFirstName] = useState("John")
  const [lastName, setLastName] = useState("Doe")
  const [email, setEmail] = useState("john.doe@example.com")
  const [phone, setPhone] = useState("(123) 456-7890")
  const [emailNotifications, setEmailNotifications] = useState(true)
  const [smsNotifications, setSmsNotifications] = useState(true)
  const [codeWord, setCodeWord] = useState("ducky")
  const [showCodeWord, setShowCodeWord] = useState(false)
  const [showTwoFactor, setShowTwoFactor] = useState(false)
  const [isCodeWordVerified, setIsCodeWordVerified] = useState(false)
  const [lastPhoneChange, setLastPhoneChange] = useState<Date | null>(null)

  useEffect(() => {
    // In a real application, you would fetch the user's data here
    // For now, we're using the dummy data
    setLastPhoneChange(new Date(Date.now() - 25 * 60 * 60 * 1000)) // Set to 25 hours ago for testing
  }, [])

  const handleSave = () => {
    // In a real application, you would save the changes here
    alert("Changes saved successfully!")
  }

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPhone(e.target.value)
    setLastPhoneChange(new Date())
  }

  const handleCodeWordClick = () => {
    if (!isCodeWordVerified) {
      setShowTwoFactor(true)
    } else {
      setShowCodeWord(!showCodeWord)
    }
  }

  const handleTwoFactorSubmit = (code: string) => {
    if (verifyTFA(code)) {
      setIsCodeWordVerified(true)
      setShowTwoFactor(false)
      setShowCodeWord(true)
    } else {
      alert("Invalid verification code. Please try again.")
    }
  }

  const canChangeCodeWord = () => {
    if (!lastPhoneChange) return true
    const hoursSinceLastChange = (Date.now() - lastPhoneChange.getTime()) / (1000 * 60 * 60)
    return hoursSinceLastChange >= 24
  }

  if (showTwoFactor) {
    return <TwoFactorAuth onSubmit={handleTwoFactorSubmit} />
  }

  return (
    <div className="space-y-6 bg-white p-6 rounded-lg">
      <div className="space-y-2">
        <h3 className="text-lg font-medium text-black">Personal Information</h3>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <Label htmlFor="first-name" className="text-black">
              First Name
            </Label>
            <Input
              id="first-name"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              className="bg-white text-black border-gray-300"
            />
          </div>
          <div>
            <Label htmlFor="last-name" className="text-black">
              Last Name
            </Label>
            <Input
              id="last-name"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              className="bg-white text-black border-gray-300"
            />
          </div>
          <div>
            <Label htmlFor="email" className="text-black">
              Email
            </Label>
            <Input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="bg-white text-black border-gray-300"
            />
          </div>
          <div>
            <Label htmlFor="phone" className="text-black">
              Phone
            </Label>
            <Input
              id="phone"
              type="tel"
              value={phone}
              onChange={handlePhoneChange}
              className="bg-white text-black border-gray-300"
            />
          </div>
        </div>
      </div>
      <div className="space-y-2">
        <h3 className="text-lg font-medium text-black">Security</h3>
        <div className="space-y-2">
          <Label htmlFor="code-word" className="text-black">
            Code Word
          </Label>
          <div className="flex space-x-2">
            <Input
              id="code-word"
              type={showCodeWord ? "text" : "password"}
              value={codeWord}
              onChange={(e) => setCodeWord(e.target.value)}
              className="bg-white text-black border-gray-300"
              disabled={!isCodeWordVerified || !canChangeCodeWord()}
            />
            <Button
              type="button"
              variant="outline"
              size="icon"
              onClick={handleCodeWordClick}
              className="bg-white text-black border-gray-300 hover:bg-gray-100"
            >
              {showCodeWord ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
            </Button>
          </div>
          {!canChangeCodeWord() && (
            <p className="text-sm text-red-500">
              You cannot change the code word within 24 hours of updating your phone number.
            </p>
          )}
        </div>
      </div>
      <div className="space-y-2">
        <h3 className="text-lg font-medium text-black">Notification Preferences</h3>
        <div className="flex items-center space-x-2">
          <Switch id="email-notifications" checked={emailNotifications} onCheckedChange={setEmailNotifications} />
          <Label htmlFor="email-notifications" className="text-black">
            Email Notifications
          </Label>
        </div>
        <div className="flex items-center space-x-2">
          <Switch id="sms-notifications" checked={smsNotifications} onCheckedChange={setSmsNotifications} />
          <Label htmlFor="sms-notifications" className="text-black">
            SMS Notifications
          </Label>
        </div>
      </div>
      <div className="space-y-2">
        <h3 className="text-lg font-medium text-black">Subscription</h3>
        <p className="text-black">Current Plan: Annual ($49.99/year)</p>
        <Button variant="outline" className="bg-white text-black border-gray-300 hover:bg-gray-100">
          Change Plan
        </Button>
      </div>
      <Button onClick={handleSave} className="w-full bg-[#DC1C3C] text-white hover:bg-[#B01730]">
        Save Changes
      </Button>
    </div>
  )
}

