"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { useAuth } from "@/contexts/AuthContext"
import { EditVehicleForm } from "@/components/EditVehicleForm"
import { VehicleProvider } from "@/contexts/VehicleContext"

export default function EditVehiclePage() {
  const router = useRouter()
  const { user } = useAuth()
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    if (!user) {
      router.push("/signin")
    } else {
      setIsLoading(false)
    }
  }, [user, router])

  if (isLoading) {
    return <div className="flex justify-center items-center h-screen">Loading...</div>
  }

  return (
    <VehicleProvider>
      <div className="min-h-screen bg-gradient-to-b from-black via-black via-[#DC1C3C] to-[#DC1C3C] bg-fixed">
        <div className="container mx-auto px-4 py-8">
          <h1 className="text-3xl font-bold text-white mb-8">Edit Vehicle Information</h1>
          <EditVehicleForm />
        </div>
      </div>
    </VehicleProvider>
  )
}

