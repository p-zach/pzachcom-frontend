export default function Card({
  children,
  className = "",
  expandOnHover = true
}: {
  children: React.ReactNode;
  className?: string;
  expandOnHover?: boolean
}) {
  return <div className={`flex-1 rounded-2xl border border-gray-100 dark:border-gray-600 shadow-sm
         p-8 transition-transform duration-300 ease-out transform
         ${expandOnHover ? `hover:-translate-y-1 hover:scale-[1.01]
         hover:shadow-[0_20px_40px_rgba(99,102,241,0.12)]
         hover:ring-4 hover:ring-indigo-200/30` : ''} ${className}`}>{children}</div>;
}
