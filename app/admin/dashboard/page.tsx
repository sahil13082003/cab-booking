"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Car, Users, MapPin, LogOut, Shield, Search, BarChart3 } from "lucide-react"
import { useRouter } from "next/navigation"

interface Booking {
  id: string
  customerName: string
  customerPhone: string
  pickup: string
  dropLocation: string
  date: string
  time: string
  vehicleType: string
  status: "pending" | "confirmed" | "in-progress" | "completed" | "cancelled"
  driverName: string
  totalAmount: number
  distance: number
}

interface Vehicle {
  id: string
  type: string
  model: string
  licensePlate: string
  status: "available" | "booked" | "maintenance"
  driverName: string
  currentLocation: string
}

const mockBookings: Booking[] = [
  {
    id: "WC12345678",
    customerName: "John Doe",
    customerPhone: "+91 98765 43210",
    pickup: "Wardha",
    dropLocation: "Mumbai Airport",
    date: "2024-12-25",
    time: "08:00",
    vehicleType: "SUV",
    status: "confirmed",
    driverName: "Rajesh Kumar",
    totalAmount: 12960,
    distance: 720,
  },
  {
    id: "WC87654321",
    customerName: "Jane Smith",
    customerPhone: "+91 98765 43211",
    pickup: "Wardha",
    dropLocation: "Nagpur",
    date: "2024-12-20",
    time: "14:30",
    vehicleType: "Sedan",
    status: "in-progress",
    driverName: "Amit Sharma",
    totalAmount: 936,
    distance: 78,
  },
  {
    id: "WC11111111",
    customerName: "Priya Patel",
    customerPhone: "+91 98765 43212",
    pickup: "Wardha",
    dropLocation: "Pune",
    date: "2024-12-15",
    time: "09:00",
    vehicleType: "SUV",
    status: "completed",
    driverName: "Pradeep Singh",
    totalAmount: 9360,
    distance: 520,
  },
  {
    id: "WC22222222",
    customerName: "Rahul Gupta",
    customerPhone: "+91 98765 43213",
    pickup: "Wardha",
    dropLocation: "Nashik",
    date: "2024-12-10",
    time: "16:00",
    vehicleType: "Sedan",
    status: "pending",
    driverName: "Vikram Patil",
    totalAmount: 4560,
    distance: 380,
  },
]

const mockVehicles: Vehicle[] = [
  {
    id: "V001",
    type: "Sedan",
    model: "Honda City",
    licensePlate: "MH-31-AB-1234",
    status: "available",
    driverName: "Rajesh Kumar",
    currentLocation: "Wardha",
  },
  {
    id: "V002",
    type: "SUV",
    model: "Mahindra Scorpio",
    licensePlate: "MH-31-CD-5678",
    status: "booked",
    driverName: "Amit Sharma",
    currentLocation: "En route to Nagpur",
  },
  {
    id: "V003",
    type: "Luxury",
    model: "Toyota Camry",
    licensePlate: "MH-31-EF-9012",
    status: "maintenance",
    driverName: "Pradeep Singh",
    currentLocation: "Service Center",
  },
  {
    id: "V004",
    type: "SUV",
    model: "Tata Safari",
    licensePlate: "MH-31-GH-3456",
    status: "available",
    driverName: "Vikram Patil",
    currentLocation: "Wardha",
  },
]

