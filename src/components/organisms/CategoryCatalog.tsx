import { Text } from "@/components/atoms/Text";
import type { ChipOption } from "@/components/molecules/FilterChipGroup";
import { Pagination } from "@/components/molecules/Pagination";
import { SortTabs } from "@/components/molecules/SortTabs";
import { ProductCard } from "@/components/organisms/ProductCard";
import type { ProductSectionItem } from "@/components/organisms/ProductSection";

export type CategoryCatalogProps = {
    label: string;
    countLabel: string;
    sort: string;
    sortOptions: ChipOption[];
    onSortChange: (value: string) => void;
    products: ProductSectionItem[];
    emptyLabel: string;
    onToggleWish: (productId: string) => void;
    page: number;
    pageCount: number;
    onPageChange: (page: number) => void;
};

export function CategoryCatalog({
    label,
    countLabel,
    sort,
    sortOptions,
    onSortChange,
    products,
    emptyLabel,
    onToggleWish,
    page,
    pageCount,
    onPageChange,
}: CategoryCatalogProps) {
    return (
        <section aria-label={label}>
            <div className="flex flex-wrap items-center justify-between gap-3">
                <p className="text-sm text-[#1C1917]">{countLabel}</p>
                <SortTabs value={sort} options={sortOptions} onChange={onSortChange} />
            </div>
            {products.length === 0 ? (
                <Text variant="caption" className="mt-4 text-sm tracking-normal text-[#8A8178]">
                    {emptyLabel}
                </Text>
            ) : (
                <ul className="mt-5 grid grid-cols-2 gap-x-3 gap-y-6 sm:grid-cols-3 lg:grid-cols-5">
                    {products.map((product) => (
                        <li key={product.id}>
                            <ProductCard
                                href={product.href}
                                imageSrc={product.imageSrc}
                                imageAlt={product.imageAlt}
                                category={product.category}
                                country={product.country}
                                title={product.title}
                                price={product.price}
                                status={product.status}
                                statusLabel={product.statusLabel}
                                wished={product.wished}
                                wishCount={product.wishCount}
                                wishLabel={product.wishLabel}
                                onToggleWish={() => onToggleWish(product.id)}
                            />
                        </li>
                    ))}
                </ul>
            )}
            {pageCount > 1 ? (
                <div className="mt-8">
                    <Pagination page={page} pageCount={pageCount} onPageChange={onPageChange} />
                </div>
            ) : null}
        </section>
    );
}
