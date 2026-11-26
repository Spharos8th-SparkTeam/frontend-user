import type { ReactNode } from "react";

const VARIANT_CLASS = {
    eyebrow: "text-[11px] font-medium tracking-[0.22em] text-[#BA5847]",
    price: "text-base font-semibold tabular-nums tracking-tight",
    caption: "font-semibold text-[14px] tracking-wide text-[#58473B]",
    catalog: "text-[12px] tracking-wide text-[#6F675F]",
} as const;

export type TextVariant = keyof typeof VARIANT_CLASS;

type TextProps = {
    variant: TextVariant;
    children: ReactNode;
    className?: string;
};

export function Text({ variant, children, className = "" }: TextProps) {
    return <p className={`${VARIANT_CLASS[variant]} ${className}`}>{children}</p>;
}
