import type { ReactNode } from "react";

const LEVEL_CLASS = {
    h1: "text-4xl font-semibold tracking-[-0.045em] text-[#49382F] sm:text-5xl",
    h2: "text-[1.7rem] font-semibold tracking-[-0.04em] text-[#49382F]",
} as const;

type HeadingProps = {
    level?: keyof typeof LEVEL_CLASS;
    children: ReactNode;
    className?: string;
};

export function Heading({ level = "h2", children, className = "" }: HeadingProps) {
    const headingClass = `${LEVEL_CLASS[level]} ${className}`;

    if (level === "h1") {
        return <h1 className={headingClass}>{children}</h1>;
    }

    return <h2 className={headingClass}>{children}</h2>;
}
