"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Calendar, Clock, MapPin, Car, Users, Luggage, ArrowLeft, CheckCircle } from "lucide-react"
import Link from "next/link"

interface BookingData {
  pickup: string
  dropLocation: string
  date: string
  time: string
  vehicleType: string
  passengers: string
}

interface Vehicle {
  id: string
  type: string
  model: string
  capacity: string
  luggage: string
  price: string
  available: boolean
  image: string
}

const availableVehicles: Vehicle[] = [
  {
    id: "sedan-1",
    type: "Sedan",
    model: "Honda City / Maruti Ciaz",
    capacity: "4 Passengers",
    luggage: "2 Large Bags",
    price: "₹12",
    available: true,
    image: "/modern-sedan-side.png",
  },
  {
    id: "suv-1",
    type: "SUV",
    model: "Mahindra Scorpio / Tata Safari",
    capacity: "6-7 Passengers",
    luggage: "4 Large Bags",
    price: "₹18",
    available: true,
    image: "/modern-suv-side.png",
  },
  {
    id: "luxury-1",
    type: "Luxury",
    model: "Toyota Camry / BMW 3 Series",
    capacity: "4 Passengers",
    luggage: "3 Large Bags",
    price: "₹25",
    available: false,
    image: "/placeholder-bugia.png",
  },
]

