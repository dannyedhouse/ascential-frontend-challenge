/**
 * Converts and formats a UTC timestamp into a localised timestamp as a string.
 * @param timestamp The expected UTC timestamp to convert/format.
 * @param timeZone Optional param for timezone to display timestamp in.
 * @returns Formatted timestamp as string to display.
 */
export function formatDateTime(timestamp: Date, timeZone?: string): string {
 const options: Intl.DateTimeFormatOptions = {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: 'numeric',
    minute: 'numeric',
    second: 'numeric',
    timeZoneName: 'short',
  }

  if (timeZone) {
    options.timeZone = timeZone;
  }

  const utcDate = new Date(`${timestamp}Z`);

  return new Intl.DateTimeFormat('en-US', options).format(new Date(utcDate));
}