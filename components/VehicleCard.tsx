import Image from "next/image";
import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Car } from "lucide-react";

interface VehicleCardProps {
  type: string;
  description: string;
  image: string;
  capacity: string;
  luggage: string;
  price: string;
  isPopular?: boolean;
}

export function VehicleCard({ type, description, image, capacity, luggage, price, isPopular }: VehicleCardProps) {
  return (
    <Card className="group hover:shadow-lg transition-all duration-300 border-2 hover:border-primary/20 relative">
      {isPopular && <Badge className="absolute -top-2 left-1/2 transform -translate-x-1/2 bg-secondary">Most Popular</Badge>}
      <CardHeader className="text-center pb-4 pt-8">
        <div className="mx-auto mb-4 p-4 bg-primary/10 rounded-full w-fit">
          <Car className="h-8 w-8 text-primary" />
        </div>
        <CardTitle className="font-serif text-xl">{type}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <Image src={image} alt={`${type} vehicle`} width={400} height={192} className="w-full h-48 object-cover rounded-lg" />
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-sm text-muted-foreground">Capacity</span>
            <span className="font-medium">{capacity}</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-sm text-muted-foreground">Luggage</span>
            <span className="font-medium">{luggage}</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-sm text-muted-foreground">Starting from</span>
            <span className="font-bold text-primary">{price}</span>
          </div>
        </div>
        <Button asChild className="w-full" variant={type === "Luxury" ? "secondary" : "outline"}>
          <Link href={`/booking?type=${type.toLowerCase()}`}>Book {type}</Link>
        </Button>
      </CardContent>
    </Card>
  );
}