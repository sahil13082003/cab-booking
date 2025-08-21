import { Metadata } from "next";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Car } from "lucide-react";

// SEO Metadata
export async function generateMetadata(): Promise<Metadata> {
  return {
    title: "Page Not Found - Wardha Cabs",
    description: "The page you’re looking for doesn’t exist. Return to Wardha Cabs homepage or contact us for assistance.",
    robots: "noindex",
  };
}

export default function NotFoundPage() {
  return (
    <main className="min-h-screen bg-background flex flex-col items-center justify-center px-4 sm:px-6 lg:px-8">
      <div className="text-center space-y-6">
        <Car className="h-16 w-16 text-primary mx-auto" />
        <h1 className="font-serif font-bold text-4xl lg:text-5xl text-foreground">404 - Page Not Found</h1>
        <p className="text-lg text-muted-foreground max-w-md">
          Oops! The page you’re looking for doesn’t exist or has been moved.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button asChild size="lg" className="text-lg px-8">
            <Link href="/">Back to Home</Link>
          </Button>
          <Button asChild variant="outline" size="lg" className="text-lg px-8 bg-transparent">
            <Link href="/contact">Contact Support</Link>
          </Button>
        </div>
      </div>
    </main>
  );
}
