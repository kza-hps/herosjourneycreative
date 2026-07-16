import Image from "next/image";
import type { ShowcaseScreenshot } from "@/lib/site-content";

interface ShowcaseGalleryProps {
  items: ShowcaseScreenshot[];
}

export default function ShowcaseGallery({ items }: ShowcaseGalleryProps) {
  return (
    <div className="grid grid-cols-3 gap-6 max-[880px]:grid-cols-2 max-[560px]:grid-cols-1">
      {items.map((item) => (
        <figure
          key={item.src}
          style={{ margin: 0 }}
          className={item.wide ? "col-span-3 max-[880px]:col-span-2 max-[560px]:col-span-1" : undefined}
        >
          <div
            style={{
              position: "relative",
              aspectRatio: item.wide ? "16 / 9" : "4 / 3",
              border: "1px solid var(--rule)",
              background: "var(--surface-inset)",
              overflow: "hidden",
            }}
          >
            <Image
              src={item.src}
              alt={item.alt}
              fill
              style={{ objectFit: "contain" }}
              sizes={item.wide ? "(max-width: 880px) 100vw, 1200px" : "(max-width: 560px) 100vw, (max-width: 880px) 50vw, 33vw"}
            />
          </div>
          <figcaption
            style={{
              fontFamily: "var(--font-mono)",
              fontSize: "10px",
              letterSpacing: "0.08em",
              textTransform: "uppercase",
              color: "var(--fg3)",
              margin: "10px 0 0",
            }}
          >
            {item.caption}
          </figcaption>
        </figure>
      ))}
    </div>
  );
}
