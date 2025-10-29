export default function SelectableText({
  children,
  className = ""
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <span className={`pointer-events-auto select-text ${className}`}>
        {children}
    </span>
  );
}
