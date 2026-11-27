import { CategoryCatalog, type CategoryCatalogProps } from "@/components/organisms/CategoryCatalog";
import { CategoryFilter, type CategoryFilterProps } from "@/components/organisms/CategoryFilter";
import { CategoryIntro, type CategoryIntroProps } from "@/components/organisms/CategoryIntro";

type CategoryTemplateProps = {
    intro: CategoryIntroProps;
    filter: CategoryFilterProps;
    catalog: CategoryCatalogProps;
};

export function CategoryTemplate({ intro, filter, catalog }: CategoryTemplateProps) {
    return (
        <div className="flex flex-col gap-8 pt-8">
            <CategoryIntro {...intro} />
            <CategoryFilter {...filter} />
            <CategoryCatalog {...catalog} />
        </div>
    );
}
