type PriceRangeProps = {
    label: string;
    min: string;
    max: string;
    minPlaceholder?: string;
    maxPlaceholder?: string;
    actionLabel: string;
    hint?: string;
    onMinChange: (value: string) => void;
    onMaxChange: (value: string) => void;
    onApply: () => void;
};

function changeAmount(value: string, onChange: (value: string) => void) {
    if (value === "" || /^\d+$/.test(value)) {
        onChange(value);
    }
}

export function PriceRange({
    label,
    min,
    max,
    minPlaceholder = "최저가",
    maxPlaceholder = "최고가",
    actionLabel,
    hint,
    onMinChange,
    onMaxChange,
    onApply,
}: PriceRangeProps) {
    return (
        <div>
            <p className="text-sm text-[#8A8178]">{label}</p>
            <div className="mt-2 flex flex-wrap items-center gap-2">
                <input
                    inputMode="numeric"
                    value={min}
                    placeholder={minPlaceholder}
                    aria-label={minPlaceholder}
                    onChange={(event) => changeAmount(event.target.value, onMinChange)}
                    className="w-28 rounded-full border border-[#E7DFD6] bg-white px-4 py-2 text-sm text-[#1C1917] outline-none placeholder:text-[#B3A89F] focus:border-[#CDBFB2]"
                />
                <span className="text-sm" aria-hidden="true">
                    -
                </span>
                <input
                    inputMode="numeric"
                    value={max}
                    placeholder={maxPlaceholder}
                    aria-label={maxPlaceholder}
                    onChange={(event) => changeAmount(event.target.value, onMaxChange)}
                    className="w-28 rounded-full border border-[#E7DFD6] bg-white px-4 py-2 text-sm text-[#1C1917] outline-none placeholder:text-[#B3A89F] focus:border-[#CDBFB2]"
                />
                <button
                    type="button"
                    onClick={onApply}
                    className="rounded-full bg-[#BA5847] px-4 py-2 text-sm font-semibold text-white"
                >
                    {actionLabel}
                </button>
            </div>
            {hint ? <p className="mt-2 text-xs text-[#B3A89F]">{hint}</p> : null}
        </div>
    );
}
