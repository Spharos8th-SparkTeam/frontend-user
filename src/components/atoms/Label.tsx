import type { ReactNode } from "react";

/* 상품 검색, 언어 */
type LabelProps = {
    htmlFor: string;
    children: ReactNode;
    visuallyHidden?: boolean;
    required?: boolean;
    className?: string;
};

export function Label({
    htmlFor,
    children,
    visuallyHidden = false,
    required = false,
    className = "",
}: LabelProps) {
    return (
        <label
            htmlFor={htmlFor}
            className={
                visuallyHidden ? "sr-only" : `text-sm font-semibold text-[#1C1917] ${className}`
            }
        >
            {children}
            {required ? (
                <span className="ml-0.5 text-[#E08B78]" aria-hidden="true">
                    *
                </span>
            ) : null}
        </label>
    );
}
