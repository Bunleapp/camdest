"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import Button from "@/components/ui/Button";
import InstantSearch from "@/components/search/InstantSearch";
import { COUNTRY_NAME } from "@/lib/constants";

export default function Hero() {
  const shouldReduceMotion = useReducedMotion();

  const fadeUp = (delay: number) => ({
    initial: { opacity: 0, y: shouldReduceMotion ? 0 : 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: shouldReduceMotion ? 0 : 0.6, delay, ease: "easeOut" as const },
  });

  return (
    <section className="relative isolate overflow-hidden">
      <div className="absolute inset-0 -z-10">
        <Image
          src="/CulturalTourism/AngkorWat/cover.jpeg"
          alt={`Scenic landscape of ${COUNTRY_NAME}`}
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />
        <div className="absolute inset-0 bg-slate-900/40" />
      </div>

      <div className="container-page flex min-h-[560px] flex-col items-center justify-center py-24 text-center sm:min-h-[640px]">
        <motion.span
          {...fadeUp(0)}
          className="rounded-full bg-white/10 px-4 py-1.5 text-sm font-medium text-white ring-1 ring-white/30"
        >
          Eco · Cultural &amp; Heritage · Dark Tourism
        </motion.span>

        <motion.h1
          {...fadeUp(0.1)}
          className="mt-6 max-w-3xl text-4xl font-bold tracking-tight text-white sm:text-5xl md:text-6xl"
        >
          Discover the Soul of {COUNTRY_NAME}
        </motion.h1>

        <motion.p
          {...fadeUp(0.2)}
          className="mt-4 max-w-xl text-base text-slate-200 sm:text-lg"
        >
          From ancient Angkor temples to untouched rainforests and sites of
          remembrance — explore Cambodia&apos;s nature, heritage, and history.
        </motion.p>

        <motion.div {...fadeUp(0.3)} className="mt-8 w-full max-w-xl">
          <InstantSearch />
        </motion.div>

        <motion.div {...fadeUp(0.4)} className="mt-6 flex flex-wrap justify-center gap-3">
          <Button href="/destinations" size="lg">
            Explore Destinations
          </Button>
          <Button
            href="/estimate"
            variant="outlineOnDark"
            size="lg"
          >
            Estimate Your Trip
          </Button>
        </motion.div>
      </div>
    </section>
  );
}
