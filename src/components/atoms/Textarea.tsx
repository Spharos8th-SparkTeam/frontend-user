type TextareaProps = {
    id: string;
    value: string;
    onChange: (value: string) => void;
    placeholder?: string;
    rows?: number;
    maxLength?: number;
    required?: boolean;
    className?: string;
};

export function Textarea({
    id,
    value,
    onChange,
    placeholder,
    rows = 6,
    maxLength,
    required = false,
    className = "",
}: TextareaProps) {
    return (
        <textarea
            id={id}
            value={value}
            rows={rows}
            maxLength={maxLength}
            required={required}
            placeholder={placeholder}
            onChange={(event) => onChange(event.target.value)}
            className={`min-h-36 w-full resize-y rounded-2xl border border-[#E7DFD6] bg-white px-4 py-3 text-sm leading-6 text-[#1C1917] outline-none placeholder:text-[#B3A89F] focus:border-[#CDBFB2] ${className}`}
        />
    );
}
