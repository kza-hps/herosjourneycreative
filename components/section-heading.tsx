interface SectionHeadingProps {
  title: string;
  subtitle?: string;
  className?: string;
}

export default function SectionHeading({ title, subtitle, className = "" }: SectionHeadingProps) {
  return (
    <div className={`space-y-2 ${className}`}>
      <h2 className="text-2xl font-bold tracking-tight text-hjc-black border-l-4 border-hjc-yellow pl-3 uppercase">
        {title}
      </h2>
      {subtitle && (
        <p className="text-sm text-hjc-charcoal/80 max-w-2xl font-mono">
          {subtitle}
        </p>
      )}
    </div>
  );
}
