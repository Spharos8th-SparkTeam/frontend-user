import { Suspense } from "react";
import type { Metadata } from "next";
import { LoginPage } from "@/components/pages/LoginPage";

export const metadata: Metadata = {
    title: "로그인 · ReSpark",
};

export default function Page() {
    return (
        <Suspense>
            <LoginPage />
        </Suspense>
    );
}
