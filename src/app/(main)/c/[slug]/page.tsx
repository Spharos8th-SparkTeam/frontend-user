import { Suspense } from "react";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { CategoryPage } from "@/components/pages/CategoryPage";
import { getHomeCatalog } from "@/features/product/api/GetHomeProductList";
import { CATEGORY_ALL_SLUG, getCategoryBySlug } from "@/features/product/model/Product";

type CategoryRouteProps = {
    params: Promise<{ slug: string }>;
};

export async function generateMetadata({ params }: CategoryRouteProps): Promise<Metadata> {
    const { slug } = await params;
    const category = getCategoryBySlug(slug);
    const title = !category || category.slug === CATEGORY_ALL_SLUG ? "상품 목록" : category.label;

    return { title: `${title} · ReSpark` };
}

export default function Page({ params }: CategoryRouteProps) {
    return (
        <Suspense>
            <CategoryRoute params={params} />
        </Suspense>
    );
}

async function CategoryRoute({ params }: CategoryRouteProps) {
    const { slug } = await params;
    const category = getCategoryBySlug(slug);

    if (!category) {
        notFound();
    }

    return (
        <CategoryPage
            key={slug}
            slug={category.slug}
            label={category.label}
            products={getHomeCatalog()}
        />
    );
}
