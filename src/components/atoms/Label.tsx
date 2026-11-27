import type { ReactNode } from "react";

/* 상품 검색, 언어 */
type LabelProps = {
    htmlFor: string;
    children: ReactNode;
    visuallyHidden?: boolean;
};

export function Label({ htmlFor, children, visuallyHidden = false }: LabelProps) {
    return (
        <label
            htmlFor={htmlFor}
            className={visuallyHidden ? "sr-only" : "text-sm font-medium text-slate-700"}
        >
            {children}
        </label>
    );
}
