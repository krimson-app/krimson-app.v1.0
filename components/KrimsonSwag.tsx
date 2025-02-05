"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

interface KrimsonSwagProps {
  onSubmit: (preferences: KrimsonSwagType) => void
}

export type KrimsonSwagType = {
  licensePlateFrame: number
  windowDecals: number
  bumperMagnets: number
  carDoorMagnets: number
}

export function KrimsonSwag({ onSubmit }: KrimsonSwagProps) {
  const [licensePlateFrame, setLicensePlateFrame] = useState(0)
  const [windowDecals, setWindowDecals] = useState(0)
  const [bumperMagnets, setBumperMagnets] = useState(0)
  const [carDoorMagnets, setCarDoorMagnets] = useState(0)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSubmit({
      licensePlateFrame,
      windowDecals,
      bumperMagnets,
      carDoorMagnets,
    })
  }

  const renderQuantityDropdown = (value: number, onChange: (value: number) => void, max: number) => (
    <Select value={value.toString()} onValueChange={(v) => onChange(Number.parseInt(v))}>
      <SelectTrigger className="w-[140px] bg-transparent text-white border-white">
        <SelectValue placeholder="Quantity" />
      </SelectTrigger>
      <SelectContent className="bg-black text-white border-white">
        {[...Array(max + 1).keys()].map((i) => (
          <SelectItem key={i} value={i.toString()} className="hover:bg-gray-700">
            {i}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  )

  return (
    <div className="w-full max-w-md space-y-8">
      <div>
        <h2 className="mt-6 text-center text-3xl font-bold tracking-tight text-white">
          Let People Know You Have Krimson!
        </h2>
        <p className="mt-4 text-center text-sm text-white">
          At Krimson, we want people to know they can reach you if there is an issue with your vehicle, so we
          encourage you to add whichever Krimson swag you want to display.
        </p>
        <p className="mt-2 text-center text-sm text-white">
          To show you we are serious, once you receive your swag, send us pictures of it displayed on your vehicle and
          we will gift you free months on your subscription - up to 18 months if you are swag-tastic!
        </p>
        <p className="mt-2 text-center text-sm text-gray-300">Select Your Krimson Swag:</p>
      </div>
      <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <Label htmlFor="license-plate-frame" className="text-white">
                License Plate Frame
              </Label>
              <p className="text-sm text-white font-semibold">2 Free Months (per frame)</p>
            </div>
            {renderQuantityDropdown(licensePlateFrame, setLicensePlateFrame, 2)}
          </div>
          <div className="flex items-center justify-between">
            <div>
              <Label htmlFor="window-decals" className="text-white">
                Window Decals
              </Label>
              <p className="text-sm text-white font-semibold">1 Free Month (per decal)</p>
            </div>
            {renderQuantityDropdown(windowDecals, setWindowDecals, 4)}
          </div>
          <div className="flex items-center justify-between">
            <div>
              <Label htmlFor="bumper-magnets" className="text-white">
                Bumper Magnets
              </Label>
              <p className="text-sm text-white font-semibold">2 Free Months (per magnet)</p>
            </div>
            {renderQuantityDropdown(bumperMagnets, setBumperMagnets, 2)}
          </div>
          <div className="flex items-center justify-between">
            <div>
              <Label htmlFor="car-door-magnets" className="text-white">
                Car Door Magnets
              </Label>
              <p className="text-sm text-white font-semibold">3 Free Months (per magnet)</p>
            </div>
            {renderQuantityDropdown(carDoorMagnets, setCarDoorMagnets, 2)}
          </div>
        </div>
        <div className="mt-6 text-center">
          <p className="text-white text-lg font-bold">
            Total Free Months: {licensePlateFrame * 2 + windowDecals + bumperMagnets * 2 + carDoorMagnets * 3}
          </p>
        </div>
        <div>
          <Button type="submit" className="w-full bg-white text-black hover:bg-gray-200">
            Continue
          </Button>
        </div>
      </form>
    </div>
  )
}

