import { format, formatDistance } from 'date-fns';

/**
 * Formats a date into a human-readable string
 * @param date - The date to format
 * @param formatString - Optional format string (defaults to 'MMM d, yyyy')
 */
export function formatDate(date: Date | string, formatString: string = 'MMM d, yyyy'): string {
  const dateObj = typeof date === 'string' ? new Date(date) : date;
  return format(dateObj, formatString);
}

/**
 * Returns a relative time string (e.g., "2 hours ago")
 * @param date - The date to compare against now
 */
export function getRelativeTime(date: Date | string): string {
  const dateObj = typeof date === 'string' ? new Date(date) : date;
  return formatDistance(dateObj, new Date(), { addSuffix: true });
}