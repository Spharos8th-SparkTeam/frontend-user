import { Checkbox } from "@/components/atoms/Checkbox";

type AgreementFieldProps = {
    id: string;
    label: string;
    checked: boolean;
    onChange: (checked: boolean) => void;
    viewLabel?: string;
    onView?: () => void;
};

export function AgreementField({
    id,
    label,
    checked,
    onChange,
    viewLabel,
    onView,
}: AgreementFieldProps) {
    return (
        <div className="flex items-start justify-between gap-3">
            <div className="min-w-0 flex-1">
                <Checkbox id={id} checked={checked} onChange={onChange}>
                    {label}
                </Checkbox>
            </div>
            {viewLabel && onView ? (
                <button
                    type="button"
                    onClick={onView}
                    className="shrink-0 text-sm font-medium text-[#BA5847] hover:text-[#D47B68]"
                >
                    {viewLabel}
                </button>
            ) : null}
        </div>
    );
}
