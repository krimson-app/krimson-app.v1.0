import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import Link from "next/link"
import { useVehicle } from "@/contexts/VehicleContext"

export function VehicleDetails() {
  const { vehicleInfo } = useVehicle()

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-2 gap-4">
        <div>
          <Label htmlFor="make">Make</Label>
          <Input id="make" value={vehicleInfo.make} readOnly />
        </div>
        <div>
          <Label htmlFor="model">Model</Label>
          <Input id="model" value={vehicleInfo.model} readOnly />
        </div>
        <div>
          <Label htmlFor="year">Year</Label>
          <Input id="year" value={vehicleInfo.year} readOnly />
        </div>
        <div>
          <Label htmlFor="color">Color</Label>
          <Input id="color" value={vehicleInfo.color} readOnly />
        </div>
        <div>
          <Label htmlFor="license-plate">License Plate Characters</Label>
          <Input id="license-plate" value={vehicleInfo.licensePlate} readOnly />
        </div>
        <div>
          <Label htmlFor="license-plate-state">License Plate State</Label>
          <Input id="license-plate-state" value={vehicleInfo.licensePlateState} readOnly />
        </div>
        <div>
          <Label htmlFor="vin">VIN</Label>
          <Input id="vin" value={vehicleInfo.vin} readOnly />
        </div>
      </div>
      <Link href="/dashboard/edit-vehicle" passHref>
        <Button className="w-full mt-4">Edit Vehicle Information</Button>
      </Link>
    </div>
  )
}

