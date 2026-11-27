import { Button } from "@/components/atoms/Button";
import { Text } from "@/components/atoms/Text";

type AiAssistProps = {
    title: string;
    description: string;
    actionLabel: string;
    onAnalyze: () => void;
};

export function AiAssist({ title, description, actionLabel, onAnalyze }: AiAssistProps) {
    return (
        <div className="flex flex-wrap items-center justify-between gap-3 rounded-2xl bg-[#FFFDF5] px-4 py-3">
            <div>
                <Text variant="caption" className="text-sm tracking-normal text-[#1C1917]">
                    {title}
                </Text>
                <Text variant="catalog" className="mt-1 font-normal normal-case tracking-normal">
                    {description}
                </Text>
            </div>
            <Button variant="accentOutline" onClick={onAnalyze}>
                {actionLabel}
            </Button>
        </div>
    );
}
