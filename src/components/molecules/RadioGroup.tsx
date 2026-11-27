import { Radio } from "@/components/atoms/Radio";

export type RadioOption = {
    value: string;
    label: string;
};

type RadioGroupProps = {
    name: string;
    value: string;
    options: RadioOption[];
    onChange: (value: string) => void;
};

export function RadioGroup({ name, value, options, onChange }: RadioGroupProps) {
    return (
        <div className="flex gap-3">
            {options.map((option) => (
                <Radio
                    key={option.value}
                    name={name}
                    value={option.value}
                    label={option.label}
                    checked={value === option.value}
                    onChange={onChange}
                />
            ))}
        </div>
    );
}
