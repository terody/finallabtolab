// Utility for consistent logging
export const logger = {
  info: (message: string, ...args: any[]) => {
    console.log(`[Lab-to-Lab] ${message}`, ...args);
  },
  error: (message: string, error: any) => {
    console.error(`[Lab-to-Lab] Error: ${message}`, error);
  },
  warn: (message: string, ...args: any[]) => {
    console.warn(`[Lab-to-Lab] Warning: ${message}`, ...args);
  }
};