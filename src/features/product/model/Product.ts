export const SALE_STATUS = {
    ON_SALE: "판매중",
    RESERVED: "예약중",
    SOLD: "판매완료",
} as const;

export type SaleStatus = (typeof SALE_STATUS)[keyof typeof SALE_STATUS];

export type Product = {
    id: string;
    title: string;
    imageUrl: string;
    category: string;
    country: string;
    price: number;
    condition: string;
    saleStatus: SaleStatus;
    description: string;
    likes: number;
    postedOrder: number;
};

export const CATEGORY_LIST = [
    { slug: "figure", label: "피규어/프라모델" },
    { slug: "tcg", label: "TCG" },
    { slug: "lego", label: "레고" },
    { slug: "art-toy", label: "아트토이" },
    { slug: "doll", label: "인형" },
    { slug: "fidget", label: "스퀴시/피젯토이" },
] as const;

export const HOME_PRODUCT_LIMIT = 5;
export const CATEGORY_ALL_SLUG = "all";

export function getCategoryBySlug(slug: string): { slug: string; label: string } | undefined {
    if (slug === CATEGORY_ALL_SLUG) {
        return { slug: CATEGORY_ALL_SLUG, label: "전체" };
    }

    return CATEGORY_LIST.find((item) => item.slug === slug);
}

export function formatUsd(amount: number): string {
    const rounded = Math.round(amount * 100) / 100;
    const hasFraction = Math.abs(rounded % 1) > 0.001;

    return new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD",
        minimumFractionDigits: hasFraction ? 2 : 0,
        maximumFractionDigits: 2,
    }).format(rounded);
}

export function getCategoryHref(label: string): string {
    const category = CATEGORY_LIST.find((item) => item.label === label);

    return `/c/${category?.slug ?? "tcg"}`;
}
