import type { ChipOption } from "@/components/molecules/FilterChipGroup";

type SortTabsProps = {
    value: string;
    options: ChipOption[];
    onChange: (value: string) => void;
};

export function SortTabs({ value, options, onChange }: SortTabsProps) {
    return (
        <div className="flex flex-wrap items-center gap-3" role="radiogroup" aria-label="정렬">
            {options.map((option) => {
                const selected = option.value === value;

                return (
                    <button
                        key={option.value}
                        type="button"
                        role="radio"
                        aria-checked={selected}
                        onClick={() => onChange(option.value)}
                        className={
                            selected
                                ? "text-sm font-semibold text-[#BA5847]"
                                : "text-sm text-[#8A8178]"
                        }
                    >
                        {option.label}
                    </button>
                );
            })}
        </div>
    );
}
