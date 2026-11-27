import type { ReactNode } from "react";
import { MainTemplate } from "@/components/templates/MainTemplate";

export default function MainLayout({ children }: { children: ReactNode }) {
    return <MainTemplate>{children}</MainTemplate>;
}
