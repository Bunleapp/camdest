import { SOCIAL_LINKS } from "@/lib/constants";

const CONTACT_DETAILS = [
  { label: "Address", value: "Russei Keo, Phnom Penh, Cambodia" },
  { label: "Email", value: "bunleappin@gmail.com" },
  { label: "Phone", value: "+855 11 865 519" },
  { label: "Office Hours", value: "Mon–Fri, 8:00 AM – 6:00 PM" },
];

export default function ContactInfo() {
  return (
    <div className="rounded-2xl bg-white p-6 shadow-sm ring-1 ring-black/5">
      <h2 className="text-lg font-semibold text-foreground">Contact Information</h2>

      <dl className="mt-4 space-y-4">
        {CONTACT_DETAILS.map((detail) => (
          <div key={detail.label}>
            <dt className="text-xs font-semibold uppercase tracking-wide text-muted">
              {detail.label}
            </dt>
            <dd className="mt-1 text-sm text-foreground">{detail.value}</dd>
          </div>
        ))}
      </dl>

      <div className="mt-6 border-t border-black/5 pt-6">
        <h3 className="text-sm font-semibold text-foreground">Follow Us</h3>
        <ul className="mt-3 flex gap-3">
          {SOCIAL_LINKS.map((social) => (
            <li key={social.href}>
              <a
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={social.label}
                className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-primary/10 text-primary-dark transition-colors hover:bg-primary-dark hover:text-white"
              >
                <span className="text-xs font-semibold">{social.label.charAt(0)}</span>
              </a>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
