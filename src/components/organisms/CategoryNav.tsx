import { NavLink } from "@/components/atoms/NavLink";

export type CategoryNavItem = {
    href: string;
    label: string;
    current?: boolean;
};

type CategoryNavProps = {
    label: string;
    categories: CategoryNavItem[];
};

export function CategoryNav({ label, categories }: CategoryNavProps) {
    return (
        <nav aria-label={label} className="scroll-clean flex items-center gap-2 overflow-x-auto pb-3">
            {categories.map((category) => (
                <NavLink
                    key={category.href}
                    href={category.href}
                    current={category.current}
                    className={`shrink-0 rounded-full px-3.5 py-1.5 ${category.current ? "bg-[#1C1917] text-white" : "bg-white text-[#1C1917]"}`}
                >
                    {category.label}
                </NavLink>
            ))}
        </nav>
    );
}
