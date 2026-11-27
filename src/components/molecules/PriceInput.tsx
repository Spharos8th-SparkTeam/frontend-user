type PriceInputProps = {
    id: string;
    value: string;
    onChange: (value: string) => void;
    placeholder?: string;
    required?: boolean;
    prefix?: string;
};

export function PriceInput({
    id,
    value,
    onChange,
    placeholder,
    required = false,
    prefix = "$",
}: PriceInputProps) {
    return (
        <div className="flex items-center rounded-2xl border border-[#E7DFD6] bg-white focus-within:border-[#CDBFB2]">
            <span className="pl-4 text-sm text-[#8A8178]" aria-hidden="true">
                {prefix}
            </span>
            <input
                id={id}
                inputMode="decimal"
                value={value}
                placeholder={placeholder}
                required={required}
                onChange={(event) => onChange(event.target.value)}
                className="w-full bg-transparent py-3 pr-4 pl-2 text-sm text-[#1C1917] outline-none placeholder:text-[#B3A89F]"
            />
        </div>
    );
}
