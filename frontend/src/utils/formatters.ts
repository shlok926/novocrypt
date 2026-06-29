// Format numbers with commas
export const formatNumber = (num: number): string => {
  return num.toLocaleString();
};

// Format percentages
export const formatPercent = (value: number, decimal = 1): string => {
  return `${(value * 100).toFixed(decimal)}%`;
};

// Format time in ms to readable format
export const formatTime = (ms: number): string => {
  if (ms < 1000) return `${ms.toFixed(2)}ms`;
  if (ms < 60000) return `${(ms / 1000).toFixed(2)}s`;
  return `${(ms / 60000).toFixed(2)}m`;
};

// Format date
export const formatDate = (date: string | Date): string => {
  return new Date(date).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
};

// Format date time
export const formatDateTime = (date: string | Date): string => {
  return new Date(date).toLocaleString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });
};

// Truncate text
export const truncate = (text: string, length: number): string => {
  return text.length > length ? text.slice(0, length) + '...' : text;
};

// Format large numbers in scientific notation
export const formatLargeNumber = (num: number): string => {
  if (num < 1e6) return formatNumber(num);
  return num.toExponential(2);
};
