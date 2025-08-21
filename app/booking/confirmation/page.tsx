"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { CheckCircle, Clock, MapPin, Calendar, Users, Car, Phone, Mail, Home, Download, Share2 } from "lucide-react"
import Link from "next/link"

interface BookingDetails {
  bookingId: string
  status: "pending" | "confirmed" | "in-progress" | "completed"
  pickup: string
  dropLocation: string
  date: string
  time: string
  passengers: string
  vehicleType: string
  vehicleModel: string
  driverName: string
  driverPhone: string
  estimatedDistance: number
  totalAmount: number
  bookingTime: string
}

export default function BookingConfirmationPage() {
  const [bookingDetails, setBookingDetails] = useState<BookingDetails | null>(null);
  const [isLoading, setIsLoading] = useState(true);

useEffect(() => {
  const urlParams = new URLSearchParams(window.location.search);
  const bookingId = urlParams.get('bookingId') || localStorage.getItem('bookingId');

  if (bookingId) {
    fetch(`/api/bookings/${bookingId}`)
      .then(res => {
        if (!res.ok) throw new Error('Booking not found');
        return res.json();
      })
      .then(data => {
        setBookingDetails(data);
        setIsLoading(false);
      })
      .catch(error => {
        console.error('Error fetching booking:', error);
        setIsLoading(false);
      });
  } else {
    setIsLoading(false);
  }
}, []);

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
      default:
        return "bg-gray-100 text-gray-800 border-gray-200"
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "confirmed":
        return <CheckCircle className="h-4 w-4" />
      case "pending":
        return <Clock className="h-4 w-4" />
      default:
        return <CheckCircle className="h-4 w-4" />
    }
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center space-y-4">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
          <p className="text-muted-foreground">Processing your booking...</p>
        </div>
      </div>
    )
  }

  if (!bookingDetails) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center space-y-4">
          <p className="text-muted-foreground">Booking not found</p>
          <Button asChild>
            <Link href="/">Go Home</Link>
          </Button>
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
                <Home className="h-4 w-4" />
                Back to Home
              </Link>
            </Button>
          </div>
        </div>
      </nav>

      {/* Confirmation Content */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Success Header */}
        <div className="text-center mb-8">
          <div className="mx-auto w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mb-6">
            <CheckCircle className="h-10 w-10 text-green-600" />
          </div>
          <h1 className="font-serif font-bold text-3xl lg:text-4xl text-foreground mb-2">Booking Confirmed!</h1>
          <p className="text-lg text-muted-foreground mb-4">
            Thank you for choosing Wardha Cabs. Your ride has been successfully booked.
          </p>
          <div className="flex items-center justify-center gap-2">
            <span className="text-sm text-muted-foreground">Booking ID:</span>
            <Badge variant="outline" className="font-mono text-base px-3 py-1">
              {bookingDetails.bookingId}
            </Badge>
          </div>
        </div>

        {/* Booking Details Card */}
        <Card className="shadow-lg mb-6">
          <CardHeader className="pb-4">
            <div className="flex items-center justify-between">
              <CardTitle className="font-serif text-xl">Booking Details</CardTitle>
              <Badge className={`${getStatusColor(bookingDetails.status)} flex items-center gap-1`}>
                {getStatusIcon(bookingDetails.status)}
                {bookingDetails.status.charAt(0).toUpperCase() + bookingDetails.status.slice(1)}
              </Badge>
            </div>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Trip Information */}
            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <h3 className="font-semibold text-lg mb-3">Trip Information</h3>

                <div className="flex items-start gap-3">
                  <MapPin className="h-5 w-5 text-primary mt-0.5" />
                  <div>
                    <p className="font-medium">Route</p>
                    <p className="text-sm text-muted-foreground">
                      {bookingDetails.pickup} → {bookingDetails.dropLocation}
                    </p>
                    <p className="text-xs text-muted-foreground mt-1">
                      Distance: {bookingDetails.estimatedDistance} km
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Calendar className="h-5 w-5 text-primary mt-0.5" />
                  <div>
                    <p className="font-medium">Date & Time</p>
                    <p className="text-sm text-muted-foreground">
                      {new Date(bookingDetails.date).toLocaleDateString("en-IN", {
                        weekday: "long",
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                      })}
                    </p>
                    <p className="text-sm text-muted-foreground">{bookingDetails.time}</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Users className="h-5 w-5 text-primary mt-0.5" />
                  <div>
                    <p className="font-medium">Passengers</p>
                    <p className="text-sm text-muted-foreground">{bookingDetails.passengers} passengers</p>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <h3 className="font-semibold text-lg mb-3">Vehicle & Driver</h3>

                <div className="flex items-start gap-3">
                  <Car className="h-5 w-5 text-primary mt-0.5" />
                  <div>
                    <p className="font-medium">Vehicle</p>
                    <p className="text-sm text-muted-foreground">{bookingDetails.vehicleType}</p>
                    <p className="text-xs text-muted-foreground">{bookingDetails.vehicleModel}</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Users className="h-5 w-5 text-primary mt-0.5" />
                  <div>
                    <p className="font-medium">Driver</p>
                    <p className="text-sm text-muted-foreground">{bookingDetails.driverName}</p>
                    <div className="flex items-center gap-2 mt-1">
                      <Phone className="h-3 w-3 text-muted-foreground" />
                      <a href={`tel:${bookingDetails.driverPhone}`} className="text-xs text-primary hover:underline">
                        {bookingDetails.driverPhone}
                      </a>
                    </div>
                  </div>
                </div>

                <div className="bg-muted/30 rounded-lg p-4">
                  <h4 className="font-medium mb-2">Payment Summary</h4>
                  <div className="space-y-1 text-sm">
                    <div className="flex justify-between">
                      <span>Base fare ({bookingDetails.estimatedDistance} km):</span>
                      <span>₹{bookingDetails.totalAmount}</span>
                    </div>
                    <Separator className="my-2" />
                    <div className="flex justify-between font-semibold">
                      <span>Total Amount:</span>
                      <span className="text-primary">₹{bookingDetails.totalAmount}</span>
                    </div>
                    <p className="text-xs text-muted-foreground mt-2">Payment will be collected by the driver</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Important Information */}
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
              <h4 className="font-medium text-blue-900 mb-2">Important Information</h4>
              <ul className="text-sm text-blue-800 space-y-1">
                <li>• Your driver will contact you 30 minutes before pickup time</li>
                <li>• Please be ready 5 minutes before the scheduled time</li>
                <li>• Carry a valid ID for verification</li>
                <li>• For any changes or cancellations, contact us at least 2 hours in advance</li>
              </ul>
            </div>
          </CardContent>
        </Card>

        {/* Action Buttons */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <Button variant="outline" className="flex items-center gap-2 bg-transparent">
            <Download className="h-4 w-4" />
            Download Receipt
          </Button>
          <Button variant="outline" className="flex items-center gap-2 bg-transparent">
            <Share2 className="h-4 w-4" />
            Share Details
          </Button>
          <Button asChild variant="outline" className="bg-transparent">
            <Link href="/dashboard" className="flex items-center gap-2">
              <Users className="h-4 w-4" />
              View Dashboard
            </Link>
          </Button>
          <Button asChild>
            <Link href="/" className="flex items-center gap-2">
              <Home className="h-4 w-4" />
              Back to Home
            </Link>
          </Button>
        </div>

        {/* Contact Support */}
        <Card className="bg-muted/30">
          <CardContent className="p-6">
            <div className="text-center space-y-4">
              <h3 className="font-serif font-semibold text-lg">Need Help?</h3>
              <p className="text-muted-foreground">Our customer support team is available 24/7 to assist you</p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button variant="outline" asChild className="bg-transparent">
                  <a href="tel:+919876543210" className="flex items-center gap-2">
                    <Phone className="h-4 w-4" />
                    Call Support
                  </a>
                </Button>
                <Button variant="outline" asChild className="bg-transparent">
                  <a href="mailto:support@wardhacabs.com" className="flex items-center gap-2">
                    <Mail className="h-4 w-4" />
                    Email Support
                  </a>
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
