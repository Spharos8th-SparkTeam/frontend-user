type InputProps = {
    id: string;
    value: string;
    onChange: (value: string) => void;
    placeholder?: string;
    type?: "text" | "search";
    className?: string;
};

export function Input({
    id,
    value,
    onChange,
    placeholder,
    type = "text",
    className = "",
}: InputProps) {
    return (
        <input
            id={id}
            type={type}
            value={value}
            placeholder={placeholder}
            onChange={(event) => onChange(event.target.value)}
            className={`w-full rounded-full bg-[#F4EDE7] py-2.5 pl-13 text-sm text-[#686B60] outline-none placeholder:text-[#686B60] focus:border-[#CDBFB2] [&::-webkit-search-cancel-button]:hidden [&::-webkit-search-decoration]:hidden ${className}`}
        />
    );
}
