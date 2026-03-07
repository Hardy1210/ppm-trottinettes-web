export default function TitleAccentLine({ className = '' }) {
  return (
    <svg
      viewBox="0 0 355 16"
      preserveAspectRatio="none"
      className={className}
      aria-hidden="true"
    >
      <rect
        x="5.13"
        y="0.9"
        width="1"
        height="15"
        transform="rotate(20 5.13 0.9)"
        fill="currentColor"
      />
      <rect x="3.41" y="8" width="352" height="1" fill="currentColor" />
    </svg>
  );
}
