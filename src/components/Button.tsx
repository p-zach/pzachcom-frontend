import Link from "next/link";
import { IconType } from "react-icons";
import { MouseEventHandler } from "react";

export default function Button({
  children,
  href,
  onClick,
  icon: Icon,
  external,
  className
}: {
  children: React.ReactNode;
  href?: string;
  onClick?: MouseEventHandler<HTMLAnchorElement>;
  icon?: IconType;
  external?: boolean;
  className?: string;
}) {
  const styling = `inline-flex items-center gap-2 px-4 py-2 rounded-lg border \
    border-gray-300 text-sm font-medium hover:bg-gray-50 dark:hover:bg-gray-900 \
    focus:outline-none focus:ring-2 focus:ring-indigo-200 ${className}`;

  const content = <>
    {Icon && <Icon className="w-4 h-4" />}
    {children}
  </>;

  if (href && external) {
    return (
      <a href={href} target="_blank" rel="noopener noreferrer" className={styling} onClick={onClick}>
        {content}
      </a>
    );
  } else if (href) {
    return (
      <Link href={href} className={styling} onClick={onClick}>
        {content}
      </Link>
    );
  }
  return (
    <a className={styling} onClick={onClick}>
      {content}
    </a>
  );
}