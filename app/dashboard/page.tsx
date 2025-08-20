"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  Car,
  MapPin,
  Clock,
  Users,
  Phone,
  Star,
  Plus,
  History,
  Navigation,
  CreditCard,
  Settings,
  LogOut,
  Home,
} from "lucide-react"
import Link from "next/link"

interface Booking {
  id: string
  status: "upcoming" | "in-progress" | "completed" | "cancelled"
  pickup: string
  dropLocation: string
  date: string
  time: string
  vehicleType: string
  driverName: string
  driverPhone: string
  totalAmount: number
  distance: number
  rating?: number
}

const currentBookings: Booking[] = [
  {
    id: "WC12345678",
    status: "upcoming",
    pickup: "Wardha",
    dropLocation: "Mumbai Airport",
    date: "2024-12-25",
    time: "08:00",
    vehicleType: "SUV",
    driverName: "Rajesh Kumar",
    driverPhone: "+91 98765 43210",
    totalAmount: 12960,
    distance: 720,
  },
  {
    id: "WC87654321",
    status: "in-progress",
    pickup: "Wardha",
    dropLocation: "Nagpur",
    date: "2024-12-20",
    time: "14:30",
    vehicleType: "Sedan",
    driverName: "Amit Sharma",
    driverPhone: "+91 98765 43211",
    totalAmount: 936,
    distance: 78,
  },
]

const pastBookings: Booking[] = [
  {
    id: "WC11111111",
    status: "completed",
    pickup: "Wardha",
    dropLocation: "Pune",
    date: "2024-12-15",
    time: "09:00",
    vehicleType: "SUV",
    driverName: "Pradeep Singh",
    driverPhone: "+91 98765 43212",
    totalAmount: 9360,
    distance: 520,
    rating: 5,
  },
  {
    id: "WC22222222",
    status: "completed",
    pickup: "Wardha",
    dropLocation: "Nashik",
    date: "2024-12-10",
    time: "16:00",
    vehicleType: "Sedan",
    driverName: "Vikram Patil",
    driverPhone: "+91 98765 43213",
    totalAmount: 4560,
    distance: 380,
    rating: 4,
  },
  {
    id: "WC33333333",
    status: "cancelled",
    pickup: "Wardha",
    dropLocation: "Aurangabad",
    date: "2024-12-05",
    time: "11:00",
    vehicleType: "Luxury",
    driverName: "N/A",
    driverPhone: "N/A",
    totalAmount: 7000,
    distance: 280,
  },
]

