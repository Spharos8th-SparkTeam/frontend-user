import { Text } from "@/components/atoms/Text";
import { ProductCard, type ProductCardProps } from "@/components/organisms/ProductCard";
import { SectionHeader } from "@/components/molecules/SectionHeader";

export type ProductSectionItem = Omit<ProductCardProps, "onToggleWish"> & {
    id: string;
};

type ProductSectionProps = {
    title: string;
    description: string;
    href: string;
    actionLabel: string;
    emptyLabel: string;
    products: ProductSectionItem[];
    onToggleWish: (productId: string) => void;
};

export function ProductSection({
    title,
    description,
    href,
    actionLabel,
    emptyLabel,
    products,
    onToggleWish,
}: ProductSectionProps) {
    return (
        <section>
            <SectionHeader title={title} href={href} actionLabel={actionLabel} />
            <Text variant="caption" className="mt-1 text-sm tracking-normal text-[#6F675F]">
                {description}
            </Text>
            {products.length === 0 ? (
                <Text variant="caption" className="mt-4 text-sm tracking-normal text-[#8A8178]">
                    {emptyLabel}
                </Text>
            ) : (
                <ul className="scroll-clean mt-5 flex gap-3 overflow-x-auto pb-1 lg:grid lg:grid-cols-5 lg:overflow-visible">
                    {products.map((product) => (
                        <li key={product.id} className="w-44 shrink-0 lg:w-auto">
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
        </section>
    );
}
