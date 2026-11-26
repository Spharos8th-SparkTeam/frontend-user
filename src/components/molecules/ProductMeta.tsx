import { Text } from "@/components/atoms/Text";

type ProductMetaProps = {
    category: string;
    country: string;
};

export function ProductMeta({ category, country }: ProductMetaProps) {
    return <Text variant="category">{`${category} · ${country}`}</Text>;
}
