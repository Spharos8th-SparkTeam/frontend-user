import { useState } from "react";
import { Text } from "@/components/atoms/Text";
import { MediaSlot } from "@/components/atoms/MediaSlot";
import { FormField } from "@/components/molecules/FormField";
import { InlineLink } from "@/components/molecules/InlineLink";

export type SellMediaItem = {
    id: string;
    src: string;
    alt: string;
    video?: boolean;
};

type MediaUploaderProps = {
    id: string;
    label: string;
    hint: string;
    note: string;
    actionLabel: string;
    representativeBadge: string;
    prohibitedHref: string;
    prohibitedLabel: string;
    media: SellMediaItem[];
    mediaLimit?: number;
    onSelectFile: (file: File) => void;
    onMoveMedia: (fromIndex: number, toIndex: number) => void;
};

export function MediaUploader({
    id,
    label,
    hint,
    note,
    actionLabel,
    representativeBadge,
    prohibitedHref,
    prohibitedLabel,
    media,
    mediaLimit = 10,
    onSelectFile,
    onMoveMedia,
}: MediaUploaderProps) {
    const [overIndex, setOverIndex] = useState<number | null>(null);
    const canAdd = media.length < mediaLimit;
    const representativeIndex = media.findIndex((item) => !item.video);

    return (
        <FormField id={id} label={label} required hint={hint}>
            <div className="flex flex-wrap gap-3">
                {media.map((item, index) => (
                    <div
                        key={item.id}
                        className={`w-28 sm:w-32 ${
                            overIndex === index ? "rounded-2xl ring-2 ring-[#E08B78]" : ""
                        } ${item.video ? "" : "cursor-grab active:cursor-grabbing"}`}
                        draggable={!item.video}
                        onDragStart={(event) => {
                            if (item.video) {
                                event.preventDefault();
                                return;
                            }

                            event.dataTransfer.setData("text/plain", String(index));
                            event.dataTransfer.effectAllowed = "move";
                        }}
                        onDragOver={(event) => {
                            event.preventDefault();
                            setOverIndex(index);
                        }}
                        onDragLeave={() => {
                            setOverIndex((current) => (current === index ? null : current));
                        }}
                        onDrop={(event) => {
                            event.preventDefault();
                            setOverIndex(null);
                            const rawIndex = event.dataTransfer.getData("text/plain");
                            const fromIndex = Number(rawIndex);

                            if (rawIndex === "" || Number.isNaN(fromIndex)) {
                                return;
                            }

                            onMoveMedia(fromIndex, index);
                        }}
                    >
                        <MediaSlot
                            id={`${id}-${item.id}`}
                            src={item.src}
                            alt={item.alt}
                            badge={index === representativeIndex ? representativeBadge : undefined}
                            actionLabel={actionLabel}
                        />
                    </div>
                ))}
                {canAdd ? (
                    <div className="w-28 sm:w-32">
                        <MediaSlot
                            id={id}
                            alt={actionLabel}
                            actionLabel={actionLabel}
                            countLabel={`${media.length}/${mediaLimit}`}
                            required={media.length === 0}
                            onSelectFile={onSelectFile}
                        />
                    </div>
                ) : null}
            </div>
            <div className="mt-3 flex flex-wrap items-center justify-between gap-2">
                <Text variant="catalog" className="font-normal normal-case tracking-normal">
                    {note}
                </Text>
                <InlineLink href={prohibitedHref}>{prohibitedLabel}</InlineLink>
            </div>
        </FormField>
    );
}
