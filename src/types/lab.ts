 export interface Lab {
  id: number;
  name: string;
  location: string;
  address: string;
  phone: string;
  email: string;
  website?: string;
  services: string[];
  certifications: string[];
  description: string;
  image: string;
  coordinates: {
    lat: number;
    lng: number;
  };
  claimed?: boolean;
  claimedBy?: string;
}