import { Heading } from "@/components/atoms/Heading";
import { Text } from "@/components/atoms/Text";

export type SignUpIntroProps = {
    title: string;
    description: string;
};

export function SignUpIntro({ title, description }: SignUpIntroProps) {
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
