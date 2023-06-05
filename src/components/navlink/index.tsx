import clsx from "clsx";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { FC } from "react";

interface NavLinkProps {
  path: string;
  children: React.ReactNode;
  onClick(): void;
  className?: string;
}

export const NavLink: FC<NavLinkProps> = ({ path, children, onClick }) => {
  const pathname = usePathname();

  return (
    <Link
      className={clsx("items-center gap-3 flex py-3 uppercase", {
        "text-slate-400": pathname === path,
      })}
      href={path}
      onClick={onClick}
    >
      {children}
    </Link>
  );
};
