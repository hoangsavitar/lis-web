import { BRAND_LOGOS, type LogoVariant } from "@/data/site";

export function BrandLogo({
  variant = "burgundy",
  width = 96,
  decorative = false,
  className = "",
  eager = false,
}: {
  variant?: LogoVariant;
  width?: number;
  decorative?: boolean;
  className?: string;
  eager?: boolean;
}) {
  const asset = BRAND_LOGOS[variant];
  return (
    // These PNGs are exported from the supplied logos with their transparency intact.
    // eslint-disable-next-line @next/next/no-img-element
    <img
      className={`brand-logo ${className}`}
      src={`${asset.base}-160.png`}
      srcSet={asset.widths.map(size => `${asset.base}-${size}.png ${size}w`).join(", ")}
      sizes={`${width}px`}
      width={width}
      height={Math.round((width * 5486) / 11812)}
      alt={decorative ? "" : "LIS"}
      decoding="async"
      loading={eager ? "eager" : "lazy"}
      fetchPriority="low"
    />
  );
}
