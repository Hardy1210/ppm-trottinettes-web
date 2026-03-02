export function HeroBackdrop() {
  return (
    <div aria-hidden="true" className="pointer-events-none absolute inset-0">
      {/* Big subtle circle (right / center) */}
      <div
        className="
            absolute right-[-25%] top-[10%]
            h-[520px] w-[520px]
            rounded-full
            bg-white/5
            md:right-[-10%] md:top-[0%]
            md:h-[720px] md:w-[720px]
          "
      />

      {/* Diagonal bands like screenshot */}
      <svg
        className="absolute inset-0 h-full w-full opacity-60"
        viewBox="0 0 1000 1000"
        preserveAspectRatio="none"
      >
        <defs>
          <linearGradient id="band" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0" stopColor="rgba(255,255,255,0.08)" />
            <stop offset="1" stopColor="rgba(255,255,255,0.00)" />
          </linearGradient>
        </defs>

        {/* Left big diagonal */}
        <path d="M-100 950 L250 1000 L1050 50 L700 0 Z" fill="url(#band)" />
        {/* Right diagonal */}
        <path d="M650 1050 L1000 1100 L1100 0 L750 -50 Z" fill="url(#band)" />
        {/* Extra thin band */}
        <path
          d="M120 1080 L260 1100 L1120 220 L980 200 Z"
          fill="rgba(255,255,255,0.05)"
        />
      </svg>
    </div>
  );
}
