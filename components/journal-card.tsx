import Link from "next/link";
import { JournalItem } from "@/lib/site-content";

interface JournalCardProps {
  item: JournalItem;
}

export default function JournalCard({ item }: JournalCardProps) {
  return (
    <article className="border border-hjc-charcoal/20 p-6 bg-hjc-warm-white hover:border-hjc-charcoal hover:bg-white transition-all flex flex-col justify-between h-full">
      <div className="space-y-3">
        <div className="flex items-center justify-between text-xs text-hjc-charcoal/60 font-mono">
          <span>{item.publishedAt}</span>
          <span>{item.readTime}</span>
        </div>
        <h3 className="text-lg font-bold tracking-tight text-hjc-black hover:text-hjc-aged-gold transition-colors">
          <Link href={`/journal#${item.slug}`}>{item.title}</Link>
        </h3>
        <p className="text-sm text-hjc-charcoal/80 leading-relaxed">
          {item.excerpt}
        </p>
      </div>
      <div className="pt-6">
        <Link
          href={`/journal#${item.slug}`}
          className="text-xs font-mono font-semibold uppercase tracking-wider text-hjc-black hover:text-hjc-aged-gold transition-colors"
        >
          Read Entry <span className="ml-1">→</span>
        </Link>
      </div>
    </article>
  );
}
