import type { Metadata } from "next";
import { SignUpPage } from "@/components/pages/SignUpPage";

export const metadata: Metadata = {
    title: "회원가입 · ReSpark",
};

export default function Page() {
    return <SignUpPage />;
}
