export interface Destination {
  id: string;
  name: string;
  rating: number;
  description: string;
  image: string;
  lat: number;   // Latitude on Earth (-90 to 90)
  lng: number;   // Longitude on Earth (-180 to 180)
  category: string;
  price: string;
  activity: string;
  tags: string[];
}

export interface SearchState {
  destination: string;
  date: string;
  travelers: number;
}

export interface Category {
  id: string;
  label: string;
  icon: string;
}
