import type { ReactNode } from "react";
import { Icon } from "@/components/atoms/Icon";

type CheckboxProps = {
    checked: boolean;
    onChange: (checked: boolean) => void;
    children: ReactNode;
    id?: string;
};

export function Checkbox({ checked, onChange, children, id }: CheckboxProps) {
    return (
        <label htmlFor={id} className="flex cursor-pointer items-start gap-3">
            <input
                id={id}
                type="checkbox"
                checked={checked}
                onChange={(event) => onChange(event.target.checked)}
                className="sr-only"
            />
            <span
                className={`mt-0.5 inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-md border ${
                    checked
                        ? "border-[#BA5847] bg-[#BA5847] text-white"
                        : "border-[#D9D0C7] bg-white"
                }`}
                aria-hidden="true"
            >
                {checked ? <Icon name="check" className="h-3.5 w-3.5" /> : null}
            </span>
            <span className="text-sm leading-5 text-[#1C1917]">{children}</span>
        </label>
    );
}
