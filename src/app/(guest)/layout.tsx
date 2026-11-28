import type { ReactNode } from "react";
import { MainTemplate } from "@/components/templates/MainTemplate";

export default function GuestLayout({ children }: { children: ReactNode }) {
    return <MainTemplate account="guest">{children}</MainTemplate>;
}
