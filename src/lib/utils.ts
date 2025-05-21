
import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

/**
 * Format a number to Indonesian Rupiah currency format
 * @param amount - The amount to format
 * @param withSymbol - Whether to include the Rp symbol (default: true)
 * @returns Formatted price string
 */
export function formatRupiah(amount: number, withSymbol = true): string {
  // Format with thousand separators using Indonesian locale
  const formatted = new Intl.NumberFormat('id-ID', {
    style: withSymbol ? 'currency' : 'decimal',
    currency: 'IDR',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount);
  
  // If we're not using the symbol format, but want to add Rp manually
  if (!withSymbol) {
    return `Rp ${formatted}`;
  }
  
  // Replace the default 'IDR' with 'Rp' (Indonesian standard)
  return formatted.replace('IDR', 'Rp');
}
