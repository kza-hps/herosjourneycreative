import Link from "next/link";

interface ServiceCardProps {
  title: string;
  description: string;
  href: string;
  ctaText?: string;
}

export default function ServiceCard({ title, description, href, ctaText = "Explore Lane" }: ServiceCardProps) {
  return (
    <div className="flex flex-col justify-between border border-hjc-charcoal p-6 bg-hjc-warm-white hover:bg-white hover:shadow-[4px_4px_0px_0px_#ffb700] transition-all duration-200">
      <div className="space-y-3">
        <h3 className="text-lg font-bold tracking-tight text-hjc-black uppercase">
          {title}
        </h3>
        <p className="text-sm text-hjc-charcoal/80 leading-relaxed">
          {description}
        </p>
      </div>
      <div className="pt-6">
        <Link
          href={href}
          className="inline-flex items-center text-xs font-mono font-semibold uppercase tracking-wider text-hjc-black hover:text-hjc-aged-gold transition-colors"
        >
          {ctaText} <span className="ml-1">→</span>
        </Link>
      </div>
    </div>
  );
}
