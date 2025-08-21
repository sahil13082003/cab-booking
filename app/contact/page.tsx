
"use client";

import { Metadata } from "next";
import Link from "next/link";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Car, Mail, Phone, MapPin } from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";

// SEO Metadata
// export async function generateMetadata(): Promise<Metadata> {
//   return {
//     title: "Contact Us - Wardha Cabs",
//     description: "Get in touch with Wardha Cabs for inquiries, support, or feedback. We're here to help you 24/7.",
//     keywords: ["contact Wardha Cabs", "cab booking support", "Maharashtra taxi service"],
//     openGraph: {
//       title: "Contact Wardha Cabs",
//       description: "Reach out to us for all your transportation needs in Wardha and beyond.",
//       images: ["/modern-suv-side.png"],
//     },
//   };
// }

// Form schema using Zod
const formSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Invalid email address"),
  message: z.string().min(10, "Message must be at least 10 characters"),
});

export default function ContactPage() {
  const [isSubmitted, setIsSubmitted] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      message: "",
    },
  });

  const onSubmit = (data: z.infer<typeof formSchema>) => {
    console.log("Contact Form Submission:", data);
    setIsSubmitted(true);
    form.reset();
  };

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

      {/* Contact Section */}
      <section className="py-20 bg-muted/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center space-y-4 mb-16">
            <h1 className="font-serif font-bold text-3xl lg:text-4xl text-foreground">Contact Us</h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Have questions or need assistance? Reach out to us, and we’ll get back to you promptly.
            </p>
          </div>
          <div className="grid md:grid-cols-2 gap-12">
            {/* Contact Form */}
            <Card className="shadow-lg">
              <CardHeader>
                <CardTitle className="font-serif text-xl">Send Us a Message</CardTitle>
              </CardHeader>
              <CardContent>
                <Form {...form}>
                  <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                    <FormField
                      control={form.control}
                      name="name"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Name</FormLabel>
                          <FormControl>
                            <Input placeholder="Your name" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="email"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Email</FormLabel>
                          <FormControl>
                            <Input type="email" placeholder="your.email@example.com" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="message"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Message</FormLabel>
                          <FormControl>
                            <Textarea placeholder="Your message or inquiry" rows={5} {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <Button type="submit" className="w-full">
                      Submit
                    </Button>
                  </form>
                </Form>
                {isSubmitted && (
                  <p className="text-green-600 mt-4 text-center">Thank you! Your message has been sent.</p>
                )}
              </CardContent>
            </Card>

            {/* Contact Info */}
            <div className="space-y-8">
              <div>
                <h2 className="font-serif font-semibold text-2xl text-foreground">Get in Touch</h2>
                <p className="text-muted-foreground mt-2">
                  We’re available 24/7 to assist with your transportation needs.
                </p>
              </div>
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <Phone className="h-6 w-6 text-primary" />
                  <p className="text-foreground">+91 9284634884</p>
                </div>
                <div className="flex items-center gap-3">
                  <Mail className="h-6 w-6 text-primary" />
                  <p className="text-foreground">info@wardhacabs.com</p>
                </div>
                <div className="flex items-center gap-3">
                  <MapPin className="h-6 w-6 text-primary" />
                  <p className="text-foreground">Wardha, Maharashtra, India</p>
                </div>
              </div>
              {/* Placeholder for Map */}
              <div className="bg-gray-200 h-64 rounded-lg flex items-center justify-center">
                <p className="text-muted-foreground">Map Placeholder (Google Maps integration coming soon)</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
