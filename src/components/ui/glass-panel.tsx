import type { ComponentPropsWithoutRef } from "react";
import { cn } from "@/lib/utils";

type Variant = "default" | "strong" | "tint";

const variants: Record<Variant, string> = {
  default: "glass",
  strong: "glass glass-strong",
  tint: "glass glass-tint",
};

type GlassPanelProps = ComponentPropsWithoutRef<"div"> & {
  variant?: Variant;
};

/** Frosted surface. Keep the count per screen low: backdrop-filter is expensive. */
export function GlassPanel({ variant = "default", className, ...props }: GlassPanelProps) {
  return <div className={cn(variants[variant], "rounded-3xl", className)} {...props} />;
}
