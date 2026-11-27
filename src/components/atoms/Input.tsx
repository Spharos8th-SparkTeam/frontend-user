const VARIANT_CLASS = {
    pill: "rounded-full bg-[#F4EDE7] py-2.5 pl-13 text-[#686B60] placeholder:text-[#686B60]",
    field: "rounded-2xl border border-[#E7DFD6] bg-white px-4 py-3 text-[#1C1917] placeholder:text-[#B3A89F] focus:border-[#CDBFB2]",
} as const;

type InputProps = {
    id: string;
    value: string;
    onChange: (value: string) => void;
    placeholder?: string;
    type?: "text" | "search";
    variant?: keyof typeof VARIANT_CLASS;
    required?: boolean;
    className?: string;
};

export function Input({
    id,
    value,
    onChange,
    placeholder,
    type = "text",
    variant = "pill",
    required = false,
    className = "",
}: InputProps) {
    return (
        <input
            id={id}
            type={type}
            value={value}
            placeholder={placeholder}
            required={required}
            onChange={(event) => onChange(event.target.value)}
            className={`w-full text-sm outline-none [&::-webkit-search-cancel-button]:hidden [&::-webkit-search-decoration]:hidden ${VARIANT_CLASS[variant]} ${className}`}
        />
    );
}
