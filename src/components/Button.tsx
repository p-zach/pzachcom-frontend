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
  if (external) {
    return (
      <a href={href} target="_blank" rel="noopener noreferrer" className="btn">
        {Icon && <Icon className="w-4 h-4" />}
        {children}
      </a>
    );
  }

  return (
    <Link href={href} className="btn">
      {Icon && <Icon className="w-4 h-4" />}
      {children}
    </Link>
  );
}