import type { ReactNode } from "react";
import { ArrowUpRight } from "@phosphor-icons/react/dist/ssr";
import { SITE } from "@/data/site";

export function FacebookLink({
  children,
  label = "Liên hệ giá",
  context,
  className = "contact-link",
}: {
  children?: ReactNode;
  label?: string;
  context?: string;
  className?: string;
}) {
  return (
    <a
      href={SITE.facebookUrl}
      target="_blank"
      rel="noopener noreferrer"
      className={className}
      aria-label={`${label}${context ? ` cho ${context}` : ""}${label.includes("Facebook") ? "" : " trên Facebook"} (mở tab mới)`}
    >
      {children ?? label}
      <ArrowUpRight size={18} aria-hidden="true" />
    </a>
  );
}
