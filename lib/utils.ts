
export function extractIdFromUrl(url: string): string {
  return url.split('/').pop() || '';
}