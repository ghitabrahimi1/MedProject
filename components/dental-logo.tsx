export default function DentalLogo({ className = "w-10 h-10" }: { className?: string }) {
  return (
    <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg" className={className}>
      <style>{`
        svg {
          color: inherit;
        }
      `}</style>
      <path
        d="M 50 10 C 50 10, 35 25, 35 45 C 35 70, 50 85, 50 85 C 50 85, 65 70, 65 45 C 65 25, 50 10, 50 10 Z"
        fill="none"
        stroke="currentColor"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M 28 45 L 35 45 L 40 38 L 45 50 L 55 50 L 60 38 L 65 45 L 72 45"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <ellipse cx="42" cy="35" rx="4" ry="8" fill="currentColor" opacity="0.3" />
    </svg>
  )
}
