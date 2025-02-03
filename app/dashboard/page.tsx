"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"
import { SubscriberDashboard } from "@/components/SubscriberDashboard"
import { useAuth } from "@/contexts/AuthContext"

export default function DashboardPage() {
  const router = useRouter()
  const { user } = useAuth()

  useEffect(() => {
    if (!user) {
      router.push("/signin")
    }
  }, [user, router])

  if (!user) {
    return null
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-black via-black via-[#DC1C3C] to-[#DC1C3C] bg-fixed">
      <SubscriberDashboard />
    </div>
  )
}