export default function DashboardPage() {
  const [activeTab, setActiveTab] = useState("current")

  const getStatusColor = (status: string) => {
    switch (status) {
      case "upcoming":
        return "bg-blue-100 text-blue-800 border-blue-200"
      case "in-progress":
        return "bg-green-100 text-green-800 border-green-200"
      case "completed":
        return "bg-primary/10 text-primary border-primary/20"
      case "cancelled":
        return "bg-red-100 text-red-800 border-red-200"
      default:
        return "bg-gray-100 text-gray-800 border-gray-200"
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "upcoming":
        return <Clock className="h-4 w-4" />
      case "in-progress":
        return <Navigation className="h-4 w-4" />
      case "completed":
        return <Car className="h-4 w-4" />
      case "cancelled":
        return <Clock className="h-4 w-4" />
      default:
        return <Clock className="h-4 w-4" />
    }
  }

  const BookingCard = ({ booking }: { booking: Booking }) => (
    <Card className="hover:shadow-md transition-shadow">
      <CardContent className="p-6">
        <div className="flex items-start justify-between mb-4">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="font-mono text-sm font-medium">{booking.id}</span>
              <Badge className={`${getStatusColor(booking.status)} flex items-center gap-1`}>
                {getStatusIcon(booking.status)}
                {booking.status.charAt(0).toUpperCase() + booking.status.slice(1)}
              </Badge>
            </div>
            <p className="text-sm text-muted-foreground">
              {new Date(booking.date).toLocaleDateString("en-IN", {
                weekday: "short",
                month: "short",
                day: "numeric",
              })}{" "}
              at {booking.time}
            </p>
          </div>
          <div className="text-right">
            <p className="font-semibold text-primary">₹{booking.totalAmount}</p>
            <p className="text-xs text-muted-foreground">{booking.distance} km</p>
          </div>
        </div>

        <div className="space-y-3">
          <div className="flex items-center gap-3">
            <MapPin className="h-4 w-4 text-muted-foreground" />
            <div className="flex-1">
              <p className="text-sm">
                <span className="font-medium">{booking.pickup}</span> →{" "}
                <span className="font-medium">{booking.dropLocation}</span>
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <Car className="h-4 w-4 text-muted-foreground" />
            <p className="text-sm">{booking.vehicleType}</p>
          </div>

          {booking.driverName !== "N/A" && (
            <div className="flex items-center gap-3">
              <Users className="h-4 w-4 text-muted-foreground" />
              <div className="flex-1 flex items-center justify-between">
                <p className="text-sm">{booking.driverName}</p>
                {booking.status === "in-progress" && (
                  <Button size="sm" variant="outline" asChild className="bg-transparent">
                    <a href={`tel:${booking.driverPhone}`} className="flex items-center gap-1">
                      <Phone className="h-3 w-3" />
                      Call
                    </a>
                  </Button>
                )}
              </div>
            </div>
          )}

          {booking.rating && (
            <div className="flex items-center gap-3">
              <Star className="h-4 w-4 text-muted-foreground" />
              <div className="flex items-center gap-1">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`h-3 w-3 ${i < booking.rating! ? "fill-yellow-400 text-yellow-400" : "text-gray-300"}`}
                  />
                ))}
                <span className="text-xs text-muted-foreground ml-1">({booking.rating}/5)</span>
              </div>
            </div>
          )}
        </div>

        {booking.status === "completed" && !booking.rating && (
          <div className="mt-4 pt-4 border-t">
            <Button size="sm" variant="outline" className="w-full bg-transparent">
              Rate This Trip
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  )

  return (
    <div className="min-h-screen bg-background">
      {/* Navigation */}
      <nav className="border-b bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/60 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <Car className="h-8 w-8 text-primary mr-2" />
              <span className="font-serif font-bold text-xl text-foreground">Wardha Cabs</span>
            </div>
            <div className="flex items-center gap-4">
              <Button variant="ghost" asChild>
                <Link href="/" className="flex items-center gap-2">
                  <Home className="h-4 w-4" />
                  Home
                </Link>
              </Button>
              <Button variant="ghost" size="sm">
                <Settings className="h-4 w-4" />
              </Button>
              <Button variant="ghost" size="sm">
                <LogOut className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between mb-8">
          <div className="flex items-center gap-4 mb-4 lg:mb-0">
            <Avatar className="h-16 w-16">
              <AvatarImage src="/placeholder.svg" />
              <AvatarFallback className="bg-primary/10 text-primary font-semibold text-lg">JD</AvatarFallback>
            </Avatar>
            <div>
              <h1 className="font-serif font-bold text-2xl lg:text-3xl text-foreground">Welcome back, John!</h1>
              <p className="text-muted-foreground">Manage your bookings and track your trips</p>
            </div>
          </div>
          <Button asChild size="lg">
            <Link href="/booking" className="flex items-center gap-2">
              <Plus className="h-4 w-4" />
              New Booking
            </Link>
          </Button>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-4">
                <div className="p-3 bg-primary/10 rounded-full">
                  <Car className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <p className="text-2xl font-bold">12</p>
                  <p className="text-sm text-muted-foreground">Total Trips</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-4">
                <div className="p-3 bg-green-100 rounded-full">
                  <Navigation className="h-6 w-6 text-green-600" />
                </div>
                <div>
                  <p className="text-2xl font-bold">2</p>
                  <p className="text-sm text-muted-foreground">Active Bookings</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-4">
                <div className="p-3 bg-blue-100 rounded-full">
                  <MapPin className="h-6 w-6 text-blue-600" />
                </div>
                <div>
                  <p className="text-2xl font-bold">8,420</p>
                  <p className="text-sm text-muted-foreground">Total Distance (km)</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-4">
                <div className="p-3 bg-yellow-100 rounded-full">
                  <Star className="h-6 w-6 text-yellow-600" />
                </div>
                <div>
                  <p className="text-2xl font-bold">4.8</p>
                  <p className="text-sm text-muted-foreground">Average Rating</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Bookings Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-2 lg:w-auto lg:grid-cols-2">
            <TabsTrigger value="current" className="flex items-center gap-2">
              <Navigation className="h-4 w-4" />
              Current Bookings ({currentBookings.length})
            </TabsTrigger>
            <TabsTrigger value="history" className="flex items-center gap-2">
              <History className="h-4 w-4" />
              Booking History ({pastBookings.length})
            </TabsTrigger>
          </TabsList>

          <TabsContent value="current" className="space-y-6">
            {currentBookings.length > 0 ? (
              <div className="grid gap-6">
                {currentBookings.map((booking) => (
                  <BookingCard key={booking.id} booking={booking} />
                ))}
              </div>
            ) : (
              <Card>
                <CardContent className="p-12 text-center">
                  <Car className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                  <h3 className="font-semibold text-lg mb-2">No Current Bookings</h3>
                  <p className="text-muted-foreground mb-4">You don't have any active bookings at the moment.</p>
                  <Button asChild>
                    <Link href="/booking">Book Your Next Ride</Link>
                  </Button>
                </CardContent>
              </Card>
            )}
          </TabsContent>

          <TabsContent value="history" className="space-y-6">
            {pastBookings.length > 0 ? (
              <div className="grid gap-6">
                {pastBookings.map((booking) => (
                  <BookingCard key={booking.id} booking={booking} />
                ))}
              </div>
            ) : (
              <Card>
                <CardContent className="p-12 text-center">
                  <History className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                  <h3 className="font-semibold text-lg mb-2">No Booking History</h3>
                  <p className="text-muted-foreground mb-4">Your completed trips will appear here.</p>
                  <Button asChild>
                    <Link href="/booking">Book Your First Ride</Link>
                  </Button>
                </CardContent>
              </Card>
            )}
          </TabsContent>
        </Tabs>

        {/* Quick Actions */}
        <Card className="mt-8">
          <CardHeader>
            <CardTitle className="font-serif">Quick Actions</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
              <Button variant="outline" asChild className="h-auto p-4 flex-col gap-2 bg-transparent">
                <Link href="/booking">
                  <Plus className="h-6 w-6" />
                  <span>New Booking</span>
                </Link>
              </Button>
              <Button variant="outline" className="h-auto p-4 flex-col gap-2 bg-transparent">
                <History className="h-6 w-6" />
                <span>Trip History</span>
              </Button>
              <Button variant="outline" className="h-auto p-4 flex-col gap-2 bg-transparent">
                <CreditCard className="h-6 w-6" />
                <span>Payment Methods</span>
              </Button>
              <Button variant="outline" className="h-auto p-4 flex-col gap-2 bg-transparent">
                <Settings className="h-6 w-6" />
                <span>Account Settings</span>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
