import { clsx, type ClassValue } from 'clsx';
import { extendTailwindMerge } from 'tailwind-merge';

/**
 * tailwind-merge classifies `text-*` using its own built-in list. Our theme adds
 * custom font sizes (text-h2) and custom colours (text-paper) that it cannot
 * tell apart, so without this it treats them as one group and drops the earlier
 * of the two — silently stripping `text-display` from
 * `cn('text-display', 'text-paper')`.
 *
 * Keep these lists in sync with the @theme block in src/styles/index.css.
 */
const FONT_SIZES = ['display', 'h1', 'h2', 'h3', 'lead', 'label'] as const;

const COLORS = [
  'brand-green',
  'brand-emerald',
  'brand-mint',
  'brand-alert',
  'ink-950',
  'ink-900',
  'ink-800',
  'ink-700',
  'ink-100',
  'paper',
  'paper-dim',
  'mist',
] as const;

const twMerge = extendTailwindMerge({
  extend: {
    classGroups: {
      'font-size': [{ text: [...FONT_SIZES] }],
      'text-color': [{ text: [...COLORS] }],
      'bg-color': [{ bg: [...COLORS] }],
      'border-color': [{ border: [...COLORS] }],
    },
  },
});

export const cn = (...inputs: ClassValue[]) => twMerge(clsx(inputs));
