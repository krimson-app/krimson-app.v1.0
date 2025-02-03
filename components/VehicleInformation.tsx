'use client'

import { useState, useEffect } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

interface VehicleInformationProps {
  onSubmit: (details: VehicleInformationType) => void
}

export type VehicleInformationType = {
  make: string
  model: string
  year: string
  color: string
  licensePlateState: string
  licensePlateText: string
  vin: string
}

const carBrands = [
  "Acura", "Audi", "BMW", "Buick", "Cadillac", "Chevrolet", "Chrysler", "Dodge", 
  "Ford", "GMC", "Honda", "Hyundai", "Infiniti", "Jeep", "Kia", "Lexus", 
  "Lincoln", "Mazda", "Mercedes-Benz", "Nissan", "Ram", "Subaru", "Tesla", 
  "Toyota", "Volkswagen", "Volvo"
]

const carModels: { [key: string]: string[] } = {
  "Acura": ["CDX", "ILX", "MDX", "NSX", "RDX", "RLX", "TLX", "TLX Type S"],
  "Audi": ["A3", "A4", "A5", "A6", "A7", "A8", "e-tron", "Q3", "Q5", "Q7", "Q8", "R8", "TT"],
  "BMW": ["1 Series", "2 Series", "3 Series", "4 Series", "5 Series", "6 Series", "7 Series", "8 Series", "i3", "i8", "X1", "X2", "X3", "X4", "X5", "X6", "X7", "Z4"],
  "Buick": ["Enclave", "Encore", "Envision", "LaCrosse", "Regal"],
  "Cadillac": ["ATS", "CT4", "CT5", "CT6", "CTS", "Escalade", "XT4", "XT5", "XT6"],
  "Chevrolet": ["Camaro", "Colorado", "Corvette", "Equinox", "Impala", "Malibu", "Silverado", "Sonic", "Spark", "Suburban", "Tahoe", "Trax", "Traverse"],
  "Chrysler": ["300", "Pacifica", "Voyager"],
  "Dodge": ["Challenger", "Charger", "Durango", "Grand Caravan", "Journey"],
  "Ford": ["Bronco", "EcoSport", "Edge", "Escape", "Expedition", "Explorer", "F-150", "Fiesta", "Focus", "Fusion", "Mustang", "Ranger"],
  "GMC": ["Acadia", "Canyon", "Sierra", "Terrain", "Yukon"],
  "Honda": ["Accord", "Civic", "CR-V", "Fit", "HR-V", "Insight", "Odyssey", "Passport", "Pilot", "Ridgeline"],
  "Hyundai": ["Accent", "Elantra", "Kona", "Nexo", "Palisade", "Santa Fe", "Sonata", "Tucson", "Veloster", "Venue"],
  "Infiniti": ["Q50", "Q60", "QX50", "QX60", "QX80"],
  "Jeep": ["Cherokee", "Compass", "Gladiator", "Grand Cherokee", "Renegade", "Wrangler"],
  "Kia": ["Forte", "K5", "Niro", "Rio", "Seltos", "Soul", "Sportage", "Stinger", "Telluride"],
  "Lexus": ["ES", "GS", "GX", "IS", "LC", "LS", "LX", "NX", "RC", "RX", "UX"],
  "Lincoln": ["Aviator", "Continental", "Corsair", "MKZ", "Nautilus", "Navigator"],
  "Mazda": ["CX-3", "CX-30", "CX-5", "CX-9", "Mazda2", "Mazda3", "Mazda6", "MX-5 Miata"],
  "Mercedes-Benz": ["A-Class", "AMG GT", "C-Class", "CLA", "CLS", "E-Class", "G-Class", "GLA", "GLB", "GLC", "GLE", "GLS", "S-Class", "SL"],
  "Nissan": ["Altima", "Armada", "Frontier", "Kicks", "Leaf", "Maxima", "Murano", "Pathfinder", "Rogue", "Sentra", "Titan", "Versa"],
  "Ram": ["1500", "2500", "3500", "ProMaster", "ProMaster City"],
  "Subaru": ["Ascent", "BRZ", "Crosstrek", "Forester", "Impreza", "Legacy", "Outback", "WRX"],
  "Tesla": ["Cybertruck", "Model 3", "Model S", "Model X", "Model Y", "Roadster"],
  "Toyota": ["4Runner", "Avalon", "C-HR", "Camry", "Corolla", "Highlander", "Land Cruiser", "Prius", "RAV4", "Sequoia", "Sienna", "Tacoma", "Tundra", "Yaris"],
  "Volkswagen": ["Arteon", "Atlas", "Golf", "ID.4", "Jetta", "Passat", "Tiguan"],
  "Volvo": ["S60", "S90", "V60", "V90", "XC40", "XC60", "XC90"]
}

const carColors = [
  "Black", "Blue", "Champagne", "Gold", "Green", "Grey", "Multicolor", "Orange", "Pink", "Purple", "Red", "Silver", "White", "Yellow"
]

