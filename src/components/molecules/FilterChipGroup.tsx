export type ChipOption = {
    value: string;
    label: string;
};

type FilterChipGroupProps = {
    label: string;
    value: string;
    options: ChipOption[];
    onChange: (value: string) => void;
};

export function FilterChipGroup({ label, value, options, onChange }: FilterChipGroupProps) {
    return (
        <div>
            <p className="text-sm text-[#8A8178]">{label}</p>
            <div className="mt-2 flex flex-wrap gap-2" role="radiogroup" aria-label={label}>
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
                                    ? "inline-flex items-center gap-1 rounded-full bg-[#BA5847] px-3 py-1.5 text-sm font-semibold text-white"
                                    : "inline-flex items-center gap-1 rounded-full border border-[#E7DFD6] bg-white px-3 py-1.5 text-sm text-[#1C1917]"
                            }
                        >
                            {selected ? <span aria-hidden="true">✓</span> : null}
                            {option.label}
                        </button>
                    );
                })}
            </div>
        </div>
    );
}
