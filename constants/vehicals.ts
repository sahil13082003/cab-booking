export interface Vehicle {
  type: string;
  description: string;
  image: string;
  capacity: string;
  luggage: string;
  price: string;
}

export const vehicles: Vehicle[] = [
  {
    type: "Sedan",
    description: "Perfect for city rides and airport transfers",
    image: "/modern-sedan-side.png",
    capacity: "4 Passengers",
    luggage: "2 Large Bags",
    price: "₹12/km",
  },
  {
    type: "SUV",
    description: "Spacious and comfortable for families",
    image: "/modern-suv-side.png",
    capacity: "6-7 Passengers",
    luggage: "4 Large Bags",
    price: "₹18/km",
  },
  {
    type: "Luxury",
    description: "Premium experience for special occasions",
    image: "/placeholder-bugia.png",
    capacity: "4 Passengers",
    luggage: "3 Large Bags",
    price: "₹25/km",
  },
];