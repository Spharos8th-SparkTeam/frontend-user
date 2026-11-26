import { Button } from "@/components/atoms/Button";
import { Icon } from "@/components/atoms/Icon";

type WishButtonProps = {
    wished: boolean;
    count: number;
    label: string;
    onToggle: () => void;
};

export function WishButton({ wished, count, label, onToggle }: WishButtonProps) {
    return (
        <Button
            variant="ghost"
            ariaLabel={label}
            onClick={onToggle}
            className="gap-1 rounded-full bg-white px-2 py-1 shadow-[0_4px_12px_rgba(70,40,20,0.08)]"
        >
            <Icon name="heart" filled={wished} className={wished ? "h-4 w-4 text-[#E07A7A]" : "h-4 w-4 text-[#8A8178]"} />
            <span className="text-xs font-semibold tabular-nums">{count.toLocaleString("en-US")}</span>
        </Button>
    );
}
