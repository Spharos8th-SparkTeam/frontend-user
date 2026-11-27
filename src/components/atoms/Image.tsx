import NextImage from "next/image";

type ImageProps = {
    src: string;
    alt: string;
};

export function Image({ src, alt }: ImageProps) {
    return (
        <div className="relative aspect-square overflow-hidden rounded-[20px] bg-[#F4EFE9]">
            <NextImage src={src} alt={alt} fill sizes="220px" className="object-cover" />
        </div>
    );
}
