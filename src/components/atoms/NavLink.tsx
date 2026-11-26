import Link from "next/link";
import type { ReactNode } from "react";

type NavLinkProps = {
    href: string;
    children: ReactNode;
    current?: boolean;
    className?: string;
};

export function NavLink({ href, children, current = false, className = "" }: NavLinkProps) {
    return (
        <Link
            href={href}
            aria-current={current ? "page" : undefined}
            className={`text-sm ${
                className ||
                (current ? "font-semibold text-[#1C1917]" : "text-[#6F675F] hover:text-[#1C1917]")
            }`}
        >
            {children}
        </Link>
    );
}