export default function BookingPage() {
  const [bookingData, setBookingData] = useState<BookingData>({
    pickup: "Wardha",
    dropLocation: "",
    date: "",
    time: "",
    vehicleType: "",
    passengers: "",
  })

  const [selectedVehicle, setSelectedVehicle] = useState<Vehicle | null>(null)
  const [showSummary, setShowSummary] = useState(false)
  const [estimatedDistance, setEstimatedDistance] = useState(0)
  const [isLoading, setIsLoading] = useState(false)

  const handleInputChange = (field: keyof BookingData, value: string) => {
    setBookingData((prev) => ({ ...prev, [field]: value }))

    // Simulate distance calculation when drop location changes
    if (field === "dropLocation" && value.length > 3) {
      // Mock distance calculation based on common destinations
      const distances: { [key: string]: number } = {
        mumbai: 720,
        pune: 520,
        nagpur: 78,
        nashik: 380,
        aurangabad: 280,
        solapur: 350,
      }

      const location = value.toLowerCase()
      const distance = Object.keys(distances).find((key) => location.includes(key))
      setEstimatedDistance(distance ? distances[distance] : Math.floor(Math.random() * 500) + 100)
    }
  }

  const handleVehicleSelect = (vehicle: Vehicle) => {
    if (!vehicle.available) return
    setSelectedVehicle(vehicle)
    setBookingData((prev) => ({ ...prev, vehicleType: vehicle.type }))
  }

 const handleBookingSubmit = async () => {
  setIsLoading(true);
  try {
    const response = await fetch('/api/bookings', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        customerName: 'User Name', // Replace with actual user data
        customerPhone: '+91 98765 43210', // Replace with actual user data
        pickup: bookingData.pickup,
        dropLocation: bookingData.dropLocation,
        date: bookingData.date,
        time: bookingData.time,
        vehicleType: selectedVehicle?.type,
        totalAmount: calculateTotalPrice(),
        distance: estimatedDistance,
      }),
    });

    const data = await response.json();
    console.log('Booking response:', data);

    if (!response.ok) {
      throw new Error(data.error || 'Booking failed');
    }

    // Store booking ID for confirmation page
    localStorage.setItem('bookingId', data.bookingId);

    // Redirect to confirmation page with booking ID
    window.location.href = `/booking/confirmation?bookingId=${data.bookingId}`;
  } catch (err: any) {
    console.error('Booking error:', err);
    // Show error toast or alert
  } finally {
    setIsLoading(false);
  }
};

  const calculateTotalPrice = () => {
    if (!selectedVehicle || !estimatedDistance) return 0
    const basePrice = Number.parseInt(selectedVehicle.price.replace("₹", ""))
    return basePrice * estimatedDistance
  }

  const isFormValid = () => {
    return bookingData.dropLocation && bookingData.date && bookingData.time && bookingData.passengers && selectedVehicle
  }

  if (showSummary) {
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
              <Button variant="ghost" asChild>
                <Link href="/" className="flex items-center gap-2">
                  <ArrowLeft className="h-4 w-4" />
                  Back to Home
                </Link>
              </Button>
            </div>
          </div>
        </nav>

        {/* Booking Summary */}
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="text-center mb-8">
            <div className="mx-auto w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mb-4">
              <CheckCircle className="h-8 w-8 text-primary" />
            </div>
            <h1 className="font-serif font-bold text-3xl text-foreground mb-2">Booking Summary</h1>
            <p className="text-muted-foreground">Please review your booking details before confirmation</p>
          </div>

          <Card className="shadow-lg">
            <CardHeader>
              <CardTitle className="font-serif text-xl">Trip Details</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <MapPin className="h-5 w-5 text-primary" />
                    <div>
                      <p className="font-medium">From: {bookingData.pickup}</p>
                      <p className="font-medium">To: {bookingData.dropLocation}</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <Calendar className="h-5 w-5 text-primary" />
                    <div>
                      <p className="font-medium">Date: {bookingData.date}</p>
                      <p className="font-medium">Time: {bookingData.time}</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <Users className="h-5 w-5 text-primary" />
                    <p className="font-medium">Passengers: {bookingData.passengers}</p>
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="border rounded-lg p-4">
                    <h3 className="font-semibold mb-2">Selected Vehicle</h3>
                    <div className="flex items-center gap-3">
                      <img
                        src={selectedVehicle?.image || "/placeholder.svg"}
                        alt={selectedVehicle?.type}
                        className="w-16 h-12 object-cover rounded"
                      />
                      <div>
                        <p className="font-medium">{selectedVehicle?.type}</p>
                        <p className="text-sm text-muted-foreground">{selectedVehicle?.model}</p>
                      </div>
                    </div>
                  </div>

                  <div className="bg-muted/30 rounded-lg p-4">
                    <h3 className="font-semibold mb-2">Pricing Details</h3>
                    <div className="space-y-1 text-sm">
                      <div className="flex justify-between">
                        <span>Distance:</span>
                        <span>{estimatedDistance} km</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Rate per km:</span>
                        <span>{selectedVehicle?.price}/km</span>
                      </div>
                      <Separator className="my-2" />
                      <div className="flex justify-between font-semibold text-base">
                        <span>Total Amount:</span>
                        <span className="text-primary">₹{calculateTotalPrice()}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-4 pt-6">
                <Button variant="outline" className="flex-1 bg-transparent" onClick={() => setShowSummary(false)}>
                  Edit Booking
                </Button>
                <Button asChild className="flex-1">
                  <Link href="/booking/confirmation">Confirm Booking</Link>
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    )
  }

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
            <Button variant="ghost" asChild>
              <Link href="/" className="flex items-center gap-2">
                <ArrowLeft className="h-4 w-4" />
                Back to Home
              </Link>
            </Button>
          </div>
        </div>
      </nav>

      {/* Booking Form */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-8">
          <h1 className="font-serif font-bold text-3xl lg:text-4xl text-foreground mb-2">Book Your Cab</h1>
          <p className="text-lg text-muted-foreground">Fill in the details below to book your ride</p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Booking Form */}
          <Card className="shadow-lg">
            <CardHeader>
              <CardTitle className="font-serif text-xl">Trip Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="pickup">Pickup Location</Label>
                  <div className="relative">
                    <Input id="pickup" value={bookingData.pickup} disabled className="bg-muted" />
                    <MapPin className="absolute right-3 top-3 h-4 w-4 text-muted-foreground" />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="drop">Drop Location *</Label>
                  <div className="relative">
                    <Input
                      id="drop"
                      placeholder="Enter destination"
                      value={bookingData.dropLocation}
                      onChange={(e) => handleInputChange("dropLocation", e.target.value)}
                    />
                    <MapPin className="absolute right-3 top-3 h-4 w-4 text-muted-foreground" />
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="date">Travel Date *</Label>
                  <div className="relative">
                    <Input
                      id="date"
                      type="date"
                      value={bookingData.date}
                      onChange={(e) => handleInputChange("date", e.target.value)}
                      min={new Date().toISOString().split("T")[0]}
                    />
                    <Calendar className="absolute right-3 top-3 h-4 w-4 text-muted-foreground" />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="time">Travel Time *</Label>
                  <div className="relative">
                    <Input
                      id="time"
                      type="time"
                      value={bookingData.time}
                      onChange={(e) => handleInputChange("time", e.target.value)}
                    />
                    <Clock className="absolute right-3 top-3 h-4 w-4 text-muted-foreground" />
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="passengers">Number of Passengers *</Label>
                <Select
                  value={bookingData.passengers}
                  onValueChange={(value) => handleInputChange("passengers", value)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select number of passengers" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="1">1 Passenger</SelectItem>
                    <SelectItem value="2">2 Passengers</SelectItem>
                    <SelectItem value="3">3 Passengers</SelectItem>
                    <SelectItem value="4">4 Passengers</SelectItem>
                    <SelectItem value="5">5 Passengers</SelectItem>
                    <SelectItem value="6">6 Passengers</SelectItem>
                    <SelectItem value="7">7 Passengers</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {estimatedDistance > 0 && (
                <div className="bg-primary/5 border border-primary/20 rounded-lg p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <MapPin className="h-4 w-4 text-primary" />
                    <span className="font-medium text-primary">Estimated Distance</span>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Approximate distance: <span className="font-semibold">{estimatedDistance} km</span>
                  </p>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Vehicle Selection */}
          <Card className="shadow-lg">
            <CardHeader>
              <CardTitle className="font-serif text-xl">Select Vehicle</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {availableVehicles.map((vehicle) => (
                <div
                  key={vehicle.id}
                  className={`border rounded-lg p-4 cursor-pointer transition-all duration-200 ${
                    selectedVehicle?.id === vehicle.id
                      ? "border-primary bg-primary/5"
                      : vehicle.available
                        ? "border-border hover:border-primary/50"
                        : "border-border bg-muted/30 cursor-not-allowed"
                  }`}
                  onClick={() => handleVehicleSelect(vehicle)}
                >
                  <div className="flex items-center gap-4">
                    <img
                      src={vehicle.image || "/placeholder.svg"}
                      alt={vehicle.type}
                      className={`w-20 h-16 object-cover rounded ${!vehicle.available ? "grayscale" : ""}`}
                    />
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <h3 className="font-semibold">{vehicle.type}</h3>
                        {!vehicle.available && (
                          <Badge variant="destructive" className="text-xs">
                            Not Available
                          </Badge>
                        )}
                        {selectedVehicle?.id === vehicle.id && <Badge className="text-xs">Selected</Badge>}
                      </div>
                      <p className="text-sm text-muted-foreground mb-2">{vehicle.model}</p>
                      <div className="flex items-center gap-4 text-xs text-muted-foreground">
                        <div className="flex items-center gap-1">
                          <Users className="h-3 w-3" />
                          {vehicle.capacity}
                        </div>
                        <div className="flex items-center gap-1">
                          <Luggage className="h-3 w-3" />
                          {vehicle.luggage}
                        </div>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="font-bold text-primary">{vehicle.price}/km</p>
                      {estimatedDistance > 0 && vehicle.available && (
                        <p className="text-sm text-muted-foreground">
                          ≈ ₹{Number.parseInt(vehicle.price.replace("₹", "")) * estimatedDistance}
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              ))}

              <div className="pt-4">
                <Button
                  className="w-full"
                  size="lg"
                  disabled={!isFormValid() || isLoading}
                  onClick={handleBookingSubmit}
                >
                  {isLoading ? "Processing..." : "Review Booking"}
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
