import { Button } from "@/components/atoms/Button";

export type SocialProvider = "line" | "google" | "x" | "apple";

export type SocialAuthOption = {
    id: SocialProvider;
    label: string;
};

type SocialAuthGroupProps = {
    title: string;
    options: SocialAuthOption[];
    onSelect: (id: SocialProvider) => void;
};

export function SocialAuthGroup({ title, options, onSelect }: SocialAuthGroupProps) {
    return (
        <div>
            <p className="text-center text-sm text-[#6F675F]">{title}</p>
            <div className="mt-3 flex flex-col gap-2">
                {options.map((option) => (
                    <Button
                        key={option.id}
                        variant="secondary"
                        className="w-full"
                        onClick={() => onSelect(option.id)}
                    >
                        {option.label}
                    </Button>
                ))}
            </div>
        </div>
    );
}
