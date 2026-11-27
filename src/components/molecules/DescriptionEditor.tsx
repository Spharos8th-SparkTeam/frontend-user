import { Text } from "@/components/atoms/Text";
import { Textarea } from "@/components/atoms/Textarea";
import { EditorToolbar, type EditorCommand } from "@/components/molecules/EditorToolbar";

type DescriptionEditorProps = {
    id: string;
    value: string;
    onChange: (value: string) => void;
    placeholder?: string;
    maxLength?: number;
    required?: boolean;
    blockLabel?: string;
    countSuffix?: string;
    onCommand?: (command: EditorCommand) => void;
};

function applyEditorCommand(
    value: string,
    command: EditorCommand,
    start: number,
    end: number,
): { nextValue: string; cursor: number } {
    const selected = value.slice(start, end);
    const lines = (selected || "").split("\n");
    let inserted = selected;

    if (command === "bold") {
        inserted = `**${selected}**`;
    } else if (command === "italic") {
        inserted = `*${selected}*`;
    } else if (command === "underline") {
        inserted = `<u>${selected}</u>`;
    } else if (command === "link") {
        inserted = `[${selected}](https://)`;
    } else if (command === "list") {
        inserted = lines.map((line) => (line.startsWith("- ") ? line : `- ${line}`)).join("\n");
    } else if (command === "listOrdered") {
        inserted = lines.map((line, index) => `${index + 1}. ${line}`).join("\n");
    }

    return {
        nextValue: `${value.slice(0, start)}${inserted}${value.slice(end)}`,
        cursor: start + inserted.length,
    };
}

export function DescriptionEditor({
    id,
    value,
    onChange,
    placeholder,
    maxLength,
    required = false,
    blockLabel = "본문",
    countSuffix = "자",
    onCommand,
}: DescriptionEditorProps) {
    function handleCommand(command: EditorCommand) {
        const field = document.getElementById(id);
        const start = field instanceof HTMLTextAreaElement ? field.selectionStart : value.length;
        const end = field instanceof HTMLTextAreaElement ? field.selectionEnd : value.length;
        const { nextValue, cursor } = applyEditorCommand(value, command, start, end);

        onChange(nextValue);
        onCommand?.(command);
        requestAnimationFrame(() => {
            const nextField = document.getElementById(id);

            if (!(nextField instanceof HTMLTextAreaElement)) {
                return;
            }

            nextField.focus();
            nextField.setSelectionRange(cursor, cursor);
        });
    }

    return (
        <div>
            <EditorToolbar blockLabel={blockLabel} onCommand={handleCommand} />
            <Textarea
                id={id}
                value={value}
                onChange={onChange}
                placeholder={placeholder}
                maxLength={maxLength}
                required={required}
                className="rounded-t-none"
            />
            <Text
                variant="catalog"
                className="mt-2 text-right font-normal normal-case tracking-normal"
            >
                {value.length}
                {countSuffix}
            </Text>
        </div>
    );
}
