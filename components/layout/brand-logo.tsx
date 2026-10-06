import { BRAND_LOGOS, type LogoVariant } from "@/data/site";

export function BrandLogo({
  variant = "burgundy",
  width = 96,
  decorative = false,
  className = "",
}: {
  variant?: LogoVariant;
  width?: number;
  decorative?: boolean;
  className?: string;
}) {
  const base = BRAND_LOGOS[variant];
  return (
    // These PNGs are exported from the supplied logos with their transparency intact.
    // eslint-disable-next-line @next/next/no-img-element
    <img
      className={`brand-logo ${className}`}
      src={`${base}-512.png`}
      srcSet={`${base}-512.png 512w, ${base}-1024.png 1024w`}
      sizes={`${width}px`}
      width={width}
      height={Math.round((width * 5486) / 11812)}
      alt={decorative ? "" : "LIS"}
      decoding="async"
    />
  );
}
