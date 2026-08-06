import Button from "@/components/ui/Button";
import { COUNTRY_NAME } from "@/lib/constants";
import FadeIn from "@/components/ui/motion/FadeIn";

export default function CTASection() {
  return (
    <section className="container-page py-16 sm:py-24">
      <FadeIn className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-primary via-primary-dark to-slate-900 px-6 py-14 text-center sm:px-16">
        <h2 className="text-3xl font-bold text-white sm:text-4xl">
          Ready to Explore {COUNTRY_NAME}?
        </h2>
        <p className="mx-auto mt-3 max-w-xl text-slate-100">
          Start planning your journey through temples, rainforests, and
          historic sites — all in one place.
        </p>
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <Button href="/destinations" variant="secondary" size="lg">
            Browse Destinations
          </Button>
          <Button
            href="/contact"
            variant="outlineOnDark"
            size="lg"
          >
            Contact Us
          </Button>
        </div>
      </FadeIn>
    </section>
  );
}
