"use client";

import { useEffect, useState } from "react";
import { Check, Copy } from "@phosphor-icons/react/dist/ssr";

interface ConsultationItem {
  title: string;
  color: string;
  quantity: number;
  slug: string;
  variantId: string;
}

export function CopyConsultation({
  items,
  label = "Sao chép mẫu này",
  className = "text-button",
}: {
  items: ConsultationItem[];
  label?: string;
  className?: string;
}) {
  const [copied, setCopied] = useState(false);
  const [fallback, setFallback] = useState("");
  const signature = JSON.stringify(items);
  useEffect(() => { setCopied(false); setFallback(""); }, [signature]);

  const copy = async () => {
    const text = "Chào LIS, mình muốn hỏi giá và tình trạng hàng của:\n\n" + items.map((item) =>
      `${item.title} — ${item.color} × ${item.quantity}\n${window.location.origin}/products/${item.slug}?variant=${item.variantId}`,
    ).join("\n\n");
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setFallback("");
    } catch {
      setFallback(text);
    }
  };

  return (
    <div className="copy-consultation">
      <button type="button" className={className} onClick={copy}>
        {copied ? <Check size={20} aria-hidden="true" /> : <Copy size={20} aria-hidden="true" />}
        {copied ? "Đã sao chép" : label}
      </button>
      {copied && <span className="sr-only" role="status">Đã sao chép</span>}
      {fallback && <>
        <p className="copy-status" role="alert">Bạn có thể chọn và sao chép nội dung bên dưới.</p>
        <textarea aria-label="Nội dung tư vấn" readOnly value={fallback} onFocus={(event) => event.currentTarget.select()} />
      </>}
    </div>
  );
}
