import type { Metadata } from "next";
import SectionTitle from "@/components/ui/SectionTitle";
import FadeIn from "@/components/ui/motion/FadeIn";
import StaggerContainer, { StaggerItem } from "@/components/ui/motion/StaggerContainer";
import { COUNTRY_NAME, SITE_NAME, TOURISM_CATEGORIES } from "@/lib/constants";

export const metadata: Metadata = {
  title: "About Us",
  description:
    "Learn about CAMDEST's mission to promote responsible eco, cultural & heritage, and dark tourism across Cambodia.",
  alternates: {
    canonical: "/about",
  },
  openGraph: {
    title: "About Us",
    description:
      "Learn about CAMDEST's mission to promote responsible eco, cultural & heritage, and dark tourism across Cambodia.",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "About Us",
  },
};

const STATS = [
  { label: "Destinations Featured", value: "16+" },
  { label: "Provinces Covered", value: "12" },
  { label: "Tourism Categories", value: "3" },
  { label: "Destination Goals", value: "50+" },
];

const TIMELINE = [
  { year: "6 August 2026", title: "Project", description: "Implemented by a university student wanting to showcase the country destination beyond its most famous landmark." },
];

const TEAM = [
  { name: "Bunleap Pin", role: "ITE's student" },
];

export default function AboutPage() {
  return (
    <div className="container-page py-16">
      <FadeIn>
        <SectionTitle
          eyebrow="About Us"
          title={`Promoting Responsible Travel Across ${COUNTRY_NAME}`}
          description={`${SITE_NAME} is dedicated to showcasing Cambodia through three lenses: its natural environment, its cultural heritage, and its modern history.`}
        />
      </FadeIn>

      {/* Mission & Vision */}
      <div className="mt-14 grid grid-cols-1 gap-8 sm:grid-cols-2">
        <FadeIn className="rounded-2xl bg-white p-6 shadow-sm ring-1 ring-black/5 sm:p-8">
          <h2 className="text-xl font-semibold text-foreground">Mission</h2>
          <p className="mt-3 text-sm leading-relaxed text-muted">
            To connect travelers with Cambodia&apos;s natural wonders, ancient
            heritage, and modern history in a way that is respectful,
            educational, and supports local communities.
          </p>
        </FadeIn>
        <FadeIn delay={0.1} className="rounded-2xl bg-white p-6 shadow-sm ring-1 ring-black/5 sm:p-8">
          <h2 className="text-xl font-semibold text-foreground">Vision</h2>
          <p className="mt-3 text-sm leading-relaxed text-muted">
            A Cambodia where sustainable eco-tourism, well-preserved cultural
            heritage, and honest historical remembrance thrive together for
            generations of travelers and locals alike.
          </p>
        </FadeIn>
      </div>

      {/* Why Choose Us / Categories */}
      <div className="mt-16">
        <FadeIn>
          <SectionTitle
            align="left"
            eyebrow="Why Choose Us"
            title="Three Ways to Experience Cambodia"
          />
        </FadeIn>
        <StaggerContainer className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-3">
          {TOURISM_CATEGORIES.map((category) => (
            <StaggerItem key={category.id}>
              <div className="h-full rounded-2xl bg-surface p-6 ring-1 ring-black/5">
                <h3 className="text-lg font-semibold text-foreground">{category.name}</h3>
                <p className="mt-2 text-sm text-muted">{category.description}</p>
              </div>
            </StaggerItem>
          ))}
        </StaggerContainer>
      </div>

      {/* Statistics */}
      <div className="mt-16 rounded-2xl bg-primary-dark px-6 py-10 sm:px-10">
        <StaggerContainer className="grid grid-cols-2 gap-6 text-center sm:grid-cols-4">
          {STATS.map((stat) => (
            <StaggerItem key={stat.label}>
              <p className="text-3xl font-bold text-white sm:text-4xl">{stat.value}</p>
              <p className="mt-1 text-sm text-primary-light">{stat.label}</p>
            </StaggerItem>
          ))}
        </StaggerContainer>
      </div>

      {/* Team */}
      <div className="mt-16">
        <FadeIn>
          <SectionTitle align="left" eyebrow="Our Team" title="The People Behind CAMDEST" />
        </FadeIn>
        <StaggerContainer className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {TEAM.map((member) => (
            <StaggerItem key={member.name}>
              <div className="rounded-2xl bg-white p-6 text-center shadow-sm ring-1 ring-black/5">
                <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-primary/10 text-lg font-semibold text-primary-dark">
                  {member.name.charAt(0)}
                </div>
                <p className="mt-3 font-semibold text-foreground">{member.name}</p>
                <p className="text-sm text-muted">{member.role}</p>
              </div>
            </StaggerItem>
          ))}
        </StaggerContainer>
      </div>

      {/* Timeline */}
      <div className="mt-16">
        <FadeIn>
          <SectionTitle align="left" eyebrow="Our Journey" title="Milestones" />
        </FadeIn>
        <div className="mt-8 space-y-6 border-l-2 border-primary/20 pl-6">
          {TIMELINE.map((item, index) => (
            <FadeIn key={item.year} delay={index * 0.05} className="relative">
              <div className="absolute -left-[31px] top-1 h-3 w-3 rounded-full bg-primary-dark" />
              <p className="text-sm font-semibold text-primary-dark">{item.year}</p>
              <h3 className="mt-1 font-semibold text-foreground">{item.title}</h3>
              <p className="mt-1 text-sm text-muted">{item.description}</p>
            </FadeIn>
          ))}
        </div>
      </div>
    </div>
  );
}
