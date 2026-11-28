"use client";

import { useMemo, useState } from "react";
import { HeroSection } from "@/components/organisms/HeroSection";
import { ProductSection, type ProductSectionItem } from "@/components/organisms/ProductSection";
import { usePageLocale } from "@/components/templates/MainTemplate";
import {
    getNewProductList,
    getPopularProductList,
    getVisibleLikeCount,
} from "@/features/product/api/GetHomeProductList";
import {
    CATEGORY_ALL_SLUG,
    SALE_STATUS,
    formatUsd,
    type Product,
    type SaleStatus,
} from "@/features/product/model/Product";
import { CATEGORY_SORT } from "@/features/product/api/GetCategoryProductList";
import { translate, type LocaleId } from "@/shared/config/Locale";
import type { SaleBadgeStatus } from "@/components/atoms/Badge";

type HomePageProps = {
    products: Product[];
};

const STATUS_BADGE: Record<SaleStatus, SaleBadgeStatus> = {
    [SALE_STATUS.ON_SALE]: "onSale",
    [SALE_STATUS.RESERVED]: "reserved",
    [SALE_STATUS.SOLD]: "sold",
};

export function HomePage({ products }: HomePageProps) {
    const locale = usePageLocale();
    const [wishedIdList, setWishedIdList] = useState<string[]>([]);
    const wishedIds = useMemo(() => new Set(wishedIdList), [wishedIdList]);
    const popularProducts = useMemo(
        () =>
            getPopularProductList(products, wishedIds).map((product) =>
                toSectionItem(product, wishedIds, locale),
            ),
        [locale, products, wishedIds],
    );
    const newProducts = useMemo(
        () =>
            getNewProductList(products).map((product) => toSectionItem(product, wishedIds, locale)),
        [locale, products, wishedIds],
    );

    function toggleWish(productId: string) {
        setWishedIdList((current) =>
            current.includes(productId)
                ? current.filter((id) => id !== productId)
                : [...current, productId],
        );
    }

    return (
        <>
            <HeroSection
                eyebrow={translate(locale, "heroEyebrow")}
                title={translate(locale, "heroTitle")}
                description={translate(locale, "heroBody")}
                primaryAction={{ href: "/sell", label: translate(locale, "sell") }}
                secondaryAction={{ href: "/orders", label: translate(locale, "orders") }}
            />
            <ProductSection
                title={translate(locale, "popularTitle")}
                description={translate(locale, "popularLede")}
                href={`/c/${CATEGORY_ALL_SLUG}?sort=${CATEGORY_SORT.LIKES}`}
                actionLabel={translate(locale, "viewAll")}
                emptyLabel={translate(locale, "emptyProducts")}
                products={popularProducts}
                onToggleWish={toggleWish}
            />
            <ProductSection
                title={translate(locale, "newTitle")}
                description={translate(locale, "newLede")}
                href={`/c/${CATEGORY_ALL_SLUG}?sort=${CATEGORY_SORT.NEW}`}
                actionLabel={translate(locale, "viewAll")}
                emptyLabel={translate(locale, "emptyProducts")}
                products={newProducts}
                onToggleWish={toggleWish}
            />
        </>
    );
}

function toSectionItem(
    product: Product,
    wishedIds: ReadonlySet<string>,
    locale: LocaleId,
): ProductSectionItem {
    const wished = wishedIds.has(product.id);
    const statusLabel =
        product.saleStatus === SALE_STATUS.RESERVED
            ? translate(locale, "statusReserved")
            : product.saleStatus === SALE_STATUS.SOLD
              ? translate(locale, "statusSold")
              : translate(locale, "statusOnSale");

    return {
        id: product.id,
        href: `/products/${product.id}`,
        imageSrc: product.imageUrl,
        imageAlt: product.title,
        category: product.category,
        country: product.country,
        title: product.title,
        price: formatUsd(product.price),
        status: STATUS_BADGE[product.saleStatus],
        statusLabel,
        wished,
        wishCount: getVisibleLikeCount(product, wished),
        wishLabel: wished ? translate(locale, "wishOff") : translate(locale, "wishOn"),
    };
}
