import { Facebook, Instagram, Twitter, Youtube, type LucideProps } from "lucide-react";

const ICONS = {
  facebook: Facebook,
  instagram: Instagram,
  twitter: Twitter,
  youtube: Youtube,
} as const;

export type SocialIconName = keyof typeof ICONS;

interface SocialIconProps extends LucideProps {
  name: SocialIconName;
}

export default function SocialIcon({ name, ...props }: SocialIconProps) {
  const Icon = ICONS[name];
  return <Icon {...props} />;
}
