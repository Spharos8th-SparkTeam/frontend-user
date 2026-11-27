import Link from "next/link";
import type { ReactNode } from "react";

const VARIANT_CLASS = {
    primary: "bg-[#49382F] text-white hover:bg-[#3A332E]", // 판매하기
    secondary: "border border-[#E7DFD6] bg-white text-[#49382F] hover:bg-[#FBF7F3]", // 구매/판매 내역
    ghost: "text-[#49382F] hover:bg-white", // lucide 아이콘, 전체보기, 찜수, 미선택 토글
} as const;

const SIZE_CLASS = {
    md: "px-4 py-2 text-sm",
    icon: "h-9 w-9 p-0 text-sm",
} as const;

export type ButtonVariant = keyof typeof VARIANT_CLASS;
export type ButtonSize = keyof typeof SIZE_CLASS;

type ButtonProps = {
    variant?: ButtonVariant;
    size?: ButtonSize;
    href?: string;
    children: ReactNode;
    className?: string;
    type?: "button" | "submit";
    disabled?: boolean;
    pressed?: boolean;
    ariaLabel?: string;
    onClick?: () => void;
};

export function Button({
    variant = "primary",
    size = "md",
    href,
    children,
    className = "",
    type = "button",
    disabled = false,
    pressed,
    ariaLabel,
    onClick,
}: ButtonProps) {
    const classNames = `inline-flex items-center justify-center gap-1 rounded-full font-medium ${SIZE_CLASS[size]} ${VARIANT_CLASS[variant]} ${className}`;

    if (href) {
        return (
            <Link href={href} className={classNames} aria-label={ariaLabel} onClick={onClick}>
                {children}
            </Link>
        );
    }

    return (
        <button
            type={type}
            className={classNames}
            disabled={disabled}
            aria-pressed={pressed}
            aria-label={ariaLabel}
            onClick={onClick}
        >
            {children}
        </button>
    );
}
