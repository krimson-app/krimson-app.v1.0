"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog"
import { AlertCircle } from "lucide-react"

interface DevelopmentPopupProps {
  isOpen: boolean
  onClose: () => void
}

export function DevelopmentPopup({ isOpen, onClose }: DevelopmentPopupProps) {
  const [showSignIn, setShowSignIn] = useState(false)
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [contact, setContact] = useState("")
  const [error, setError] = useState("")
  const [success, setSuccess] = useState("")

  const handleSignIn = (e: React.FormEvent) => {
    e.preventDefault()
    if (username === "CA" && password === "ABC123") {
      setError("")
      setSuccess("Sign in successful!")
      setTimeout(() => {
        onClose()
      }, 2000)
    } else {
      setError("Invalid credentials")
    }
  }

  const handleContactSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (contact) {
      setError("")
      setSuccess("Thank you! We&apos;ll notify you when the site is ready.")
      setTimeout(() => {
        onClose()
      }, 2000)
    } else {
      setError("Please enter a valid email or phone number")
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="bg-gradient-to-b from-black from-50% via-black via-75% to-[#DC1C3C] text-white border border-white">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold">
            {" "}
            <span className="text-[#DC1C3C] font-bold">Krimson</span> is Under Development
          </DialogTitle>
          <DialogDescription className="text-gray-300">
            We&apos;re working hard to get you connected. Please check back soon!
          </DialogDescription>
        </DialogHeader>
        {!showSignIn ? (
          <>
            <div className="space-y-4">
              <Button onClick={() => setShowSignIn(true)} className="w-full bg-white text-black hover:bg-gray-200">
                Sign In
              </Button>
              <div className="text-center">or</div>
              <form onSubmit={handleContactSubmit} className="space-y-4">
                <div>
                  <Label htmlFor="contact" className="text-white">
                    Get notified when we launch
                  </Label>
                  <Input
                    id="contact"
                    placeholder="Enter email or phone number"
                    value={contact}
                    onChange={(e) => setContact(e.target.value)}
                    className="bg-transparent text-white placeholder-white border-white mt-1"
                  />
                </div>
                <Button type="submit" className="w-full bg-white text-black hover:bg-gray-200">
                  Notify Me
                </Button>
              </form>
            </div>
          </>
        ) : (
          <form onSubmit={handleSignIn} className="space-y-4">
            <div>
              <Label htmlFor="username" className="text-white">
                Username
              </Label>
              <Input
                id="username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="bg-transparent text-white placeholder-gray-400 border-white mt-1"
              />
            </div>
            <div>
              <Label htmlFor="password" className="text-white">
                Password
              </Label>
              <Input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="bg-transparent text-white placeholder-gray-400 border-white mt-1"
              />
            </div>
            <Button type="submit" className="w-full bg-white text-black hover:bg-gray-200">
              Sign In
            </Button>
          </form>
        )}
        {error && (
          <div className="flex items-center space-x-2 text-red-500">
            <AlertCircle size={16} />
            <span>{error}</span>
          </div>
        )}
        {success && <div className="text-green-500">{success}</div>}
        <DialogFooter>
          <Button onClick={onClose} variant="outline" className="bg-white text-black hover:bg-gray-200">
            Close
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

