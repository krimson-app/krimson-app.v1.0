"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useVehicle } from "@/contexts/VehicleContext"

const carBrands = [
  "Audi",
  "BMW",
  "Chevrolet",
  "Ford",
  "Honda",
  "Hyundai",
  "Mercedes-Benz",
  "Nissan",
  "Toyota",
  "Volkswagen",
].sort()

const carModels: { [key: string]: string[] } = {
  Audi: ["A3", "A4", "A6", "Q5", "Q7"],
  BMW: ["3 Series", "5 Series", "X3", "X5", "i3"],
  Chevrolet: ["Malibu", "Cruze", "Equinox", "Silverado", "Tahoe"],
  Ford: ["F-150", "Escape", "Explorer", "Mustang", "Focus"],
  Honda: ["Civic", "Accord", "CR-V", "Pilot", "Odyssey"],
  Hyundai: ["Elantra", "Sonata", "Tucson", "Santa Fe", "Kona"],
  "Mercedes-Benz": ["C-Class", "E-Class", "GLC", "GLE", "S-Class"],
  Nissan: ["Altima", "Rogue", "Sentra", "Maxima", "Pathfinder"],
  Toyota: ["Camry", "Corolla", "RAV4", "Highlander", "Tacoma"],
  Volkswagen: ["Jetta", "Passat", "Tiguan", "Atlas", "Golf"],
}
const carColors = ["Black", "White", "Silver", "Gray", "Red", "Blue", "Green", "Yellow", "Orange", "Brown"]
const usStates = [
  "AL",
  "AK",
  "AZ",
  "AR",
  "CA",
  "CO",
  "CT",
  "DE",
  "FL",
  "GA",
  "HI",
  "ID",
  "IL",
  "IN",
  "IA",
  "KS",
  "KY",
  "LA",
  "ME",
  "MD",
  "MA",
  "MI",
  "MN",
  "MS",
  "MO",
  "MT",
  "NE",
  "NV",
  "NH",
  "NJ",
  "NM",
  "NY",
  "NC",
  "ND",
  "OH",
  "OK",
  "OR",
  "PA",
  "RI",
  "SC",
  "SD",
  "TN",
  "TX",
  "UT",
  "VT",
  "VA",
  "WA",
  "WV",
  "WI",
  "WY",
]

export function EditVehicleForm() {
  const router = useRouter()
  const { vehicleInfo, updateVehicleInfo } = useVehicle()
  const [localVehicleInfo, setLocalVehicleInfo] = useState(vehicleInfo)
  const [availableModels, setAvailableModels] = useState(carModels[vehicleInfo.make])

  useEffect(() => {
    setLocalVehicleInfo(vehicleInfo)
    setAvailableModels(carModels[vehicleInfo.make])
  }, [vehicleInfo])

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setLocalVehicleInfo((prev) => ({ ...prev, [name]: value }))
  }

  const handleSelectChange = (name: string, value: string) => {
    setLocalVehicleInfo((prev) => ({ ...prev, [name]: value }))
    if (name === "make") {
      setAvailableModels(carModels[value])
      setLocalVehicleInfo((prev) => ({ ...prev, model: carModels[value][0] }))
    }
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    updateVehicleInfo(localVehicleInfo)
    router.push("/dashboard")
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6 bg-white p-6 rounded-lg">
      <div className="grid grid-cols-2 gap-4">
        <div>
          <Label htmlFor="make" className="text-black">
            Make
          </Label>
          <Select
            name="make"
            value={localVehicleInfo.make}
            onValueChange={(value) => handleSelectChange("make", value)}
          >
            <SelectTrigger id="make" className="bg-white text-black border-gray-300">
              <SelectValue placeholder="Select make" />
            </SelectTrigger>
            <SelectContent>
              {carBrands.map((brand) => (
                <SelectItem key={brand} value={brand}>
                  {brand}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div>
          <Label htmlFor="model" className="text-black">
            Model
          </Label>
          <Select
            name="model"
            value={localVehicleInfo.model}
            onValueChange={(value) => handleSelectChange("model", value)}
          >
            <SelectTrigger id="model" className="bg-white text-black border-gray-300">
              <SelectValue placeholder="Select model" />
            </SelectTrigger>
            <SelectContent>
              {availableModels.map((model) => (
                <SelectItem key={model} value={model}>
                  {model}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div>
          <Label htmlFor="year" className="text-black">
            Year
          </Label>
          <Input
            id="year"
            name="year"
            value={localVehicleInfo.year}
            onChange={handleInputChange}
            className="bg-white text-black border-gray-300"
          />
        </div>
        <div>
          <Label htmlFor="color" className="text-black">
            Color
          </Label>
          <Select
            name="color"
            value={localVehicleInfo.color}
            onValueChange={(value) => handleSelectChange("color", value)}
          >
            <SelectTrigger id="color" className="bg-white text-black border-gray-300">
              <SelectValue placeholder="Select color" />
            </SelectTrigger>
            <SelectContent>
              {carColors.map((color) => (
                <SelectItem key={color} value={color}>
                  {color}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div>
          <Label htmlFor="licensePlate" className="text-black">
            License Plate
          </Label>
          <Input
            id="licensePlate"
            name="licensePlate"
            value={localVehicleInfo.licensePlate}
            onChange={handleInputChange}
            className="bg-white text-black border-gray-300"
          />
        </div>
        <div>
          <Label htmlFor="licensePlateState" className="text-black">
            License Plate State
          </Label>
          <Select
            name="licensePlateState"
            value={localVehicleInfo.licensePlateState}
            onValueChange={(value) => handleSelectChange("licensePlateState", value)}
          >
            <SelectTrigger id="licensePlateState" className="bg-white text-black border-gray-300">
              <SelectValue placeholder="Select state" />
            </SelectTrigger>
            <SelectContent>
              {usStates.map((state) => (
                <SelectItem key={state} value={state}>
                  {state}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div className="col-span-2">
          <Label htmlFor="vin" className="text-black">
            VIN
          </Label>
          <Input
            id="vin"
            name="vin"
            value={localVehicleInfo.vin}
            onChange={handleInputChange}
            className="bg-white text-black border-gray-300"
          />
        </div>
      </div>
      <div className="flex justify-between">
        <Button type="button" variant="outline" onClick={() => router.push("/dashboard")}>
          Cancel
        </Button>
        <Button type="submit" className="bg-[#DC1C3C] text-white hover:bg-[#B01730]">
          Save Changes
        </Button>
      </div>
    </form>
  )
}

