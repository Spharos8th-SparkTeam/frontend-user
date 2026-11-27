import { Button } from "@/components/atoms/Button";
import { Heading } from "@/components/atoms/Heading";
import { Icon } from "@/components/atoms/Icon";

type SectionHeaderProps = {
    title: string;
    href: string;
    actionLabel: string;
};

/* 인기상품, 신상품 */
export function SectionHeader({ title, href, actionLabel }: SectionHeaderProps) {
    return (
        <div className="flex items-center justify-between gap-3">
            <Heading level="h2">{title}</Heading>
            <Button href={href} variant="ghost">
                {actionLabel}
                <Icon name="arrow" />
            </Button>
        </div>
    );
}
