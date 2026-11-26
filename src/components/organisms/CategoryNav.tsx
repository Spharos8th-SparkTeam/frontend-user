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
        <nav
            aria-label={label}
            className="scroll-clean flex items-center gap-5 overflow-x-auto pt-3 pb-5"
        >
            {categories.map((category) => (
                <NavLink
                    key={category.href}
                    href={category.href}
                    current={category.current}
                    className={`shrink-0 rounded-full px-4 py-2 ${category.current ? "bg-[#F8DED4] text-[#BA5847]" : "bg-[#F7E7DB] text-[#737A6A]"}`}
                >
                    {category.label}
                </NavLink>
            ))}
        </nav>
    );
}
