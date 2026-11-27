import type { ReactNode } from "react";
import { Icon } from "@/components/atoms/Icon";
import { NavLink } from "@/components/atoms/NavLink";

type InlineLinkProps = {
    href: string;
    children: ReactNode;
};

export function InlineLink({ href, children }: InlineLinkProps) {
    return (
        <NavLink
            href={href}
            className="inline-flex items-center gap-0.5 font-medium text-[#BA5847] hover:text-[#D47B68]"
        >
            {children}
            <Icon name="arrow" className="mt-1  h-3.5 w-3.5" />
        </NavLink>
    );
}
