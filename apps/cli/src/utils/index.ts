import { stripVTControlCharacters } from 'node:util';

/**
 * Capitalize first letter of a string
 *
 * @param str - String to capitalize
 * @returns Capitalized string
 */
export function capitalize(str: string): string {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

/**
 * Strip ANSI escape codes from a string
 *
 * @param str - String to strip
 * @param strip - Whether to strip ANSI escape codes
 * @returns String without ANSI escape codes if strip is true, otherwise original string
 */
export function stripANSI(str: string, strip: boolean = true): string {
  if (!strip) return str;
  return stripVTControlCharacters(str);
}
