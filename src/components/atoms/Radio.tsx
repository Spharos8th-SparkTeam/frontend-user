type RadioProps = {
    name: string;
    value: string;
    checked: boolean;
    label: string;
    onChange: (value: string) => void;
};

export function Radio({ name, value, checked, label, onChange }: RadioProps) {
    return (
        <label className={`flex flex-1 cursor-pointer items-center gap-3 rounded-2xl border px-4 py-4 transition-colors ${
            checked ? "border-[#BA5847] bg-[#FFFDF5]" : "border-[#D9D0C7] bg-white"
        }`}>
            <input
                type="radio"
                name={name}
                value={value}
                checked={checked}
                onChange={() => onChange(value)}
                className="sr-only"
            />
            <span
                className={`relative inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-full border ${
                    checked ? "border-[#BA5847]" : "border-[#D9D0C7]"
                }`}
                aria-hidden="true"
            >
                {checked ? <span className="block h-2.5 w-2.5 rounded-full bg-[#BA5847]" /> : null}
            </span>
            <span className="text-sm text-[#1C1917]">{label}</span>
        </label>
    );
}
