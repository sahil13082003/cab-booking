
import { Metadata } from "next";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Car, Shield, Clock, Users } from "lucide-react";
import Image from "next/image";

// SEO Metadata
export async function generateMetadata(): Promise<Metadata> {
  return {
    title: "About Us - Wardha Cabs",
    description: "Learn about Wardha Cabs, your trusted cab service in Maharashtra. Discover our mission, values, and commitment to reliable transportation.",
    keywords: ["about Wardha Cabs", "cab service Maharashtra", "reliable taxi"],
    openGraph: {
      title: "About Wardha Cabs",
      description: "Providing safe, reliable, and comfortable cab services from Wardha to anywhere.",
      images: ["/modern-suv-side.png"],
    },
  };
}

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b bg-white/95 backdrop-blur shadow-2xl supports-[backdrop-filter]:bg-white/60 sticky top-0 z-50">
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
              <Link href="/admin" className="text-muted-foreground hover:text-primary transition-colors">
                Admin Login
              </Link>
            </div>
          </div>
        </div>
      </header>

      {/* About Section */}
      <section className="py-20 bg-muted/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center space-y-4 mb-16">
            <h1 className="font-serif font-bold text-3xl lg:text-4xl text-foreground">About Wardha Cabs</h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Your trusted partner for safe, reliable, and comfortable transportation in Maharashtra and beyond.
            </p>
          </div>
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <h2 className="font-serif font-semibold text-2xl text-foreground">Our Mission</h2>
              <p className="text-muted-foreground">
                At Wardha Cabs, we aim to provide seamless and hassle-free transportation services, ensuring every journey is safe, comfortable, and on time. Based in Wardha, Maharashtra, we cater to both local and outstation travel needs with a focus on customer satisfaction.
              </p>
              <Button asChild size="lg" className="text-lg px-8">
                <Link href="/booking">Book Your Ride Now</Link>
              </Button>
            </div>
            <div className="relative">
              <Image
                src="/modern-suv-side.png"
                alt="Wardha Cabs fleet"
                width={600}
                height={400}
                className="rounded-2xl shadow-2xl"
                priority
              />
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center space-y-4 mb-16">
            <h2 className="font-serif font-bold text-3xl lg:text-4xl text-foreground">Our Core Values</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              We’re committed to excellence in every aspect of our service.
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            <Card className="shadow-lg">
              <CardHeader>
                <div className="mx-auto p-4 bg-primary/10 rounded-full w-fit">
                  <Shield className="h-8 w-8 text-primary" />
                </div>
                <CardTitle className="font-serif text-xl text-center">Safety First</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground text-center">
                  All vehicles are regularly maintained and insured for your peace of mind.
                </p>
              </CardContent>
            </Card>
            <Card className="shadow-lg">
              <CardHeader>
                <div className="mx-auto p-4 bg-primary/10 rounded-full w-fit">
                  <Clock className="h-8 w-8 text-primary" />
                </div>
                <CardTitle className="font-serif text-xl text-center">Punctuality</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground text-center">
                  We ensure timely pickups and dropoffs for every journey.
                </p>
              </CardContent>
            </Card>
            <Card className="shadow-lg">
              <CardHeader>
                <div className="mx-auto p-4 bg-primary/10 rounded-full w-fit">
                  <Users className="h-8 w-8 text-primary" />
                </div>
                <CardTitle className="font-serif text-xl text-center">Customer-Centric</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground text-center">
                  Our professional drivers and support team prioritize your comfort.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
    </main>
  );
}
