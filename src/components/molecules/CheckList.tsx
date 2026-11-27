import { Text } from "@/components/atoms/Text";
import { InlineLink } from "@/components/molecules/InlineLink";

type CheckListProps = {
    title: string;
    items: string[];
    guideHref?: string;
    guideLabel?: string;
};

export function CheckList({ title, items, guideHref, guideLabel }: CheckListProps) {
    return (
        <div>
            <Text variant="caption" className="tracking-normal text-[#1C1917]">
                {title}
            </Text>
            <ul className="mt-3 space-y-1">
                {items.map((item) => (
                    <li key={item} className="flex gap-2 text-xs leading-4 text-[#6F675F]">
                        <span aria-hidden="true">•</span>
                        <span>{item}</span>
                    </li>
                ))}
            </ul>
            {guideHref && guideLabel ? (
                <div className="mt-3">
                    <InlineLink href={guideHref}>{guideLabel}</InlineLink>
                </div>
            ) : null}
        </div>
    );
}
