type Props = { className?: string };

export function GitHubIcon({ className }: Props) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden className={className} fill="currentColor">
      <path d="M12 1.8a10.2 10.2 0 0 0-3.23 19.88c.51.1.7-.22.7-.49l-.01-1.9c-2.84.62-3.44-1.2-3.44-1.2-.46-1.18-1.13-1.5-1.13-1.5-.93-.63.07-.62.07-.62 1.02.07 1.56 1.05 1.56 1.05.91 1.56 2.39 1.11 2.97.85.09-.66.36-1.11.65-1.37-2.27-.26-4.65-1.13-4.65-5.05 0-1.12.4-2.03 1.05-2.75-.11-.26-.46-1.3.1-2.71 0 0 .86-.28 2.81 1.05a9.7 9.7 0 0 1 5.12 0c1.95-1.33 2.81-1.05 2.81-1.05.56 1.41.21 2.45.1 2.71.65.72 1.05 1.63 1.05 2.75 0 3.93-2.39 4.79-4.67 5.04.37.32.7.94.7 1.9l-.01 2.81c0 .28.19.6.71.49A10.2 10.2 0 0 0 12 1.8Z" />
    </svg>
  );
}

export function LinkedInIcon({ className }: Props) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden className={className} fill="currentColor">
      <path d="M4.98 3.5a2.5 2.5 0 1 0 0 5 2.5 2.5 0 0 0 0-5ZM3 9.6h4V21H3V9.6Zm6.5 0h3.83v1.56h.05c.53-.95 1.84-1.95 3.78-1.95 4.04 0 4.79 2.4 4.79 5.53V21h-4v-5.35c0-1.28-.02-2.92-1.87-2.92-1.87 0-2.16 1.39-2.16 2.83V21h-4V9.6Z" />
    </svg>
  );
}

export function TelegramIcon({ className }: Props) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden className={className} fill="currentColor">
      <path d="M21.9 4.3 2.9 11.6c-1 .4-1 1 .1 1.3l4.8 1.5 1.9 5.9c.2.6.4.8.9.8.4 0 .6-.2.9-.5l2.4-2.3 4.8 3.5c.9.5 1.5.2 1.7-.8l3.1-14.5c.3-1.2-.5-1.8-1.6-1.4Zm-4.1 4L9.4 15.3l-.2 3-1.5-4.6 8.9-5.6c.4-.2.7.1.4.4Z" />
    </svg>
  );
}

export function MailIcon({ className }: Props) {
  return (
    <svg
      viewBox="0 0 24 24"
      aria-hidden
      className={className}
      fill="none"
      stroke="currentColor"
      strokeWidth="1.4"
    >
      <rect x="3.2" y="5.4" width="17.6" height="13.2" rx="2" />
      <path d="m4.2 6.8 7.8 5.9 7.8-5.9" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
