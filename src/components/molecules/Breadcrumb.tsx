import Link from "next/link";

export type BreadcrumbItem = {
    href?: string;
    label: string;
};

type BreadcrumbProps = {
    items: BreadcrumbItem[];
};

export function Breadcrumb({ items }: BreadcrumbProps) {
    return (
        <nav aria-label="경로">
            <ol className="flex flex-wrap items-center gap-1.5 text-xs text-[#8A8178]">
                {items.map((item, index) => {
                    const last = index === items.length - 1;

                    return (
                        <li key={`${item.label}-${index}`} className="flex items-center gap-1.5">
                            {index > 0 ? <span aria-hidden="true">/</span> : null}
                            {item.href && !last ? (
                                <Link href={item.href} className="hover:text-[#1C1917]">
                                    {item.label}
                                </Link>
                            ) : (
                                <span aria-current={last ? "page" : undefined}>{item.label}</span>
                            )}
                        </li>
                    );
                })}
            </ol>
        </nav>
    );
}
