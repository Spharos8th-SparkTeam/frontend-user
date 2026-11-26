import { Label } from "@/components/atoms/Label";
import { Select, type SelectOption } from "@/components/atoms/Select";

type LanguageSelectProps = {
    id: string;
    label: string;
    value: string;
    options: SelectOption[];
    onChange: (value: string) => void;
};

export function LanguageSelect({ id, label, value, options, onChange }: LanguageSelectProps) {
    return (
        <div className="inline-flex items-center">
            <Label htmlFor={id} visuallyHidden>
                {label}
            </Label>
            <Select id={id} value={value} options={options} onChange={onChange} ariaLabel={label} />
        </div>
    );
}
