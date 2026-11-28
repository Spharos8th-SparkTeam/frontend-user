import {
    Bell,
    Bold,
    Check,
    ChevronRight,
    Globe,
    Heart,
    Italic,
    Link2,
    List,
    ListOrdered,
    MessageCircle,
    Plus,
    Search,
    Underline,
    type LucideIcon,
} from "lucide-react";

const ICON_MAP = {
    check: Check,
    search: Search,
    bell: Bell,
    chat: MessageCircle,
    heart: Heart,
    arrow: ChevronRight,
    language: Globe,
    plus: Plus,
    bold: Bold,
    italic: Italic,
    underline: Underline,
    list: List,
    listOrdered: ListOrdered,
    link: Link2,
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
