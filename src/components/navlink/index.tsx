import clsx from "clsx";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { FC } from "react";

interface NavLinkProps {
  path: string;
  children: React.ReactNode;
  onClick(): void;
}

export const NavLink: FC<NavLinkProps> = ({ path, children, onClick }) => {
  const pathname = usePathname();

  return (
    <Link
      className={clsx("nav-item", { active: pathname === path })}
      href={path}
      onClick={onClick}
    >
      {children}
    </Link>
  );
};
