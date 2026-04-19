export default function Logo({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 32 32" className={className} aria-hidden="true">
      <defs>
        <linearGradient id="cn-g" x1="0" x2="1" y1="0" y2="1">
          <stop offset="0" stopColor="#22a56e" />
          <stop offset="1" stopColor="#7a57f5" />
        </linearGradient>
      </defs>
      <rect width="32" height="32" rx="8" fill="url(#cn-g)" />
      <path
        d="M10 20l-4-4 4-4M22 12l4 4-4 4M18 10l-4 12"
        stroke="#fff"
        strokeWidth="2.2"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      />
    </svg>
  );
}
