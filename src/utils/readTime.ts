const WORDS_PER_MINUTE = 185;

export function calculateReadTime(content: string): number {
  const words = content.trim().split(/\s+/).length;
  const minutes = Math.ceil(words / WORDS_PER_MINUTE);
  return minutes;
}

export function formatReadTime(minutes: number, locale: string = 'en'): string {
  switch(locale) {
    case 'de':
      return `${minutes}m Lesezeit`;
    case 'fr':
      return `${minutes}m de lecture`;
    case 'it':
      return `${minutes}m di lettura`;
    default:
      return `${minutes}m read`;
  }
} 