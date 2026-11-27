import NextImage from "next/image";
import { Icon } from "@/components/atoms/Icon";
import { Text } from "@/components/atoms/Text";
import { CheckList } from "@/components/molecules/CheckList";
import { ProductMeta } from "@/components/molecules/ProductMeta";
import { Badge, type SaleBadgeStatus } from "@/components/atoms/Badge";

const STATUS_BY_LABEL: Record<string, SaleBadgeStatus> = {
    판매중: "onSale",
    예약중: "reserved",
    판매완료: "sold",
};

export type SellAsideProps = {
    previewTitle: string;
    previewHint: string;
    imageSrc?: string;
    imageAlt: string;
    category: string;
    country: string;
    title: string;
    titlePlaceholder: string;
    price: string;
    statusLabel: string;
    noticeTitle: string;
    noticeItems: string[];
    guideHref?: string;
    guideLabel?: string;
};

export function SellAside({
    previewTitle,
    previewHint,
    imageSrc,
    imageAlt,
    category,
    country,
    title,
    titlePlaceholder,
    price,
    statusLabel,
    noticeTitle,
    noticeItems,
    guideHref,
    guideLabel,
}: SellAsideProps) {
    return (
        <aside className="space-y-6">
            <section className="rounded-[28px] bg-white p-5 shadow-[0_10px_30px_rgba(90,60,30,0.04)]">
                <h2 className="text-base font-semibold text-[#1C1917]">{previewTitle}</h2>
                <Text variant="catalog" className="mt-1 font-normal normal-case tracking-normal">
                    {previewHint}
                </Text>
                <div className="mt-4 rounded-2xl p-3">
                    <div className="relative aspect-[4/5] overflow-hidden rounded-2xl bg-[#F4EFE9]">
                        {imageSrc ? (
                            <NextImage
                                src={imageSrc}
                                alt={imageAlt}
                                fill
                                sizes="240px"
                                unoptimized={imageSrc.startsWith("blob:")}
                                className="object-cover"
                            />
                        ) : null}
                        <span className="absolute right-2 top-2 flex h-8 w-8 items-center justify-center rounded-full bg-white/90 text-[#8A8178]">
                            <Icon name="heart" className="h-4 w-4" />
                        </span>
                    </div>
                    {category && country ? (
                        <div className="mt-3">
                            <ProductMeta category={category} country={country} />
                        </div>
                    ) : null}
                    <p
                        className={`mt-1 text-sm font-medium leading-5 ${
                            title ? "text-[#1C1917]" : "text-[#B3A89F]"
                        }`}
                    >
                        {title || titlePlaceholder}
                    </p>
                    <div className="mt-2 flex items-center justify-between">
                        <p className="text-lg font-semibold text-[#1C1917]">{price}</p>
                        <Badge
                            kind="status"
                            status={STATUS_BY_LABEL[statusLabel] ?? "onSale"}
                            label={statusLabel}
                        />
                    </div>
                </div>
            </section>
            <CheckList
                title={noticeTitle}
                items={noticeItems}
                guideHref={guideHref}
                guideLabel={guideLabel}
            />
        </aside>
    );
}
