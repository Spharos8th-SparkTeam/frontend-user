import type { ReactNode } from "react";
import { Label } from "@/components/atoms/Label";
import { Text } from "@/components/atoms/Text";

type FormFieldProps = {
    id?: string;
    label: string;
    required?: boolean;
    hint?: string;
    children: ReactNode;
};

export function FormField({ id, label, required = false, hint, children }: FormFieldProps) {
    return (
        <div>
            {id ? (
                <Label htmlFor={id} required={required}>
                    {label}
                </Label>
            ) : (
                <p className="text-sm font-semibold text-[#1C1917]">
                    {label}
                    {required ? (
                        <span className="ml-1 text-[#BA5847]" aria-hidden="true">
                            *
                        </span>
                    ) : null}
                </p>
            )}
            <div className="mt-2">{children}</div>
            {hint ? (
                <Text variant="catalog" className="ml-2 mt-2 font-normal normal-case tracking-normal">
                    {hint}
                </Text>
            ) : null}
        </div>
    );
}
