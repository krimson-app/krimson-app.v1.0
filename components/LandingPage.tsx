"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { AlertCircle } from "lucide-react"

const usStatesAndTerritories = [
  { code: "AL", name: "Alabama" },
  { code: "AK", name: "Alaska" },
  { code: "AZ", name: "Arizona" },
  { code: "AR", name: "Arkansas" },
  { code: "CA", name: "California" },
  { code: "CO", name: "Colorado" },
  { code: "CT", name: "Connecticut" },
  { code: "DE", name: "Delaware" },
  { code: "FL", name: "Florida" },
  { code: "GA", name: "Georgia" },
  { code: "HI", name: "Hawaii" },
  { code: "ID", name: "Idaho" },
  { code: "IL", name: "Illinois" },
  { code: "IN", name: "Indiana" },
  { code: "IA", name: "Iowa" },
  { code: "KS", name: "Kansas" },
  { code: "KY", name: "Kentucky" },
  { code: "LA", name: "Louisiana" },
  { code: "ME", name: "Maine" },
  { code: "MD", name: "Maryland" },
  { code: "MA", name: "Massachusetts" },
  { code: "MI", name: "Michigan" },
  { code: "MN", name: "Minnesota" },
  { code: "MS", name: "Mississippi" },
  { code: "MO", name: "Missouri" },
  { code: "MT", name: "Montana" },
  { code: "NE", name: "Nebraska" },
  { code: "NV", name: "Nevada" },
  { code: "NH", name: "New Hampshire" },
  { code: "NJ", name: "New Jersey" },
  { code: "NM", name: "New Mexico" },
  { code: "NY", name: "New York" },
  { code: "NC", name: "North Carolina" },
  { code: "ND", name: "North Dakota" },
  { code: "OH", name: "Ohio" },
  { code: "OK", name: "Oklahoma" },
  { code: "OR", name: "Oregon" },
  { code: "PA", name: "Pennsylvania" },
  { code: "RI", name: "Rhode Island" },
  { code: "SC", name: "South Carolina" },
  { code: "SD", name: "South Dakota" },
  { code: "TN", name: "Tennessee" },
  { code: "TX", name: "Texas" },
  { code: "UT", name: "Utah" },
  { code: "VT", name: "Vermont" },
  { code: "VA", name: "Virginia" },
  { code: "WA", name: "Washington" },
  { code: "WV", name: "West Virginia" },
  { code: "WI", name: "Wisconsin" },
  { code: "WY", name: "Wyoming" },
  { code: "DC", name: "District of Columbia" },
  { code: "AS", name: "American Samoa" },
  { code: "GU", name: "Guam" },
  { code: "MP", name: "Northern Mariana Islands" },
  { code: "PR", name: "Puerto Rico" },
  { code: "VI", name: "U.S. Virgin Islands" },
]

const capitalizeFirstLetter = (input: string) => {
  return input.charAt(0).toUpperCase() + input.slice(1).toLowerCase()
}

const connectionReasons = {
  emergency: [
    "Animal Locked in Vehicle",
    "Child Locked in Vehicle",
    "Crime in Progress",
    "Fire",
    "Medical Emergency",
    "Other Emergency",
  ],
  parking: [
    "Blocked Driveway",
    "Blocking a Vehicle",
    "Expired Meter",
    "Headlights On",
    "No Parking Zone",
    "Police/Parking Enforcement Warning",
    "Tow Warning",
    "Other Parking Issue",
  ],
  connections: [
    "For Sale Inquiry",
    "Paint/Wrap Job Referral",
    "Vanity Plate Question",
    "Vehicle Maintenance Referral",
    "Vehicle Make/Model Referral",
    "Wheels/Rims Referral",
    "Window Tint Referral",
    "Other Mods Referral/Question",
  ],
}

const affectedAreas = {
  vandalism: [
    { id: "tires", label: "Tires" },
    { id: "body", label: "Vehicle body/paint" },
    { id: "windows", label: "Windows/Windshield" },
  ],
  accident: [
    { id: "tires", label: "Tires" },
    { id: "body", label: "Vehicle body/paint" },
    { id: "windows", label: "Windows/Windshield" },
  ],
}

