import { theme } from '../src/styles/theme';

const sanitizeKey = (key: string) => {
  return key
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
};

console.log('--- Colors ---');
Object.keys(theme.colors).forEach(key => {
  console.log(`${key} -> ${sanitizeKey(key)}`);
});

console.log('\n--- Typography ---');
Object.keys(theme.typography).forEach(key => {
  console.log(`${key} -> ${sanitizeKey(key)}`);
});
