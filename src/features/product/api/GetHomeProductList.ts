import { HOME_PRODUCT_LIMIT, SALE_STATUS, type Product } from "../model/Product";
import { PRODUCT_MOCK_LIST } from "../mocks/ProductMock";

function getViewCount(productId: string): number {
    let hash = 0;

    for (let index = 0; index < productId.length; index += 1) {
        hash = (Math.imul(33, hash) + productId.charCodeAt(index)) >>> 0;
    }

    return 80 + (hash % 4200);
}

function getEffectiveLikeCount(product: Product, wishedIds: ReadonlySet<string>): number {
    return product.likes + (wishedIds.has(product.id) ? 1 : 0);
}

function compareByPopularity(left: Product, right: Product, wishedIds: ReadonlySet<string>): number {
    const likeGap = getEffectiveLikeCount(right, wishedIds) - getEffectiveLikeCount(left, wishedIds);

    if (likeGap !== 0) {
        return likeGap;
    }

    const viewGap = getViewCount(right.id) - getViewCount(left.id);

    if (viewGap !== 0) {
        return viewGap;
    }

    return right.postedOrder - left.postedOrder;
}

export function getHomeCatalog(): Product[] {
    return PRODUCT_MOCK_LIST;
}

export function getPopularProductList(products: Product[], wishedIds: ReadonlySet<string>): Product[] {
    return products
        .filter((product) => product.saleStatus !== SALE_STATUS.SOLD)
        .sort((left, right) => compareByPopularity(left, right, wishedIds))
        .slice(0, HOME_PRODUCT_LIMIT);
}

export function getNewProductList(products: Product[]): Product[] {
    return products
        .filter((product) => product.saleStatus !== SALE_STATUS.SOLD)
        .sort((left, right) => right.postedOrder - left.postedOrder)
        .slice(0, HOME_PRODUCT_LIMIT);
}

export function searchProductSuggestionList(keyword: string): Product[] {
    const query = keyword.trim().toLowerCase();

    if (!query) {
        return [];
    }

    return PRODUCT_MOCK_LIST.filter((product) => {
        const haystack = `${product.title} ${product.category} ${product.country} ${product.condition}`;

        return haystack.toLowerCase().includes(query);
    }).slice(0, 6);
}

export function getVisibleLikeCount(product: Product, wished: boolean): number {
    return product.likes + (wished ? 1 : 0);
}
