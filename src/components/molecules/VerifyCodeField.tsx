import { Button } from "@/components/atoms/Button";
import { Input } from "@/components/atoms/Input";
import { FormField } from "@/components/molecules/FormField";

type VerifyCodeFieldProps = {
    id: string;
    label: string;
    value: string;
    onChange: (value: string) => void;
    actionLabel: string;
    onAction: () => void;
    placeholder?: string;
    type?: "text" | "email";
    hint?: string;
    required?: boolean;
    actionDisabled?: boolean;
};

export function VerifyCodeField({
    id,
    label,
    value,
    onChange,
    actionLabel,
    onAction,
    placeholder,
    type = "text",
    hint,
    required = false,
    actionDisabled = false,
}: VerifyCodeFieldProps) {
    return (
        <FormField id={id} label={label} required={required} hint={hint}>
            <div className="flex items-center gap-4">
                <Input
                    id={id}
                    variant="field"
                    type={type}
                    value={value}
                    placeholder={placeholder}
                    required={required}
                    onChange={onChange}
                    className="min-w-0 flex-1"
                />
                <Button
                    variant="secondary"
                    className="shrink-0"
                    disabled={actionDisabled}
                    onClick={onAction}
                >
                    {actionLabel}
                </Button>
            </div>
        </FormField>
    );
}
