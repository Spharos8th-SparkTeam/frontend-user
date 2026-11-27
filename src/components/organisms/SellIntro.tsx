import { Heading } from "@/components/atoms/Heading";
import { Text } from "@/components/atoms/Text";

export type SellIntroProps = {
    title: string;
    description: string;
};

export function SellIntro({ title, description }: SellIntroProps) {
    return (
        <header>
            <div className="mt-4">
                <Heading level="h2">{title}</Heading>
            </div>
            <Text variant="catalog" className="mt-2 font-normal normal-case tracking-normal">
                {description}
            </Text>
        </header>
    );
}
