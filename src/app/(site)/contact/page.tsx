import type { Metadata } from "next";
import SectionTitle from "@/components/ui/SectionTitle";
import ContactForm from "@/components/forms/ContactForm";
import ContactInfo from "@/components/ui/ContactInfo";
import MapPlaceholder from "@/components/ui/MapPlaceholder";

export const metadata: Metadata = {
  title: "Contact Us",
  description:
    "Get in touch with CAMDEST for questions about eco-tourism, cultural heritage, and dark tourism trips.",
  alternates: {
    canonical: "/contact",
  },
};

export default function ContactPage() {
  return (
    <div className="container-page py-16">
      <SectionTitle
        eyebrow="Get In Touch"
        title="Contact Us"
        description="Have a question about a destination or need help planning your trip? Send us a message."
      />

      <div className="mt-10 grid grid-cols-1 gap-10 lg:grid-cols-3">
        <div className="lg:col-span-2 rounded-2xl bg-white p-6 shadow-sm ring-1 ring-black/5 sm:p-8">
          <ContactForm />
        </div>

        <div className="space-y-6 lg:col-span-1">
          <ContactInfo />
          <MapPlaceholder
            coordinates={{ lat: 11.5564, lng: 104.9282 }}
            name="CAMDEST"
          />
        </div>
      </div>
    </div>
  );
}
