export default function Section({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <section className="py-16">
      <div className="container mx-auto px-6 text-center">
        {children}
      </div>
    </section>
  );
}
