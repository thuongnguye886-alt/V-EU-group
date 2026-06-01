import { Destination, Category } from "./types";

import imgHaLong from "./assets/images/regenerated_image_1780229086647.jpg";
import imgPhongNha from "./assets/images/regenerated_image_1780229160920.jpg";
import imgHue from "./assets/images/regenerated_image_1780229239594.jpg";
import imgHoiAn from "./assets/images/regenerated_image_1780229317487.jpg";
import imgNinhBinh from "./assets/images/regenerated_image_1780229488923.jpg";

export const CATEGORIES: Category[] = [
  { id: "adventure", label: "Adventure", icon: "🏔" },
  { id: "beaches", label: "Beaches", icon: "🏝" },
  { id: "culture", label: "Culture", icon: "🏛" },
  { id: "food", label: "Food", icon: "🍜" },
  { id: "unique", label: "Unique Experiences", icon: "🌌" },
  { id: "transport", label: "Transportation", icon: "🚄" },
];

export const DESTINATIONS: Destination[] = [
  {
    id: "ha-long",
    name: "Ha Long Bay",
    rating: 4.8,
    description: "Thousands of towering limestone pillars rising from emerald waters. Sleep under the stars on a traditional luxury junk cruise ship.",
    image: imgHaLong,
    lat: 20.91,
    lng: 107.18,
    category: "beaches",
    price: "$180 / day",
    activity: "World Heritage Cruise",
    tags: ["Cruising", "Islands", "Kayaking"]
  },
  {
    id: "phong-nha",
    name: "Phong Nha Ke Bang",
    rating: 4.9,
    description: "Home to Son Doong, the world's largest cave network. Giant underground caverns, pristine fossil passages, and mystical mountain rivers.",
    image: imgPhongNha,
    lat: 17.51,
    lng: 106.22,
    category: "adventure",
    price: "$149 / day",
    activity: "Cave Expedition",
    tags: ["Caves", "UNESCO", "Trekking"]
  },
  {
    id: "hue",
    name: "Hue Imperial City",
    rating: 4.7,
    description: "The grand majestic capital of the Nguyen Dynasty. Explore walled royal citadels, gilded pagodas, and solemn historic tombs along the Perfume River.",
    image: imgHue,
    lat: 16.46,
    lng: 107.59,
    category: "culture",
    price: "$120 / day",
    activity: "Royal Heritage",
    tags: ["Palaces", "Dynasty", "History"]
  },
  {
    id: "hoi-an",
    name: "Hoi An Ancient Town",
    rating: 4.8,
    description: "Charming merchant port town wrapped in silk lanterns, old wooden heritage homes, dynamic tailor shops, and sleepy quiet river canals.",
    image: imgHoiAn,
    lat: 15.88,
    lng: 108.33,
    category: "culture",
    price: "$85 / day",
    activity: "Heritage Tour",
    tags: ["Lanterns", "Ancient Town", "Cooking"]
  },
  {
    id: "ninh-binh",
    name: "Ninh Binh",
    rating: 4.7,
    description: "Nicknamed Ha Long Bay on Land. Drift silently in hand-paddled sampan boats through towering karst gorges and dynamic flooded lotus fields.",
    image: imgNinhBinh,
    lat: 20.25,
    lng: 105.97,
    category: "adventure",
    price: "$110 / day",
    activity: "River Exploration",
    tags: ["Rivers", "Temples", "Biking"]
  }
];
