"use client";

import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import type { SaleBadgeStatus } from "@/components/atoms/Badge";
import type { ProductSectionItem } from "@/components/organisms/ProductSection";
import { CategoryTemplate } from "@/components/templates/CategoryTemplate";
import { usePageLocale } from "@/components/templates/MainTemplate";
import {
    CATEGORY_FILTER_ALL,
    CATEGORY_PAGE_SIZE,
    CATEGORY_SORT,
    getCategoryProductList,
    type CategorySort,
} from "@/features/product/api/GetCategoryProductList";
import { getVisibleLikeCount } from "@/features/product/api/GetHomeProductList";
import {
    CATEGORY_ALL_SLUG,
    CATEGORY_LIST,
    SALE_STATUS,
    formatUsd,
    type Product,
    type SaleStatus,
} from "@/features/product/model/Product";
import { translate, type LocaleId } from "@/shared/config/Locale";

const COUNTRY_LIST = ["일본", "중국", "대만", "미국", "덴마크", "체코", "독일"] as const;

const STATUS_BADGE: Record<SaleStatus, SaleBadgeStatus> = {
    [SALE_STATUS.ON_SALE]: "onSale",
    [SALE_STATUS.RESERVED]: "reserved",
    [SALE_STATUS.SOLD]: "sold",
};

const SORT_OPTIONS = [
    { value: CATEGORY_SORT.NEW, label: "최신순" },
    { value: CATEGORY_SORT.LIKES, label: "인기순" },
    { value: CATEGORY_SORT.PRICE_ASC, label: "낮은 가격순" },
    { value: CATEGORY_SORT.PRICE_DESC, label: "높은 가격순" },
] as const;

type CategoryPageProps = {
    slug: string;
    label: string;
    products: Product[];
};

function readPriceBound(value: string): number | undefined {
    if (value === "") {
        return undefined;
    }

    const amount = Number(value);

    if (!Number.isFinite(amount)) {
        return undefined;
    }

    return amount;
}

function toCatalogItem(
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

export function CategoryPage({ slug, label, products }: CategoryPageProps) {
    const router = useRouter();
    const locale = usePageLocale();
    const [country, setCountry] = useState(CATEGORY_FILTER_ALL);
    const [status, setStatus] = useState(CATEGORY_FILTER_ALL);
    const [minPrice, setMinPrice] = useState("");
    const [maxPrice, setMaxPrice] = useState("");
    const [appliedMinPrice, setAppliedMinPrice] = useState("");
    const [appliedMaxPrice, setAppliedMaxPrice] = useState("");
    const [sort, setSort] = useState<CategorySort>(CATEGORY_SORT.NEW);
    const [page, setPage] = useState(1);
    const [wishedIdList, setWishedIdList] = useState<string[]>([]);
    const wishedIds = useMemo(() => new Set(wishedIdList), [wishedIdList]);
    const filteredProducts = useMemo(
        () =>
            getCategoryProductList(products, {
                categoryLabel: slug === CATEGORY_ALL_SLUG ? undefined : label,
                country,
                status,
                minPrice: readPriceBound(appliedMinPrice),
                maxPrice: readPriceBound(appliedMaxPrice),
                sort,
                wishedIds,
            }),
        [appliedMaxPrice, appliedMinPrice, country, label, products, slug, sort, status, wishedIds],
    );
    const pageCount =
        filteredProducts.length === 0 ? 0 : Math.ceil(filteredProducts.length / CATEGORY_PAGE_SIZE);
    const currentPage = pageCount === 0 ? 1 : Math.min(page, pageCount);
    const visibleProducts = filteredProducts.slice(
        (currentPage - 1) * CATEGORY_PAGE_SIZE,
        currentPage * CATEGORY_PAGE_SIZE,
    );

    function changeCategory(nextSlug: string) {
        if (nextSlug === slug) {
            return;
        }

        router.push(`/c/${nextSlug}`);
    }

    function changeCountry(nextCountry: string) {
        setCountry(nextCountry);
        setPage(1);
    }

    function changeStatus(nextStatus: string) {
        setStatus(nextStatus);
        setPage(1);
    }

    function applyPrice() {
        setAppliedMinPrice(minPrice);
        setAppliedMaxPrice(maxPrice);
        setPage(1);
    }

    function changeSort(nextSort: string) {
        setSort(nextSort as CategorySort);
        setPage(1);
    }

    function resetFilters() {
        setCountry(CATEGORY_FILTER_ALL);
        setStatus(CATEGORY_FILTER_ALL);
        setMinPrice("");
        setMaxPrice("");
        setAppliedMinPrice("");
        setAppliedMaxPrice("");
        setSort(CATEGORY_SORT.NEW);
        setPage(1);
    }

    function toggleWish(productId: string) {
        setWishedIdList((current) =>
            current.includes(productId)
                ? current.filter((id) => id !== productId)
                : [...current, productId],
        );
    }

    return (
        <CategoryTemplate
            intro={{
                title: "상품 목록",
                description: "원하는 상품을 찾아보세요.",
            }}
            filter={{
                title: "상세 검색",
                resetLabel: "필터 초기화",
                onReset: resetFilters,
                ...(slug === CATEGORY_ALL_SLUG
                    ? {
                          categoryLabel: "카테고리",
                          category: slug,
                          categoryOptions: [
                              { value: CATEGORY_ALL_SLUG, label: "전체" },
                              ...CATEGORY_LIST.map((item) => ({
                                  value: item.slug,
                                  label: item.label,
                              })),
                          ],
                          onCategoryChange: changeCategory,
                      }
                    : {}),
                countryLabel: "국가",
                country,
                countryOptions: [
                    { value: CATEGORY_FILTER_ALL, label: "전체" },
                    ...COUNTRY_LIST.map((item) => ({ value: item, label: item })),
                ],
                onCountryChange: changeCountry,
                statusLabel: "판매 상태",
                status,
                statusOptions: [
                    { value: CATEGORY_FILTER_ALL, label: "전체" },
                    { value: SALE_STATUS.ON_SALE, label: SALE_STATUS.ON_SALE },
                    { value: SALE_STATUS.RESERVED, label: SALE_STATUS.RESERVED },
                    { value: SALE_STATUS.SOLD, label: SALE_STATUS.SOLD },
                ],
                onStatusChange: changeStatus,
                priceLabel: "가격대",
                minPrice,
                maxPrice,
                priceActionLabel: "가격 적용",
                priceHint: "가격 입력 후 적용을 눌러주세요.",
                onMinPriceChange: setMinPrice,
                onMaxPriceChange: setMaxPrice,
                onApplyPrice: applyPrice,
            }}
            catalog={{
                label: "상품 목록",
                countLabel: `현재 ${filteredProducts.length}개 상품`,
                sort,
                sortOptions: [...SORT_OPTIONS],
                onSortChange: changeSort,
                products: visibleProducts.map((product) =>
                    toCatalogItem(product, wishedIds, locale),
                ),
                emptyLabel: translate(locale, "emptyProducts"),
                onToggleWish: toggleWish,
                page: currentPage,
                pageCount,
                onPageChange: setPage,
            }}
        />
    );
}
