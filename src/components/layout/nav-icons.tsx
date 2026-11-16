import type { SectionId } from "@/lib/section-nav";

export const NAV_ICONS: Record<SectionId, (props: { className?: string }) => React.ReactElement> = {
  about: ({ className }) => (
    <svg
      viewBox="0 0 24 24"
      aria-hidden
      className={className}
      fill="none"
      stroke="currentColor"
      strokeWidth="1.3"
    >
      <circle cx="12" cy="8.4" r="3.5" />
      <path d="M4.9 20.2c0-3.6 3.2-6.3 7.1-6.3s7.1 2.7 7.1 6.3" strokeLinecap="round" />
    </svg>
  ),
  education: ({ className }) => (
    <svg
      viewBox="0 0 24 24"
      aria-hidden
      className={className}
      fill="none"
      stroke="currentColor"
      strokeWidth="1.3"
    >
      {/* the board, seen flat, plus the tassel falling from its edge */}
      <path d="M12 3.6 21.4 8.4 12 13.2 2.6 8.4z" strokeLinejoin="round" />
      <path d="M6.4 10.8v4.6c0 1.6 2.5 2.9 5.6 2.9s5.6-1.3 5.6-2.9v-4.6" strokeLinejoin="round" />
      <path d="M20.6 9.2v4.4" strokeLinecap="round" />
    </svg>
  ),
  projects: ({ className }) => (
    <svg
      viewBox="0 0 24 24"
      aria-hidden
      className={className}
      fill="none"
      stroke="currentColor"
      strokeWidth="1.3"
    >
      <rect x="4.2" y="3.6" width="12.4" height="15.4" rx="1.4" />
      <path d="M7.6 20.4h10.8a1.4 1.4 0 0 0 1.4-1.4V7" strokeLinecap="round" />
      <path d="M7.2 8h6.4M7.2 11.6h6.4M7.2 15.2h3.6" strokeLinecap="round" />
    </svg>
  ),
  articles: ({ className }) => (
    <svg
      viewBox="0 0 24 24"
      aria-hidden
      className={className}
      fill="none"
      stroke="currentColor"
      strokeWidth="1.3"
    >
      <path d="M6.4 3.6h7.2l4 4v12.8H6.4z" strokeLinejoin="round" />
      <path d="M13.4 3.8v4h4" strokeLinejoin="round" />
      <path d="M9 12.2h6M9 15.1h6M9 18h3.4" strokeLinecap="round" />
    </svg>
  ),
  skills: ({ className }) => (
    <svg
      viewBox="0 0 24 24"
      aria-hidden
      className={className}
      fill="none"
      stroke="currentColor"
      strokeWidth="1.3"
    >
      <path
        d="M12 2.9 14.8 9.2 21.1 12 14.8 14.8 12 21.1 9.2 14.8 2.9 12 9.2 9.2z"
        strokeLinejoin="round"
      />
      <circle cx="12" cy="12" r="1.5" fill="currentColor" stroke="none" />
    </svg>
  ),
  contact: ({ className }) => (
    <svg
      viewBox="0 0 24 24"
      aria-hidden
      className={className}
      fill="none"
      stroke="currentColor"
      strokeWidth="1.3"
    >
      <path d="M3.6 7.2 12 13l8.4-5.8" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M3.6 7.4a1.8 1.8 0 0 1 1.8-1.8h13.2a1.8 1.8 0 0 1 1.8 1.8v9.2a1.8 1.8 0 0 1-1.8 1.8H5.4a1.8 1.8 0 0 1-1.8-1.8z" />
    </svg>
  ),
};

export const SETTINGS_ICON = ({ className }: { className?: string }) => (
  <svg
    viewBox="0 0 24 24"
    aria-hidden
    className={className}
    fill="none"
    stroke="currentColor"
    strokeWidth="1.3"
    strokeLinecap="round"
  >
    <path d="M3.6 7.6h4.1M12.4 7.6h8M3.6 16.4h8M16.4 16.4h4" />
    <circle cx="10.05" cy="7.6" r="2.2" />
    <circle cx="14.05" cy="16.4" r="2.2" />
  </svg>
);
