import { Avatar } from "@/components/atoms/Avatar";
import { Button } from "@/components/atoms/Button";

type UserMenuButtonProps = {
    name: string;
    onClick?: () => void;
};

export function UserMenuButton({ name, onClick }: UserMenuButtonProps) {
    return (
        <Button variant="ghost" ariaLabel={`${name} 메뉴`} onClick={onClick} className="gap-3">
            <Avatar initial={name} />
            <span className="text-sm font-medium text-slate-900">{name}</span>
        </Button>
    );
}
