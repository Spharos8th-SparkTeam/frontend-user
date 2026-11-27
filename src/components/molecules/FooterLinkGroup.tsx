import { NavLink } from "@/components/atoms/NavLink";
import { Text } from "@/components/atoms/Text";

export type FooterLink = {
    href: string;
    label: string;
};

type FooterLinkGroupProps = {
    title: string;
    links: FooterLink[];
};

export function FooterLinkGroup({ title, links }: FooterLinkGroupProps) {
    return (
        <div>
            <Text variant="caption">{title}</Text>
            <ul className="mt-3 space-y-2">
                {links.map((link) => (
                    <li key={`${link.href}-${link.label}`}>
                        <NavLink href={link.href}>{link.label}</NavLink>
                    </li>
                ))}
            </ul>
        </div>
    );
}
