import Link from "next/link";
import { ShowcaseItem } from "@/lib/site-content";

interface ShowcaseCardProps {
  item: ShowcaseItem;
}

export default function ShowcaseCard({ item }: ShowcaseCardProps) {
  return (
    <div className="border border-hjc-charcoal/20 p-6 bg-hjc-warm-white hover:border-hjc-charcoal hover:bg-white transition-all flex flex-col justify-between h-full">
      <div className="space-y-3">
        <div className="flex items-center justify-between text-xs font-mono gap-2">
          <span className="px-2 py-0.5 border border-hjc-charcoal/20 bg-hjc-warm-white text-hjc-charcoal/90 text-[10px] uppercase tracking-wider truncate">
            {item.category}
          </span>
          <span className="text-hjc-charcoal/60 flex-shrink-0">{item.year}</span>
        </div>
        <h3 className="text-lg font-bold tracking-tight text-hjc-black hover:text-hjc-aged-gold transition-colors">
          <Link href={`/showcase#${item.slug}`}>{item.title}</Link>
        </h3>
        <p className="text-sm text-hjc-charcoal/80 leading-relaxed">
          {item.description}
        </p>
      </div>
      <div className="pt-6">
        <Link
          href={`/showcase#${item.slug}`}
          className="text-xs font-mono font-semibold uppercase tracking-wider text-hjc-black hover:text-hjc-aged-gold transition-colors"
        >
          View Case Study <span className="ml-1">→</span>
        </Link>
      </div>
    </div>
  );
}