// Mock function to check if the license plate matches a subscriber
const isSubscriber = (state: string, plateNumber: string): boolean => {
  // This is a placeholder implementation. In a real application, this would involve
  // checking against a database or making an API call to verify the information.
  const mockSubscribers = [
    { state: "CA", plateNumber: "ABC123" },
    { state: "NY", plateNumber: "XYZ789" },
    // Add more mock subscribers as needed
  ]

  return mockSubscribers.some((subscriber) => subscriber.state === state && subscriber.plateNumber === plateNumber)
}

export default function LandingPage() {
  const router = useRouter()
  const [state, setState] = useState("")
  const [plateNumber, setPlateNumber] = useState("")
  const [category, setCategory] = useState("")
  const [reason, setReason] = useState("")
  const [affectedAreasChecked, setAffectedAreasChecked] = useState<string[]>([])
  const [showDialog, setShowDialog] = useState(false)
  const [showSymbolDropdown, setShowSymbolDropdown] = useState(false)
  const [selectedSymbol, setSelectedSymbol] = useState("")

  useEffect(() => {
    // Reset reason and affected areas when category changes
    setReason("")
    setAffectedAreasChecked([])
  }, [category])

  useEffect(() => {
    // Show symbol dropdown if # is present in the plate number for California
    setShowSymbolDropdown(state === "CA" && plateNumber.includes("#"))
  }, [state, plateNumber])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!state || !plateNumber || !category) {
      alert("Please fill in all required fields.")
      return
    }
    if (["vandalism", "accident"].includes(category) && affectedAreasChecked.length === 0) {
      alert("Please select at least one affected area.")
      return
    }

    // Check if the license plate information matches a subscriber
    if (!isSubscriber(state, plateNumber)) {
      setShowDialog(true)
      return
    }

    console.log({ state, plateNumber, category, reason, affectedAreasChecked, selectedSymbol })
    const queryParams = new URLSearchParams({
      category: capitalizeFirstLetter(category),
      ...(reason ? { reason: capitalizeFirstLetter(reason) } : {}),
      ...(affectedAreasChecked.length > 0
        ? { affectedAreas: affectedAreasChecked.map(capitalizeFirstLetter).join(",") }
        : {}),
    }).toString()
    router.push(`/connect?${queryParams}`)
  }

  const handleAffectedAreaChange = (areaId: string) => {
    setAffectedAreasChecked((prev) => (prev.includes(areaId) ? prev.filter((id) => id !== areaId) : [...prev, areaId]))
  }

  return (
    <>
      <form onSubmit={handleSubmit} className="space-y-6 bg-transparent p-6 rounded-lg max-w-md mx-auto mt-4">
        <h2 className="text-xl text-gray-300 mb-6 text-center">
          Please enter the following details to reach out to a <span className="text-[#DC1C3C] font-bold">Krimson</span>{" "}
          subscriber:
        </h2>
        <div className="space-y-2">
          <Label htmlFor="state" className="text-white">
            License Plate State <span className="text-red-500">*</span>
          </Label>
          <Select value={state} onValueChange={setState} required>
            <SelectTrigger id="state" className="bg-transparent text-white border-white">
              <SelectValue placeholder="Select state" />
            </SelectTrigger>
            <SelectContent className="bg-black text-white border-white">
              {usStatesAndTerritories.map((state) => (
                <SelectItem key={state.code} value={state.code} className="hover:bg-gray-700">
                  {state.code} - {state.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div className="space-y-2">
          <Label htmlFor="plateNumber" className="text-white">
            License Plate Number <span className="text-red-500">*</span>
          </Label>
          <Input
            id="plateNumber"
            value={plateNumber}
            onChange={(e) => setPlateNumber(e.target.value)}
            required
            className="bg-transparent text-white placeholder-white border-white"
            placeholder="Enter plate number"
            maxLength={8}
          />
          {state === "CA" && (
            <p className="text-sm text-gray-300 mt-1">
              If the plate contains a symbol, enter a # in the proper place and choose from the drop-down menu below.
            </p>
          )}
        </div>
        {showSymbolDropdown && (
          <div className="space-y-2">
            <Label htmlFor="symbol" className="text-white">
              Symbol Selection
            </Label>
            <Select value={selectedSymbol} onValueChange={setSelectedSymbol} required>
              <SelectTrigger id="symbol" className="bg-transparent text-white border-white">
                <SelectValue placeholder="Select symbol" />
              </SelectTrigger>
              <SelectContent className="bg-black text-white border-white">
                {["Heart", "Star", "Hand", "Plus"].map((symbol) => (
                  <SelectItem key={symbol} value={symbol} className="hover:bg-gray-700">
                    {symbol}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        )}
        <div className="space-y-2">
          <Label htmlFor="category" className="text-white">
            Connection Category <span className="text-red-500">*</span>
          </Label>
          <Select value={category} onValueChange={setCategory} required>
            <SelectTrigger id="category" className="bg-transparent text-white border-white">
              <SelectValue placeholder="Select your category" />
            </SelectTrigger>
            <SelectContent className="bg-black text-white border-white">
              <SelectItem value="emergency" className="hover:bg-white hover:text-black focus:bg-white focus:text-black">
                Emergency
              </SelectItem>
              <SelectItem value="accident" className="hover:bg-white hover:text-black focus:bg-white focus:text-black">
                Accident Notification
              </SelectItem>
              <SelectItem value="vandalism" className="hover:bg-white hover:text-black focus:bg-white focus:text-black">
                Vandalism Notification
              </SelectItem>
              <SelectItem value="parking" className="hover:bg-white hover:text-black focus:bg-white focus:text-black">
                Parking Issue
              </SelectItem>
              <SelectItem
                value="connections"
                className="hover:bg-white hover:text-black focus:bg-white focus:text-black"
              >
                Connections/Questions
              </SelectItem>
            </SelectContent>
          </Select>
        </div>
        {category && !["vandalism", "accident"].includes(category) && (
          <div className="space-y-2">
            <Label htmlFor="reason" className="text-white">
              Reason to Connect
            </Label>
            <Select value={reason} onValueChange={setReason} required>
              <SelectTrigger id="reason" className="bg-transparent text-white border-white">
                <SelectValue placeholder="Select your reason" />
              </SelectTrigger>
              <SelectContent className="bg-black text-white border-white">
                {connectionReasons[category as keyof typeof connectionReasons]?.map((reason) => (
                  <SelectItem key={reason} value={reason} className="hover:bg-transparent focus:bg-transparent">
                    {reason}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        )}
        {["vandalism", "accident"].includes(category) && (
          <div className="space-y-2">
            <Label className="text-white">
              Affected Area <span className="text-red-500">*</span>
            </Label>
            <p className="text-sm text-gray-300 mb-2">Select all that apply</p>
            {affectedAreas[category as "vandalism" | "accident"].map((area) => (
              <div key={area.id} className="flex items-center space-x-2">
                <Checkbox
                  id={area.id}
                  checked={affectedAreasChecked.includes(area.id)}
                  onCheckedChange={() => handleAffectedAreaChange(area.id)}
                  className="border-white"
                />
                <Label htmlFor={area.id} className="text-white">
                  {area.label}
                </Label>
              </div>
            ))}
          </div>
        )}
        {category === "emergency" && (
          <div className="bg-red-500 bg-opacity-20 border border-red-500 rounded-md p-4 flex items-start space-x-2">
            <AlertCircle className="text-red-500 mt-1 flex-shrink-0" />
            <p className="text-white text-sm">
              If this is a life-threatening emergency, please call 911 or your local emergency services immediately.
            </p>
          </div>
        )}
        <Button type="submit" className="w-full bg-white text-black hover:bg-gray-200">
          Connect
        </Button>
        <div className="flex justify-center space-x-4 mt-4">
          <Link href="/signin" className="text-white hover:underline">
            Sign In
          </Link>
          <Link href="/register" className="text-white hover:underline">
            Register
          </Link>
        </div>
      </form>

      <Dialog open={showDialog} onOpenChange={setShowDialog}>
        <DialogContent className="bg-black text-white border border-white">
          <DialogHeader>
            <DialogTitle>Subscriber Not Found</DialogTitle>
            <DialogDescription>
              The license plate information you entered does not match our subscriber records.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button onClick={() => setShowDialog(false)} className="bg-white text-black hover:bg-gray-200">
              Close
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  )
}

