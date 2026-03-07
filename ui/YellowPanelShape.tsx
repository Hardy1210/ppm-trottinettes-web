type YellowPanelShapeProps = {
  className?: string;
  points?: string;
};

export default function YellowPanelShape({
  className = '',
  points = '0,0 900,0 760,620 0,620',
}: YellowPanelShapeProps) {
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