const usStates = [
  "AL", "AK", "AZ", "AR", "CA", "CO", "CT", "DC", "DE", "FL", "GA", 
  "GU", "HI", "ID", "IL", "IN", "IA", "KS", "KY", "LA", "ME", "MD", 
  "MA", "MI", "MN", "MS", "MO", "MP", "MT", "NE", "NV", "NH", "NJ", 
  "NM", "NY", "NC", "ND", "OH", "OK", "OR", "PA", "PR", "RI", "SC", 
  "SD", "TN", "TX", "UT", "VT", "VA", "VI", "WA", "WV", "WI", "WY"
]

export function VehicleInformation({ onSubmit }: VehicleInformationProps) {
  const [make, setMake] = useState('')
  const [model, setModel] = useState('')
  const [year, setYear] = useState('')
  const [color, setColor] = useState('')
  const [licensePlateState, setLicensePlateState] = useState('')
  const [licensePlateText, setLicensePlateText] = useState('')
  const [vin, setVin] = useState('')

  useEffect(() => {
    // Reset model when make changes
    setModel('')
  }, [make])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSubmit({
      make,
      model,
      year,
      color,
      licensePlateState,
      licensePlateText,
      vin
    })
  }

  return (
    <div className="w-full max-w-md space-y-8">
      <div>
        <h2 className="mt-6 text-center text-3xl font-bold tracking-tight text-white">
          Vehicle Information
        </h2>
      </div>
      <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
        <div className="space-y-4 rounded-md shadow-sm">
          <div>
            <Label htmlFor="vehicle-make" className="text-white">Vehicle Make</Label>
            <Select value={make} onValueChange={setMake} required>
              <SelectTrigger id="vehicle-make" className="bg-transparent text-white placeholder-gray-400 border-white">
                <SelectValue placeholder="Select Make" />
              </SelectTrigger>
              <SelectContent className="bg-black text-white border-white">
                {carBrands.map((brand) => (
                  <SelectItem key={brand} value={brand} className="hover:bg-gray-700">
                    {brand}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div>
            <Label htmlFor="vehicle-model" className="text-white">Vehicle Model</Label>
            <Select value={model} onValueChange={setModel} required disabled={!make}>
              <SelectTrigger id="vehicle-model" className="bg-transparent text-white placeholder-gray-400 border-white">
                <SelectValue placeholder="Select Model" />
              </SelectTrigger>
              <SelectContent className="bg-black text-white border-white">
                {make && carModels[make].map((model) => (
                  <SelectItem key={model} value={model} className="hover:bg-gray-700">
                    {model}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div>
            <Label htmlFor="vehicle-year" className="text-white">Vehicle Year</Label>
            <Input
              id="vehicle-year"
              name="vehicleYear"
              type="text"
              required
              className="bg-transparent text-white placeholder-gray-400 border-white"
              placeholder="Vehicle Year"
              value={year}
              onChange={(e) => setYear(e.target.value)}
            />
          </div>
          <div>
            <Label htmlFor="vehicle-color" className="text-white">Vehicle Color</Label>
            <Select value={color} onValueChange={setColor} required>
              <SelectTrigger id="vehicle-color" className="bg-transparent text-white placeholder-gray-400 border-white">
                <SelectValue placeholder="Select Color" />
              </SelectTrigger>
              <SelectContent className="bg-black text-white border-white">
                {carColors.map((color) => (
                  <SelectItem key={color} value={color} className="hover:bg-gray-700">
                    {color}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div>
            <Label htmlFor="license-plate-state" className="text-white">Vehicle License Plate State</Label>
            <Select value={licensePlateState} onValueChange={setLicensePlateState} required>
              <SelectTrigger id="license-plate-state" className="bg-transparent text-white placeholder-gray-400 border-white">
                <SelectValue placeholder="Select State" />
              </SelectTrigger>
              <SelectContent className="bg-black text-white border-white">
                {usStates.map((state) => (
                  <SelectItem key={state} value={state} className="hover:bg-gray-700">
                    {state}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div>
            <Label htmlFor="license-plate-text" className="text-white">Vehicle License Plate Text</Label>
            <Input
              id="license-plate-text"
              name="licensePlateText"
              type="text"
              required
              className="bg-transparent text-white placeholder-gray-400 border-white"
              placeholder="Vehicle License Plate Text"
              value={licensePlateText}
              onChange={(e) => setLicensePlateText(e.target.value)}
            />
          </div>
          <div>
            <Label htmlFor="vin" className="text-white">VIN</Label>
            <Input
              id="vin"
              name="vin"
              type="text"
              required
              className="bg-transparent text-white placeholder-gray-400 border-white"
              placeholder="VIN"
              value={vin}
              onChange={(e) => setVin(e.target.value)}
            />
          </div>
        </div>
        <div>
          <Button
            type="submit"
            className="w-full bg-white text-black hover:bg-gray-200"
          >
            Submit
          </Button>
        </div>
      </form>
    </div>
  )
}

