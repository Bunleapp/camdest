export const SITE_NAME = "CAMDEST";
export const SITE_DESCRIPTION =
  "Discover Cambodia through Eco Tourism, Cultural & Heritage Tourism, and Dark Tourism — explore ancient temples, wild landscapes, and sites of profound historical remembrance.";
export const SITE_URL = "https://camdest.page";

export const NAV_LINKS = [
  { label: "Home", href: "/" },
  { label: "Destinations", href: "/destinations" },
  { label: "Gallery", href: "/gallery" },
  { label: "Estimate", href: "/estimate" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
] as const;

export const SOCIAL_LINKS = [
  { label: "Instagram", href: "https://www.instagram.com/bunleapp_/", icon: "instagram" },
  { label: "Facebook", href: "https://www.facebook.com/pinbunleap/", icon: "facebook" },
  { label: "Twitter", href: "https://x.com/bunleappp_/", icon: "twitter" },
  { label: "YouTube", href: "https://www.youtube.com/@PinBunleap", icon: "youtube" },
] as const;

/**
 * Tourism Categories — Scope of this application.
 * The project focuses exclusively on three tourism categories in Cambodia:
 * 1. Eco Tourism        — nature reserves, rivers, forests, wildlife, islands.
 * 2. Cultural & Heritage Tourism — temples, ancient sites, traditional villages.
 * 3. Dark Tourism       — sites of historical tragedy and remembrance (Khmer Rouge era).
 */
export const TOURISM_CATEGORIES = [
  {
    id: "eco-tourism",
    slug: "eco-tourism",
    name: "Eco Tourism",
    description:
      "Explore Cambodia's pristine nature — from the Cardamom Mountains rainforest to the Mekong River islands and Tonle Sap floating villages.",
    icon: "leaf",
  },
  {
    id: "cultural-heritage",
    slug: "cultural-heritage",
    name: "Cultural & Heritage Tourism",
    description:
      "Discover the Khmer Empire's legacy through Angkor's temples, royal palaces, and living traditions passed through generations.",
    icon: "temple",
  },
  {
    id: "dark-tourism",
    slug: "dark-tourism",
    name: "Dark Tourism",
    description:
      "Visit sites of remembrance from the Khmer Rouge era — places that preserve Cambodia's history for reflection and education.",
    icon: "candle",
  },
] as const;

export const COUNTRY_NAME = "Cambodia";
export const COUNTRY_CURRENCY = "USD";
