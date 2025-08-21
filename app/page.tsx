
"use client";

import { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Car, Star, MapPin, Clock, Shield, Users } from "lucide-react";
import { VehicleCard } from "@/components/VehicleCard";
import { vehicles } from "@/constants/vehicals";

export default function HomePage() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <main className="min-h-screen bg-background">
      {/* Navigation */}
      <nav className="border-b bg-white/95 backdrop-blur shadow-2xl supports-[backdrop-filter]:bg-white/60 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <Car className="h-8 w-8 text-primary mr-2" />
              <span className="font-serif font-bold text-xl text-foreground">Wardha Cabs</span>
            </div>
            <div className="hidden md:flex items-center space-x-8 font-semibold">
              <Link href="/" className="text-foreground hover:text-primary transition-colors">
                Home
              </Link>
              <Link href="/booking" className="text-foreground hover:text-primary transition-colors">
                Book Cab
              </Link>
              <Link href="/contact" className="text-foreground hover:text-primary transition-colors">
                Contact
              </Link>
              <Link href="/about" className="text-foreground hover:text-primary transition-colors">
              About Us
              </Link>
              <Link href="/admin" className="text-muted-foreground hover:text-primary transition-colors">
                Admin Login
              </Link>
            </div>
            <div className="md:hidden">
              <Sheet open={isOpen} onOpenChange={setIsOpen}>
                <SheetTrigger asChild>
                  <Button variant="ghost" size="sm" aria-label="Open mobile menu">
                    <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                    </svg>
                  </Button>
                </SheetTrigger>
                <SheetContent side="right">
                  <nav className="flex flex-col space-y-4">
                    <Link href="/" className="text-foreground hover:text-primary" onClick={() => setIsOpen(false)}>
                      Home
                    </Link>
                    <Link href="/booking" className="text-foreground hover:text-primary" onClick={() => setIsOpen(false)}>
                      Book Cab
                    </Link>
                    <Link href="/contact" className="text-foreground hover:text-primary" onClick={() => setIsOpen(false)}>
                      Contact
                    </Link>
                    <Link href="/admin" className="text-foreground hover:text-primary" onClick={() => setIsOpen(false)}>
                      Admin Login
                    </Link>
                  </nav>
                </SheetContent>
              </Sheet>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-primary/5 to-secondary/5 py-20 lg:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-10">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8">
              <div className="space-y-4">
                <Badge variant="secondary" className="w-fit">
                  Trusted by 1000+ Customers
                </Badge>
                <h1 className="font-serif font-black text-4xl lg:text-6xl text-foreground leading-tight">
                  Reliable Cabs from
                  <span className="text-primary"> Wardha</span> to Anywhere
                </h1>
                <p className="text-lg text-muted-foreground max-w-lg">
                  Experience premium transportation services with our professional fleet. Safe, comfortable, and always on time.
                </p>
              </div>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button asChild size="lg" className="text-lg px-8">
                  <Link href="/booking">Book Your Cab Now</Link>
                </Button>
                <Button asChild variant="outline" size="lg" className="text-lg px-8 bg-transparent">
                  <Link href="/fleet">View Our Fleet</Link>
                </Button>
              </div>
              <div className="flex items-center gap-8 pt-4">
                <div className="flex items-center gap-2">
                  <Shield className="h-5 w-5 text-primary" />
                  <span className="text-sm text-muted-foreground">Fully Insured</span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="h-5 w-5 text-primary" />
                  <span className="text-sm text-muted-foreground">24/7 Service</span>
                </div>
              </div>
            </div>
            <div className="relative">
              <Image
                src="/modern-suv-side.png"
                alt="Professional cab service - SUV"
                width={600}
                height={400}
                className="rounded-2xl shadow-2xl"
                priority
              />
            </div>
          </div>
        </div>
      </section>

      {/* Vehicle Types Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center space-y-4 mb-16">
            <h2 className="font-serif font-bold text-3xl lg:text-4xl text-foreground">Choose Your Perfect Ride</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              From comfortable sedans to spacious SUVs, we have the right vehicle for every journey
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {vehicles.map((vehicle) => (
              <VehicleCard key={vehicle.type} {...vehicle} isPopular={vehicle.type === "SUV"} />
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-muted/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center space-y-4 mb-16">
            <h2 className="font-serif font-bold text-3xl lg:text-4xl text-foreground">Why Choose Wardha Cabs?</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              We're committed to providing the best transportation experience in the region
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center space-y-4">
              <div className="mx-auto p-4 bg-primary/10 rounded-full w-fit">
                <Shield className="h-8 w-8 text-primary" />
              </div>
              <h3 className="font-serif font-semibold text-lg">Safe & Secure</h3>
              <p className="text-muted-foreground text-sm">
                All our vehicles are regularly maintained and fully insured for your safety
              </p>
            </div>
            <div className="text-center space-y-4">
              <div className="mx-auto p-4 bg-primary/10 rounded-full w-fit">
                <Clock className="h-8 w-8 text-primary" />
              </div>
              <h3 className="font-serif font-semibold text-lg">Always On Time</h3>
              <p className="text-muted-foreground text-sm">
                Punctuality is our priority. We ensure you reach your destination on time
              </p>
            </div>
            <div className="text-center space-y-4">
              <div className="mx-auto p-4 bg-primary/10 rounded-full w-fit">
                <Users className="h-8 w-8 text-primary" />
              </div>
              <h3 className="font-serif font-semibold text-lg">Professional Drivers</h3>
              <p className="text-muted-foreground text-sm">
                Experienced and courteous drivers who know the routes like the back of their hand
              </p>
            </div>
            <div className="text-center space-y-4">
              <div className="mx-auto p-4 bg-primary/10 rounded-full w-fit">
                <MapPin className="h-8 w-8 text-primary" />
              </div>
              <h3 className="font-serif font-semibold text-lg">Wide Coverage</h3>
              <p className="text-muted-foreground text-sm">
                From Wardha to anywhere in Maharashtra and beyond. No destination too far
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center space-y-4 mb-16">
            <h2 className="font-serif font-bold text-3xl lg:text-4xl text-foreground">What Our Customers Say</h2>
            <p className="text-lg text-muted-foreground">
              Don't just take our word for it - hear from our satisfied customers
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            <Card className="border-0 shadow-lg">
              <CardContent className="p-6 space-y-4">
                <div className="flex items-center gap-1">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>
                <p className="text-muted-foreground">
                  "Excellent service! The driver was punctual and the car was clean and comfortable. Will definitely book again for my next trip to Mumbai."
                </p>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
                    <span className="font-semibold text-primary">RK</span>
                  </div>
                  <div>
                    <p className="font-semibold">Rajesh Kumar</p>
                    <p className="text-sm text-muted-foreground">Business Executive</p>
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card className="border-0 shadow-lg">
              <CardContent className="p-6 space-y-4">
                <div className="flex items-center gap-1">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>
                <p className="text-muted-foreground">
                  "Amazing experience! The SUV was perfect for our family trip to Nagpur. Professional driver and very reasonable rates."
                </p>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
                    <span className="font-semibold text-primary">PS</span>
                  </div>
                  <div>
                    <p className="font-semibold">Priya Sharma</p>
                    <p className="text-sm text-muted-foreground">Teacher</p>
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card className="border-0 shadow-lg">
              <CardContent className="p-6 space-y-4">
                <div className="flex items-center gap-1">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>
                <p className="text-muted-foreground">
                  "Reliable and trustworthy service. I've been using Wardha Cabs for my business trips for over a year now. Highly recommended!"
                </p>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
                    <span className="font-semibold text-primary">AM</span>
                  </div>
                  <div>
                    <p className="font-semibold">Amit Mehta</p>
                    <p className="text-sm text-muted-foreground">Sales Manager</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-primary to-secondary">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="space-y-6">
            <h2 className="font-serif font-bold text-3xl lg:text-4xl text-white">Ready to Book Your Next Ride?</h2>
            <p className="text-lg text-white/90 max-w-2xl mx-auto">
              Experience the convenience of professional transportation services. Book now and travel with confidence.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild size="lg" variant="secondary" className="text-lg px-8">
                <Link href="/booking">Book Now</Link>
              </Button>
              <Button
                asChild
                size="lg"
                variant="outline"
                className="text-lg px-8 border-white text-white hover:bg-white hover:text-primary bg-transparent"
              >
                <Link href="/contact">Contact Us</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-foreground text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-8">
            <div className="space-y-4">
              <div className="flex items-center">
                <Car className="h-8 w-8 text-primary mr-2" />
                <span className="font-serif font-bold text-xl">Wardha Cabs</span>
              </div>
              <p className="text-gray-300 text-sm">
                Your trusted partner for reliable transportation services from Wardha to anywhere.
              </p>
            </div>
            <div className="space-y-4">
              <h3 className="font-serif font-semibold text-lg">Services</h3>
              <ul className="space-y-2 text-sm text-gray-300">
                <li>Cab Booking</li>
                <li>Car Rental</li>
                <li>Airport Transfers</li>
                <li>Outstation Trips</li>
              </ul>
            </div>
            <div className="space-y-4">
              <h3 className="font-serif font-semibold text-lg">Quick Links</h3>
              <ul className="space-y-2 text-sm text-gray-300">
                <li>
                  <Link href="/" className="hover:text-primary transition-colors">
                    Home
                  </Link>
                </li>
                <li>
                  <Link href="/booking" className="hover:text-primary transition-colors">
                    Book Cab
                  </Link>
                </li>
                <li>
                  <Link href="/contact" className="hover:text-primary transition-colors">
                    Contact
                  </Link>
                </li>
                <li>
                  <Link href="/admin" className="hover:text-primary transition-colors">
                    Admin
                  </Link>
                </li>
              </ul>
            </div>
            <div className="space-y-4">
              <h3 className="font-serif font-semibold text-lg">Contact Info</h3>
              <div className="space-y-2 text-sm text-gray-300">
                <p>📞 +91 9284634884</p>
                <p>✉️ info@wardhacabs.com</p>
                <p>📍 Wardha, Maharashtra</p>
              </div>
            </div>
          </div>
          <div className="border-t border-gray-700 mt-8 pt-8 text-center text-sm text-gray-300">
            <p>&copy; 2025 Wardha Cabs. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </main>
  );
}
