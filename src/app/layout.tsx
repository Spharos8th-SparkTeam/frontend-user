import type { Metadata } from "next";
import { Noto_Sans_KR } from "next/font/google";
import "./globals.css";

const notoSans = Noto_Sans_KR({
    variable: "--font-noto",
    subsets: ["latin"],
    weight: ["400", "500", "700"],
});

export const metadata: Metadata = {
    title: "ReSpark",
    description: "작고 귀여운 것들의, 커다란 취향 세계.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
    return (
        <html lang="ko" className={`${notoSans.variable} h-full antialiased`}>
            <body className="flex min-h-full flex-col bg-[#FFF9F5] text-[#49382F]">{children}</body>
        </html>
    );
}
