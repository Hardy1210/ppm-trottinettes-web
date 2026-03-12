type YellowPanelLeftShapeProps = {
  className?: string;
  points?: string;
};

export default function YellowPanelLeftShape({
  className = '',
  points = '210,0 900,0 900,620 0,620',
}: YellowPanelLeftShapeProps) {
  return (
    <svg
      viewBox="0 0 900 620"
      preserveAspectRatio="none"
      className={className}
      aria-hidden="true"
    >
      <polygon points={points} fill="#E4E700" />
    </svg>
  );
}
