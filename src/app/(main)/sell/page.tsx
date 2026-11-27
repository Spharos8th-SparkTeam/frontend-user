import type { Metadata } from "next";
import { SellPage } from "@/components/pages/SellPage";

export const metadata: Metadata = {
    title: "상품 등록 · ReSpark",
};

export default function Page() {
    return <SellPage />;
}
