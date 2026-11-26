import { Bell, ChevronRight, Heart, MessageCircle, Search, type LucideIcon } from "lucide-react";

const ICON_MAP = {
    search: Search,
    bell: Bell,
    chat: MessageCircle,
    heart: Heart,
    arrow: ChevronRight,
} as const satisfies Record<string, LucideIcon>;

export type IconName = keyof typeof ICON_MAP;

type IconProps = {
    name: IconName;
    filled?: boolean;
    className?: string;
};

export function Icon({ name, filled = false, className = "h-5 w-5" }: IconProps) {
    const Lucide = ICON_MAP[name];
    const heartFilled = name === "heart" && filled;

    return (
        <Lucide
            className={className}
            aria-hidden="true"
            fill={heartFilled ? "currentColor" : "none"}
        />
    );
}
