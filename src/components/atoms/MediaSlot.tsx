import NextImage from "next/image";
import { Icon } from "@/components/atoms/Icon";

type MediaSlotProps = {
    id: string;
    alt: string;
    src?: string;
    badge?: string;
    actionLabel: string;
    countLabel?: string;
    accept?: string;
    required?: boolean;
    onSelectFile?: (file: File) => void;
};

const ACCEPT = ".png,.jpg,.jpeg,.mp4,.mov";

export function MediaSlot({
    id,
    alt,
    src,
    badge,
    actionLabel,
    countLabel,
    accept = ACCEPT,
    required = false,
    onSelectFile,
}: MediaSlotProps) {
    if (src) {
        return (
            <div className="relative aspect-[4/5] overflow-hidden rounded-2xl bg-[#FFFDF5]">
                <NextImage
                    src={src}
                    alt={alt}
                    fill
                    sizes="180px"
                    draggable={false}
                    unoptimized={src.startsWith("blob:")}
                    className="object-cover"
                />
                {badge ? (
                    <span className="absolute left-2 top-2 rounded-md bg-[#1C1917] /80 px-1.5 py-0.5 text-[10px] font-medium text-white">
                        {badge}
                    </span>
                ) : null}
            </div>
        );
    }

    return (
        <label
            htmlFor={id}
            className="flex aspect-[4/5] cursor-pointer flex-col items-center justify-center gap-1 rounded-2xl border border-dashed border-[#E7DFD6] bg-[#FFFDF5] px-3 text-center"
        >
            <Icon name="plus" className="h-5 w-5 text-[#8A8178]" />
            <span className="text-xs text-[#6F675F]">{actionLabel}</span>
            {countLabel ? <span className="text-[11px] text-[#B3A89F]">{countLabel}</span> : null}
            <input
                id={id}
                type="file"
                accept={accept}
                multiple
                required={required}
                className="sr-only"
                onChange={(event) => {
                    Array.from(event.target.files ?? []).forEach((file) => {
                        onSelectFile?.(file);
                    });

                    event.target.value = "";
                }}
            />
        </label>
    );
}
