import Link from "next/link";

interface CtaBandProps {
  title?: string;
  subtitle?: string;
  buttonText?: string;
  href?: string;
}

export default function CtaBand({
  title = "Ready to begin your journey?",
  subtitle = "Contact us to discuss writing, workshops, or custom story collaborations.",
  buttonText = "Initiate Contact",
  href = "/contact",
}: CtaBandProps) {
  return (
    <section className="bg-hjc-yellow border-y border-hjc-black py-12 text-hjc-black">
      <div className="max-w-4xl mx-auto text-center px-4 space-y-4">
        <h2 className="text-xl sm:text-2xl font-bold uppercase tracking-wider">
          {title}
        </h2>
        <p className="text-sm sm:text-base max-w-xl mx-auto opacity-90 font-mono">
          {subtitle}
        </p>
        <div className="pt-2">
          <Link
            href={href}
            className="inline-block px-6 py-3 text-xs uppercase tracking-widest font-semibold bg-hjc-black text-hjc-warm-white hover:bg-hjc-warm-white hover:text-hjc-black border border-hjc-black transition-colors"
          >
            {buttonText}
          </Link>
        </div>
      </div>
    </section>
  );
}
