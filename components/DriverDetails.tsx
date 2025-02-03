'use client'

import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"

interface DriverDetailsProps {
  onSubmit: (details: DriverDetailsType) => void
}

export type DriverDetailsType = {
  firstName: string
  lastName: string
  mailingAddress: string
  vehicleAddress: string
}

export function DriverDetails({ onSubmit }: DriverDetailsProps) {
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [mailingAddress, setMailingAddress] = useState('')
  const [vehicleAddress, setVehicleAddress] = useState('')
  const [sameAddress, setSameAddress] = useState(true)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSubmit({
      firstName,
      lastName,
      mailingAddress,
      vehicleAddress: sameAddress ? mailingAddress : vehicleAddress
    })
  }

  return (
    <div className="w-full max-w-md space-y-8">
      <div>
        <h2 className="mt-6 text-center text-3xl font-bold tracking-tight text-white">
          Driver Details
        </h2>
      </div>
      <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
        <div className="space-y-4 rounded-md shadow-sm">
          <div>
            <Label htmlFor="first-name" className="sr-only">First Name</Label>
            <Input
              id="first-name"
              name="firstName"
              type="text"
              required
              className="bg-transparent text-white placeholder-gray-400 border-white"
              placeholder="First Name"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
            />
          </div>
          <div>
            <Label htmlFor="last-name" className="sr-only">Last Name</Label>
            <Input
              id="last-name"
              name="lastName"
              type="text"
              required
              className="bg-transparent text-white placeholder-gray-400 border-white"
              placeholder="Last Name"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
            />
          </div>
          <div>
            <Label htmlFor="mailing-address" className="sr-only">Mailing Address</Label>
            <Input
              id="mailing-address"
              name="mailingAddress"
              type="text"
              required
              className="bg-transparent text-white placeholder-gray-400 border-white"
              placeholder="Mailing Address"
              value={mailingAddress}
              onChange={(e) => setMailingAddress(e.target.value)}
            />
          </div>
          <div className="flex items-center space-x-2">
            <Checkbox
              id="same-address"
              checked={sameAddress}
              onCheckedChange={(checked) => setSameAddress(checked as boolean)}
              className="border-white"
            />
            <Label htmlFor="same-address" className="text-white">
              Vehicle address same as mailing address
            </Label>
          </div>
          {!sameAddress && (
            <div>
              <Label htmlFor="vehicle-address" className="sr-only">Vehicle Address</Label>
              <Input
                id="vehicle-address"
                name="vehicleAddress"
                type="text"
                required
                className="bg-transparent text-white placeholder-gray-400 border-white"
                placeholder="Vehicle Address"
                value={vehicleAddress}
                onChange={(e) => setVehicleAddress(e.target.value)}
              />
            </div>
          )}
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

