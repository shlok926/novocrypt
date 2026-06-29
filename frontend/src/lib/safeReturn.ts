/**
 * Only allow same-origin relative paths to avoid open redirects.
 */
export function getSafeReturnPath(raw: string | null): string {
  if (!raw) {
    return '/risk';
  }
  const trimmed = raw.trim();
  if (
    !trimmed.startsWith('/') ||
    trimmed.startsWith('//') ||
    trimmed.includes('..') ||
    trimmed.includes(':') ||
    trimmed.includes('\\')
  ) {
    return '/risk';
  }
  return trimmed;
}
