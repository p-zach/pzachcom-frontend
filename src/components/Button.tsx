import Link from "next/link";
import { IconType } from "react-icons";

export default function Button({
  children,
  href,
  icon: Icon,
  external
}: {
  children: React.ReactNode;
  href: string;
  icon?: IconType;
  external?: boolean;
}) {
  const styling = "inline-flex items-center gap-2 px-4 py-2 rounded-lg border \
    border-gray-300 text-sm font-medium hover:bg-gray-50 dark:hover:bg-gray-900 \
    focus:outline-none focus:ring-2 focus:ring-indigo-200";

  if (external) {
    return (
      <a href={href} target="_blank" rel="noopener noreferrer" className={`${styling}`}>
        {Icon && <Icon className="w-4 h-4" />}
        {children}
      </a>
    );
  }

  return (
    <Link href={href} className={styling}>
      {Icon && <Icon className="w-4 h-4" />}
      {children}
    </Link>
  );
}