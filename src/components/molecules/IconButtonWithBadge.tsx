import { Badge } from "@/components/atoms/Badge";
import { Button } from "@/components/atoms/Button";
import { Icon, type IconName } from "@/components/atoms/Icon";

type IconButtonWithBadgeProps = {
    icon: Extract<IconName, "bell" | "chat">;
    count: number;
    label: string;
    href?: string;
    onClick?: () => void;
};

export function IconButtonWithBadge({ icon, count, label, href, onClick }: IconButtonWithBadgeProps) {
    const accessibleName = count > 0 ? `${label} ${count}` : label;

    return (
        <Button
            href={href}
            variant="ghost"
            size="icon"
            ariaLabel={accessibleName}
            onClick={onClick}
            className="relative"
        >
            <Icon name={icon} />
            {count > 0 ? (
                <span className="absolute -right-1 -top-1">
                    <Badge kind="count" count={count} />
                </span>
            ) : null}
        </Button>
    );
}
