export default function Section({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <section className={`py-16 ${className}`}>
      <div className="container mx-auto px-2 md:px-6 text-center">
        {children}
      </div>
    </section>
  );
}
