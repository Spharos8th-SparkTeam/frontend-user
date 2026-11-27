import { Icon } from "@/components/atoms/Icon";

/* 언어 선택, 상품 등록 필드 */
export type SelectOption = {
    value: string;
    label: string;
};

type SelectProps = {
    id: string;
    value: string;
    options: SelectOption[];
    onChange: (value: string) => void;
    ariaLabel: string;
    required?: boolean;
    variant?: "inline" | "field";
};

export function Select({
    id,
    value,
    options,
    onChange,
    ariaLabel,
    required = false,
    variant = "inline",
}: SelectProps) {
    const select = (
        <select
            id={id}
            value={value}
            aria-label={ariaLabel}
            required={required}
            onChange={(event) => onChange(event.target.value)}
            className={
                variant === "field"
                    ? "w-full appearance-none rounded-2xl border border-[#E7DFD6] bg-white px-4 py-3 pr-10 text-sm text-[#1C1917] outline-none focus:border-[#CDBFB2]"
                    : "rounded-full bg-transparent px-2 py-1.5 text-sm text-[#1C1917]"
            }
        >
            {options.map((option) => (
                <option key={option.value} value={option.value}>
                    {option.label}
                </option>
            ))}
        </select>
    );

    if (variant === "inline") {
        return select;
    }

    return (
        <div className="relative">
            {select}
            <Icon
                name="arrow"
                className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 rotate-90 text-[#8A8178]"
            />
        </div>
    );
}
