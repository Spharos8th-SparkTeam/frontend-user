import Link from "next/link";

export function Logo() {
    return (
        <Link href="/" className="flex items-center gap-2" aria-label="ReSpark 홈">
            <span className="text-xl font-bold leading-none tracking-wide text-[#BA5847]">ReSpark</span>
        </Link>
    );
}
