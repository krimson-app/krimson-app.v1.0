"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { VehicleDetails } from "./VehicleDetails"
import { MessageHistory } from "./MessageHistory"
import { AccountSettings } from "./AccountSettings"
import { Button } from "./ui/button"
import { User, Bell, LogOut } from "lucide-react"
import { useAuth } from "@/contexts/AuthContext"
import { VehicleProvider } from "@/contexts/VehicleContext"
import { useRouter } from "next/navigation"

export function SubscriberDashboard() {
  const { user, logout } = useAuth()
  const router = useRouter()
  const [activeTab, setActiveTab] = useState("vehicle")

  const handleLogout = () => {
    logout()
    router.push("/signin")
  }

  return (
    <VehicleProvider>
      <div className="container mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-white">Welcome, {user?.name || "Subscriber"}</h1>
          <div className="flex space-x-4">
            <Button variant="outline" size="icon">
              <Bell className="h-4 w-4" />
            </Button>
            <Button variant="outline" size="icon">
              <User className="h-4 w-4" />
            </Button>
            <Button variant="outline" size="icon" onClick={handleLogout}>
              <LogOut className="h-4 w-4" />
            </Button>
          </div>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="vehicle">Vehicle Details</TabsTrigger>
            <TabsTrigger value="messages">Message History</TabsTrigger>
            <TabsTrigger value="account">Account Settings</TabsTrigger>
          </TabsList>
          <TabsContent value="vehicle">
            <Card>
              <CardHeader>
                <CardTitle>Vehicle Details</CardTitle>
                <CardDescription>View and manage your vehicle information</CardDescription>
              </CardHeader>
              <CardContent>
                <VehicleDetails />
              </CardContent>
            </Card>
          </TabsContent>
          <TabsContent value="messages">
            <Card>
              <CardHeader>
                <CardTitle>Message History</CardTitle>
                <CardDescription>View your recent messages and interactions</CardDescription>
              </CardHeader>
              <CardContent>
                <MessageHistory />
              </CardContent>
            </Card>
          </TabsContent>
          <TabsContent value="account">
            <Card>
              <CardHeader>
                <CardTitle>Account Settings</CardTitle>
                <CardDescription>Manage your account preferences and subscription</CardDescription>
              </CardHeader>
              <CardContent>
                <AccountSettings />
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </VehicleProvider>
  )
}

