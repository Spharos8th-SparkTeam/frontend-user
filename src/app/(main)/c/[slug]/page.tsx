import { Suspense } from "react";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { CategoryPage } from "@/components/pages/CategoryPage";
import { CATEGORY_SORT, type CategorySort } from "@/features/product/api/GetCategoryProductList";
import { getHomeCatalog } from "@/features/product/api/GetHomeProductList";
import { CATEGORY_ALL_SLUG, getCategoryBySlug } from "@/features/product/model/Product";

type CategoryRouteProps = {
    params: Promise<{ slug: string }>;
    searchParams: Promise<{ sort?: string | string[] }>;
};

function readCategorySort(value: string | string[] | undefined): CategorySort {
    const sort = Array.isArray(value) ? value[0] : value;

    if (
        sort === CATEGORY_SORT.NEW ||
        sort === CATEGORY_SORT.LIKES ||
        sort === CATEGORY_SORT.PRICE_ASC ||
        sort === CATEGORY_SORT.PRICE_DESC
    ) {
        return sort;
    }

    return CATEGORY_SORT.NEW;
}

export async function generateMetadata({ params }: CategoryRouteProps): Promise<Metadata> {
    const { slug } = await params;
    const category = getCategoryBySlug(slug);
    const title = !category
        ? "상품 목록"
        : category.slug === CATEGORY_ALL_SLUG
          ? "전체 상품"
          : category.label;

    return { title: `${title} · ReSpark` };
}

export default function Page({ params, searchParams }: CategoryRouteProps) {
    return (
        <Suspense>
            <CategoryRoute params={params} searchParams={searchParams} />
        </Suspense>
    );
}

async function CategoryRoute({ params, searchParams }: CategoryRouteProps) {
    const { slug } = await params;
    const { sort } = await searchParams;
    const category = getCategoryBySlug(slug);
    const initialSort = readCategorySort(sort);

    if (!category) {
        notFound();
    }

    return (
        <CategoryPage
            key={`${slug}-${initialSort}`}
            slug={category.slug}
            label={category.label}
            products={getHomeCatalog()}
            initialSort={initialSort}
        />
    );
}
