import { Logo } from "@/components/atoms/Logo";
import { Text } from "@/components/atoms/Text";
import { FooterLinkGroup, type FooterLink } from "@/components/molecules/FooterLinkGroup";

export type FooterGroup = {
    title: string;
    links: FooterLink[];
};

type FooterProps = {
    description: string;
    groups: FooterGroup[];
    supportTitle: string;
    supportLinks: FooterLink[];
    phone: string;
    hours: string;
    email: string;
    companyLines: string[];
};

export function Footer({
    description,
    groups,
    supportTitle,
    supportLinks,
    phone,
    hours,
    email,
    companyLines,
}: FooterProps) {
    return (
        <footer className="mt-auto border-t border-[#E7DFD6] bg-[#FBF7F3]">
            <div className="mx-auto grid max-w-6xl gap-10 px-4 py-12 sm:px-6 md:grid-cols-2 lg:grid-cols-4">
                <div>
                    <Logo />
                    <Text variant="caption" className="mt-3 text-sm leading-6 tracking-normal text-[#6F675F]">
                        {description}
                    </Text>
                </div>
                {groups.map((group) => (
                    <FooterLinkGroup key={group.title} title={group.title} links={group.links} />
                ))}
                <div>
                    <FooterLinkGroup title={supportTitle} links={supportLinks} />
                    <Text variant="price" className="mt-4 text-sm text-[#1C1917]">
                        {phone}
                    </Text>
                    <Text variant="caption" className="mt-1 text-sm leading-6 tracking-normal text-[#6F675F]">
                        {hours}
                    </Text>
                    <Text variant="caption" className="text-sm tracking-normal text-[#6F675F]">
                        {email}
                    </Text>
                </div>
            </div>
            <div className="border-t border-[#E7DFD6]">
                <div className="mx-auto max-w-6xl space-y-1 px-4 py-6 sm:px-6">
                    {companyLines.map((line) => (
                        <Text key={line} variant="caption" className="leading-5">
                            {line}
                        </Text>
                    ))}
                </div>
            </div>
        </footer>
    );
}
