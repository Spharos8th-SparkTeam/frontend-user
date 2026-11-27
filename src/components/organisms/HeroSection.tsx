import { Button } from "@/components/atoms/Button";
import { Heading } from "@/components/atoms/Heading";
import { Text } from "@/components/atoms/Text";

type HeroAction = {
    href: string;
    label: string;
};

type HeroSectionProps = {
    eyebrow: string;
    title: string;
    description: string;
    primaryAction: HeroAction;
    secondaryAction: HeroAction;
};

export function HeroSection({
    eyebrow,
    title,
    description,
    primaryAction,
    secondaryAction,
}: HeroSectionProps) {
    return (
        <section className="mx-auto max-w-xl py-12 text-center sm:py-16">
            <Text variant="eyebrow">{eyebrow}</Text>
            <div className="mt-3">
                <Heading level="h1">{title}</Heading>
            </div>
            <Text variant="caption" className="mt-5 text-sm tracking-normal text-[#6F675F]">
                {description}
            </Text>
            <div className="mt-6 flex flex-wrap justify-center gap-2">
                <Button href={primaryAction.href}>{primaryAction.label}</Button>
                <Button href={secondaryAction.href} variant="secondary">
                    {secondaryAction.label}
                </Button>
            </div>
        </section>
    );
}
