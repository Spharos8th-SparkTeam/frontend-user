import { Button } from "@/components/atoms/Button";
import { Icon, type IconName } from "@/components/atoms/Icon";

export type EditorCommand = "bold" | "italic" | "underline" | "list" | "listOrdered" | "link";

const COMMAND_LIST: { command: EditorCommand; icon: IconName; label: string }[] = [
    { command: "bold", icon: "bold", label: "굵게" },
    { command: "italic", icon: "italic", label: "기울임" },
    { command: "underline", icon: "underline", label: "밑줄" },
    { command: "list", icon: "list", label: "글머리 목록" },
    { command: "listOrdered", icon: "listOrdered", label: "번호 목록" },
    { command: "link", icon: "link", label: "링크" },
];

type EditorToolbarProps = {
    blockLabel: string;
    onBlockClick?: () => void;
    onCommand?: (command: EditorCommand) => void;
};

export function EditorToolbar({ blockLabel, onBlockClick, onCommand }: EditorToolbarProps) {
    return (
        <div className="flex flex-wrap items-center gap-1 rounded-t-2xl border border-[#E7DFD6] bg-[#FFFDF5] px-2 py-1.5">
            <Button variant="ghost" onClick={onBlockClick} className="px-2 text-xs text-[#1C1917]">
                {blockLabel}
                <Icon name="arrow" className="h-3.5 w-3.5 rotate-90" />
            </Button>
            {COMMAND_LIST.map((item) => (
                <Button
                    key={item.command}
                    variant="ghost"
                    size="icon"
                    ariaLabel={item.label}
                    onClick={() => onCommand?.(item.command)}
                >
                    <Icon name={item.icon} className="h-4 w-4" />
                </Button>
            ))}
        </div>
    );
}
