"use client"

import React, { createContext, useContext, useState, type ReactNode } from "react"

type VehicleInfo = {
  make: string
  model: string
  year: string
  color: string
  licensePlate: string
  licensePlateState: string
  vin: string
}

type VehicleContextType = {
  vehicleInfo: VehicleInfo
  updateVehicleInfo: (info: Partial<VehicleInfo>) => void
}

const defaultVehicleInfo: VehicleInfo = {
  make: "Toyota",
  model: "Camry",
  year: "2022",
  color: "Silver",
  licensePlate: "ABC123",
  licensePlateState: "CA",
  vin: "1HGBH41JXMN109186",
}

const VehicleContext = createContext<VehicleContextType | undefined>(undefined)

export function VehicleProvider({ children }: { children: ReactNode }) {
  const [vehicleInfo, setVehicleInfo] = useState<VehicleInfo>(defaultVehicleInfo)

  const updateVehicleInfo = (info: Partial<VehicleInfo>) => {
    setVehicleInfo((prevInfo) => ({ ...prevInfo, ...info }))
  }

  return <VehicleContext.Provider value={{ vehicleInfo, updateVehicleInfo }}>{children}</VehicleContext.Provider>
}

export function useVehicle() {
  const context = useContext(VehicleContext)
  if (context === undefined) {
    throw new Error("useVehicle must be used within a VehicleProvider")
  }
  return context
}

