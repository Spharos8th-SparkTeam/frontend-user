/* 언어 선택 */
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
};

export function Select({ id, value, options, onChange, ariaLabel }: SelectProps) {
    return (
        <select
            id={id}
            value={value}
            aria-label={ariaLabel}
            onChange={(event) => onChange(event.target.value)}
            className="rounded-full bg-transparent px-2 py-1.5 text-sm text-[#1C1917]"
        >
            {options.map((option) => (
                <option key={option.value} value={option.value}>
                    {option.label}
                </option>
            ))}
        </select>
    );
}
