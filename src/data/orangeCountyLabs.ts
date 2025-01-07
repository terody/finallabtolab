import type { Lab } from '../types/lab';

export const orangeCountyLabs: Lab[] = [
  {
    id: 1,
    name: "Biogene Diagnostics",
    location: "Los Alamitos, CA",
    address: "10900 Los Alamitos Blvd, Los Alamitos, CA 90720",
    phone: "(562) 555-0123",
    email: "info@biogenediagnostics.com",
    website: "https://biogenediagnostics.com",
    services: ["Clinical Testing", "Molecular Diagnostics", "COVID-19 Testing"],
    certifications: ["CLIA", "CAP"],
    description: "Leading diagnostic laboratory specializing in molecular testing and clinical diagnostics.",
    image: "https://images.unsplash.com/photo-1581093458791-9d58946cc0d8?auto=format&fit=crop&q=80&w=2940",
    coordinates: {
      lat: 33.7947,
      lng: -118.0725
    },
    claimed: false
  },
  {
    id: 2,
    name: "Orange County Reference Laboratory",
    location: "Santa Ana, CA",
    address: "1815 E Wilshire Ave, Santa Ana, CA 92705",
    phone: "(714) 555-0234",
    email: "info@ocreference.com",
    website: "https://ocreference.com",
    services: ["Blood Testing", "Toxicology", "Genetic Testing"],
    certifications: ["CLIA", "CAP", "ISO 15189"],
    description: "Full-service clinical laboratory providing comprehensive testing solutions.",
    image: "https://images.unsplash.com/photo-1579684385127-1ef15d508118?auto=format&fit=crop&q=80&w=2940",
    coordinates: {
      lat: 33.7500,
      lng: -117.8500
    },
    claimed: false
  },
  {
    id: 3,
    name: "Pacific Diagnostic Labs",
    location: "Irvine, CA",
    address: "15375 Barranca Pkwy, Irvine, CA 92618",
    phone: "(949) 555-0345",
    email: "contact@pacificdiagnostic.com",
    website: "https://pacificdiagnostic.com",
    services: ["Clinical Pathology", "Microbiology", "Immunology"],
    certifications: ["CLIA", "CAP"],
    description: "Specialized laboratory focusing on advanced diagnostic testing.",
    image: "https://images.unsplash.com/photo-1582719508461-905c673771fd?auto=format&fit=crop&q=80&w=2940",
    coordinates: {
      lat: 33.6846,
      lng: -117.7867
    },
    claimed: false
  },
  // Add more Orange County labs here...
];