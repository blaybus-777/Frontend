import type { Config } from 'tailwindcss';
import { theme as projectTheme } from './src/styles/theme';

// Helper to sanitize Figma naming conventions to Tailwind CSS class friendly names
// e.g., "Foundation /Blue/blue-3" -> "foundation-blue-blue-3" -> simplified to "foundation-blue-3" logic if needed,
// but for now, we'll just strict sanitize: lowercase, replace non-alphanumeric with -
const sanitizeKey = (key: string) => {
  return key
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-') // Replace non-alphanumeric with hyphens
    .replace(/^-+|-+$/g, ''); // Trim leading/trailing hyphens
};

const colors = Object.entries(projectTheme.colors).reduce((acc, [key, value]) => {
  acc[sanitizeKey(key)] = value;
  return acc;
}, {} as Record<string, string>);

const fontSize = Object.entries(projectTheme.typography).reduce((acc, [key, value]) => {
  const sanitizedKey = sanitizeKey(key);
  // Cast value to any to access properties safely since the const assertion makes it strict
  const typography = value as any;
  
  if (!typography.fontSize) return acc;

  acc[sanitizedKey] = [
    typography.fontSize,
    {
      lineHeight: typography.lineHeight,
      letterSpacing: typography.letterSpacing,
      fontWeight: typography.fontWeight ? String(typography.fontWeight) : undefined,
    },
  ];
  return acc;
}, {} as Record<string, [string, { lineHeight?: string; letterSpacing?: string; fontWeight?: string }]>);

export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors,
      fontSize,
      fontFamily: {
        'pretendard': ['Pretendard', 'sans-serif'],
        'inter': ['Inter', 'sans-serif'],
      },
    },
  },
  plugins: [],
} satisfies Config;
