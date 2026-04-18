/**
 * Utility: merge Tailwind class names safely.
 * Lightweight version — no clsx/tailwind-merge dependency.
 * For a full shadcn-compatible cn(), install clsx + tailwind-merge.
 */
export function cn(...classes) {
  return classes.filter(Boolean).join(' ');
}
