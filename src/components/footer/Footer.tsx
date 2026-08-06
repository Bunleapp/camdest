import Link from "next/link";
import { NAV_LINKS, SITE_DESCRIPTION, SITE_NAME, SOCIAL_LINKS } from "@/lib/constants";
import SocialIcon from "@/components/ui/SocialIcon";

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="mt-auto bg-slate-900 text-slate-200">
      <div className="container-page py-12 sm:py-16">
        <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-4">
          <div>
            <Link href="/" className="text-2xl font-bold text-white">
              {SITE_NAME}
            </Link>
            <p className="mt-3 text-sm text-slate-400 max-w-xs">
              {SITE_DESCRIPTION}
            </p>
          </div>

          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider text-white">
              Explore
            </h3>
            <ul className="mt-4 space-y-2">
              {NAV_LINKS.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-slate-400 hover:text-primary-light transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider text-white">
              Contact
            </h3>
            <ul className="mt-4 space-y-2 text-sm text-slate-400">
              <li>Russei Keo, Phnom Penh</li>
              <li>
                <a
                  href="mailto:bunleappin@gmail.com"
                  className="hover:text-primary-light transition-colors"
                >
                  bunleappin@gmail.com
                </a>
              </li>
              <li>
                <a
                  href="tel:+855 11 865 519"
                  className="hover:text-primary-light transition-colors"
                >
                  +855 11 865 519
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider text-white">
              Follow Us
            </h3>
            <ul className="mt-4 flex gap-3">
              {SOCIAL_LINKS.map((social) => (
                <li key={social.href}>
                  <a
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={social.label}
                    className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-white/10 hover:bg-primary transition-colors"
                  >
                    <SocialIcon name={social.icon} size={16} strokeWidth={2} />
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-10 border-t border-white/10 pt-6 text-center text-xs text-slate-500">
          © {year} {SITE_NAME}. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