export default function AdminDashboardPage() {
  const [bookings, setBookings] = useState<Booking[]>(mockBookings)
  const [vehicles, setVehicles] = useState<Vehicle[]>(mockVehicles)
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [selectedBooking, setSelectedBooking] = useState<Booking | null>(null)
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false)
  const router = useRouter()

  useEffect(() => {
    // Check authentication
    const isAuthenticated = localStorage.getItem("adminAuth")
    if (!isAuthenticated) {
      router.push("/admin")
    }
  }, [router])

  const handleLogout = () => {
    localStorage.removeItem("adminAuth")
    router.push("/admin")
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "confirmed":
        return "bg-green-100 text-green-800 border-green-200"
      case "pending":
        return "bg-yellow-100 text-yellow-800 border-yellow-200"
      case "in-progress":
        return "bg-blue-100 text-blue-800 border-blue-200"
      case "completed":
        return "bg-primary/10 text-primary border-primary/20"
      case "cancelled":
        return "bg-red-100 text-red-800 border-red-200"
      case "available":
        return "bg-green-100 text-green-800 border-green-200"
      case "booked":
        return "bg-blue-100 text-blue-800 border-blue-200"
      case "maintenance":
        return "bg-orange-100 text-orange-800 border-orange-200"
      default:
        return "bg-gray-100 text-gray-800 border-gray-200"
    }
  }

  const updateBookingStatus = (bookingId: string, newStatus: string) => {
    setBookings((prev) =>
      prev.map((booking) => (booking.id === bookingId ? { ...booking, status: newStatus as any } : booking)),
    )
  }

  const updateVehicleStatus = (vehicleId: string, newStatus: string) => {
    setVehicles((prev) =>
      prev.map((vehicle) => (vehicle.id === vehicleId ? { ...vehicle, status: newStatus as any } : vehicle)),
    )
  }

  const filteredBookings = bookings.filter((booking) => {
    const matchesSearch =
      booking.customerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      booking.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      booking.dropLocation.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = statusFilter === "all" || booking.status === statusFilter
    return matchesSearch && matchesStatus
  })

  return (
    <div className="min-h-screen bg-background">
      {/* Navigation */}
      <nav className="border-b bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/60 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <Shield className="h-8 w-8 text-primary mr-2" />
              <span className="font-serif font-bold text-xl text-foreground">Admin Dashboard</span>
            </div>
            <div className="flex items-center gap-4">
              <span className="text-sm text-muted-foreground">Welcome, Admin</span>
              <Button variant="ghost" onClick={handleLogout} className="flex items-center gap-2">
                <LogOut className="h-4 w-4" />
                Logout
              </Button>
            </div>
          </div>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-4">
                <div className="p-3 bg-primary/10 rounded-full">
                  <Car className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <p className="text-2xl font-bold">{bookings.length}</p>
                  <p className="text-sm text-muted-foreground">Total Bookings</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-4">
                <div className="p-3 bg-green-100 rounded-full">
                  <Users className="h-6 w-6 text-green-600" />
                </div>
                <div>
                  <p className="text-2xl font-bold">{bookings.filter((b) => b.status === "in-progress").length}</p>
                  <p className="text-sm text-muted-foreground">Active Trips</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-4">
                <div className="p-3 bg-blue-100 rounded-full">
                  <Car className="h-6 w-6 text-blue-600" />
                </div>
                <div>
                  <p className="text-2xl font-bold">{vehicles.filter((v) => v.status === "available").length}</p>
                  <p className="text-sm text-muted-foreground">Available Vehicles</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-4">
                <div className="p-3 bg-yellow-100 rounded-full">
                  <BarChart3 className="h-6 w-6 text-yellow-600" />
                </div>
                <div>
                  <p className="text-2xl font-bold">
                    ₹{bookings.reduce((sum, booking) => sum + booking.totalAmount, 0).toLocaleString()}
                  </p>
                  <p className="text-sm text-muted-foreground">Total Revenue</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Main Content */}
        <Tabs defaultValue="bookings" className="space-y-6">
          <TabsList className="grid w-full grid-cols-2 lg:w-auto lg:grid-cols-2">
            <TabsTrigger value="bookings">Bookings Management</TabsTrigger>
            <TabsTrigger value="vehicles">Vehicle Management</TabsTrigger>
          </TabsList>

          <TabsContent value="bookings" className="space-y-6">
            {/* Filters */}
            <Card>
              <CardContent className="p-6">
                <div className="flex flex-col lg:flex-row gap-4">
                  <div className="flex-1">
                    <Label htmlFor="search">Search Bookings</Label>
                    <div className="relative">
                      <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                      <Input
                        id="search"
                        placeholder="Search by customer name, booking ID, or destination..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="pl-10"
                      />
                    </div>
                  </div>
                  <div className="lg:w-48">
                    <Label htmlFor="status-filter">Filter by Status</Label>
                    <Select value={statusFilter} onValueChange={setStatusFilter}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All Status</SelectItem>
                        <SelectItem value="pending">Pending</SelectItem>
                        <SelectItem value="confirmed">Confirmed</SelectItem>
                        <SelectItem value="in-progress">In Progress</SelectItem>
                        <SelectItem value="completed">Completed</SelectItem>
                        <SelectItem value="cancelled">Cancelled</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Bookings Table */}
            <Card>
              <CardHeader>
                <CardTitle className="font-serif">All Bookings ({filteredBookings.length})</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Booking ID</TableHead>
                        <TableHead>Customer</TableHead>
                        <TableHead>Route</TableHead>
                        <TableHead>Date & Time</TableHead>
                        <TableHead>Vehicle</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead>Amount</TableHead>
                        <TableHead>Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {filteredBookings.map((booking) => (
                        <TableRow key={booking.id}>
                          <TableCell className="font-mono text-sm">{booking.id}</TableCell>
                          <TableCell>
                            <div>
                              <p className="font-medium">{booking.customerName}</p>
                              <p className="text-sm text-muted-foreground">{booking.customerPhone}</p>
                            </div>
                          </TableCell>
                          <TableCell>
                            <div className="flex items-center gap-1 text-sm">
                              <span>{booking.pickup}</span>
                              <MapPin className="h-3 w-3 text-muted-foreground" />
                              <span>{booking.dropLocation}</span>
                            </div>
                            <p className="text-xs text-muted-foreground">{booking.distance} km</p>
                          </TableCell>
                          <TableCell>
                            <div className="text-sm">
                              <p>{new Date(booking.date).toLocaleDateString()}</p>
                              <p className="text-muted-foreground">{booking.time}</p>
                            </div>
                          </TableCell>
                          <TableCell>
                            <div className="text-sm">
                              <p>{booking.vehicleType}</p>
                              <p className="text-muted-foreground">{booking.driverName}</p>
                            </div>
                          </TableCell>
                          <TableCell>
                            <Badge className={getStatusColor(booking.status)}>
                              {booking.status.charAt(0).toUpperCase() + booking.status.slice(1)}
                            </Badge>
                          </TableCell>
                          <TableCell className="font-semibold">₹{booking.totalAmount}</TableCell>
                          <TableCell>
                            <div className="flex items-center gap-2">
                              <Select
                                value={booking.status}
                                onValueChange={(value) => updateBookingStatus(booking.id, value)}
                              >
                                <SelectTrigger className="w-32">
                                  <SelectValue />
                                </SelectTrigger>
                                <SelectContent>
                                  <SelectItem value="pending">Pending</SelectItem>
                                  <SelectItem value="confirmed">Confirmed</SelectItem>
                                  <SelectItem value="in-progress">In Progress</SelectItem>
                                  <SelectItem value="completed">Completed</SelectItem>
                                  <SelectItem value="cancelled">Cancelled</SelectItem>
                                </SelectContent>
                              </Select>
                            </div>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="vehicles" className="space-y-6">
            {/* Vehicles Table */}
            <Card>
              <CardHeader>
                <CardTitle className="font-serif">Vehicle Fleet ({vehicles.length})</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Vehicle ID</TableHead>
                        <TableHead>Type & Model</TableHead>
                        <TableHead>License Plate</TableHead>
                        <TableHead>Driver</TableHead>
                        <TableHead>Current Location</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead>Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {vehicles.map((vehicle) => (
                        <TableRow key={vehicle.id}>
                          <TableCell className="font-mono text-sm">{vehicle.id}</TableCell>
                          <TableCell>
                            <div>
                              <p className="font-medium">{vehicle.type}</p>
                              <p className="text-sm text-muted-foreground">{vehicle.model}</p>
                            </div>
                          </TableCell>
                          <TableCell className="font-mono">{vehicle.licensePlate}</TableCell>
                          <TableCell>{vehicle.driverName}</TableCell>
                          <TableCell className="text-sm">{vehicle.currentLocation}</TableCell>
                          <TableCell>
                            <Badge className={getStatusColor(vehicle.status)}>
                              {vehicle.status.charAt(0).toUpperCase() + vehicle.status.slice(1)}
                            </Badge>
                          </TableCell>
                          <TableCell>
                            <Select
                              value={vehicle.status}
                              onValueChange={(value) => updateVehicleStatus(vehicle.id, value)}
                            >
                              <SelectTrigger className="w-32">
                                <SelectValue />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="available">Available</SelectItem>
                                <SelectItem value="booked">Booked</SelectItem>
                                <SelectItem value="maintenance">Maintenance</SelectItem>
                              </SelectContent>
                            </Select>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
