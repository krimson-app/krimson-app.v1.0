"use client"

import type React from "react"
import { createContext, useContext, useState, useEffect } from "react"
import { getUser } from "@/utils/auth"

type AuthContextType = {
  user: { phoneNumber: string; name: string } | null
  setUser: React.Dispatch<React.SetStateAction<{ phoneNumber: string; name: string } | null>>
  logout: () => void
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<{ phoneNumber: string; name: string } | null>(null)

  useEffect(() => {
    // Check if user is already authenticated
    const storedUser = localStorage.getItem("user")
    if (storedUser) {
      setUser(JSON.parse(storedUser))
    }
  }, [])

  const logout = () => {
    localStorage.removeItem("user")
    setUser(null)
  }

  return <AuthContext.Provider value={{ user, setUser, logout }}>{children}</AuthContext.Provider>
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}

