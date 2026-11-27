import { SALE_STATUS, type Product, type SaleStatus } from "@/features/product/model/Product";

export const CATEGORY_PAGE_SIZE = 20;
export const CATEGORY_FILTER_ALL = "all";
export const CATEGORY_STATUS_OPEN = "open";

export const CATEGORY_SORT = {
    NEW: "new",
    LIKES: "likes",
    PRICE_ASC: "priceAsc",
    PRICE_DESC: "priceDesc",
} as const;

export type CategorySort = (typeof CATEGORY_SORT)[keyof typeof CATEGORY_SORT];

export type CategoryProductQuery = {
    categoryLabel?: string;
    country: string;
    status: string;
    minPrice?: number;
    maxPrice?: number;
    sort: CategorySort;
    wishedIds: ReadonlySet<string>;
};

function likeCount(product: Product, wishedIds: ReadonlySet<string>): number {
    return product.likes + (wishedIds.has(product.id) ? 1 : 0);
}

function matchesStatus(saleStatus: SaleStatus, status: string): boolean {
    if (status === CATEGORY_FILTER_ALL) {
        return true;
    }

    if (status === CATEGORY_STATUS_OPEN) {
        return saleStatus === SALE_STATUS.ON_SALE || saleStatus === SALE_STATUS.RESERVED;
    }

    return saleStatus === status;
}

function compareProduct(left: Product, right: Product, query: CategoryProductQuery): number {
    if (query.sort === CATEGORY_SORT.PRICE_ASC && left.price !== right.price) {
        return left.price - right.price;
    }

    if (query.sort === CATEGORY_SORT.PRICE_DESC && left.price !== right.price) {
        return right.price - left.price;
    }

    if (query.sort === CATEGORY_SORT.LIKES) {
        const likeGap = likeCount(right, query.wishedIds) - likeCount(left, query.wishedIds);

        if (likeGap !== 0) {
            return likeGap;
        }
    }

    return right.postedOrder - left.postedOrder;
}

export function getCategoryProductList(
    products: Product[],
    query: CategoryProductQuery,
): Product[] {
    return products
        .filter((product) => {
            if (query.categoryLabel && product.category !== query.categoryLabel) {
                return false;
            }

            if (query.country !== CATEGORY_FILTER_ALL && product.country !== query.country) {
                return false;
            }

            if (!matchesStatus(product.saleStatus, query.status)) {
                return false;
            }

            if (query.minPrice !== undefined && product.price < query.minPrice) {
                return false;
            }

            if (query.maxPrice !== undefined && product.price > query.maxPrice) {
                return false;
            }

            return true;
        })
        .sort((left, right) => compareProduct(left, right, query));
}
