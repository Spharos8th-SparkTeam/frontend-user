import Link from "next/link";
import { Image } from "@/components/atoms/Image";
import { PriceStatus } from "@/components/molecules/PriceStatus";
import { ProductMeta } from "@/components/molecules/ProductMeta";
import { WishButton } from "@/components/molecules/WishButton";
import type { SaleBadgeStatus } from "@/components/atoms/Badge";

export type ProductCardProps = {
    href: string;
    imageSrc: string;
    imageAlt: string;
    category: string;
    country: string;
    title: string;
    price: string;
    status: SaleBadgeStatus;
    statusLabel: string;
    wished: boolean;
    wishCount: number;
    wishLabel: string;
    onToggleWish: () => void;
};

export function ProductCard({
    href,
    imageSrc,
    imageAlt,
    category,
    country,
    title,
    price,
    status,
    statusLabel,
    wished,
    wishCount,
    wishLabel,
    onToggleWish,
}: ProductCardProps) {
    return (
        <article className="relative flex h-full flex-col rounded-[28px] p-0.5">
            <Link href={href} className="flex h-full flex-col gap-3">
                <Image src={imageSrc} alt={imageAlt} />
                <ProductMeta category={category} country={country} />
                <p className="line-clamp-2 text-sm font-medium leading-5 text-[#1C1917]">{title}</p>
                <div className="mt-auto pt-1">
                    <PriceStatus price={price} status={status} statusLabel={statusLabel} />
                </div>
            </Link>
            <div className="absolute right-2 top-2">
                <WishButton
                    wished={wished}
                    count={wishCount}
                    label={wishLabel}
                    onToggle={onToggleWish}
                />
            </div>
        </article>
    );
}
