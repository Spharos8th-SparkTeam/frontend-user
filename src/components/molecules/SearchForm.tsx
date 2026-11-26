import { Button } from "@/components/atoms/Button";
import { Icon } from "@/components/atoms/Icon";
import { Input } from "@/components/atoms/Input";
import { Label } from "@/components/atoms/Label";

export type SearchSuggestion = {
    id: string;
    title: string;
    priceLabel: string;
};

type SearchFormProps = {
    id: string;
    label: string;
    value: string;
    placeholder?: string;
    suggestions?: SearchSuggestion[];
    suggestionsOpen?: boolean;
    emptyLabel?: string;
    onChange: (value: string) => void;
    onSubmit: (value: string) => void;
    onSelectSuggestion?: (id: string) => void;
};

export function SearchForm({
    id,
    label,
    value,
    placeholder,
    suggestions = [],
    suggestionsOpen = false,
    emptyLabel = "",
    onChange,
    onSubmit,
    onSelectSuggestion,
}: SearchFormProps) {
    return (
        <form
            role="search"
            className="relative"
            onSubmit={(event) => {
                event.preventDefault();
                onSubmit(value);
            }}
        >
            <Label htmlFor={id} visuallyHidden>
                {label}
            </Label>
            <Input
                id={id}
                type="search"
                value={value}
                placeholder={placeholder}
                onChange={onChange}
                className="ml-5"
            />
            <div className="absolute left-8 top-1/2 -translate-y-1/2">
                <Button type="submit" variant="ghost" size="icon" ariaLabel={label}>
                    <Icon name="search" />
                </Button>
            </div>
            {/* {suggestionsOpen && value.trim() ? (
                <div className="absolute left-0 right-0 top-[calc(100%+8px)] z-50 overflow-hidden rounded-3xl border border-[#EFE6DC] bg-white shadow-[0_16px_40px_rgba(70,40,20,0.08)]">
                    {suggestions.length === 0 ? (
                        <p className="px-4 py-4 text-sm text-[#8A8178]">{emptyLabel}</p>
                    ) : (
                        <ul>
                            {suggestions.map((suggestion) => (
                                <li key={suggestion.id}>
                                    <button
                                        type="button"
                                        onClick={() => onSelectSuggestion?.(suggestion.id)}
                                        className="flex w-full items-center justify-between gap-3 px-4 py-3 text-left hover:bg-[#FBF7F3]"
                                    >
                                        <span className="line-clamp-1 text-sm text-[#1C1917]">{suggestion.title}</span>
                                        <span className="shrink-0 text-sm font-medium text-[#1C1917]">
                                            {suggestion.priceLabel}
                                        </span>
                                    </button>
                                </li>
                            ))}
                        </ul>
                    )}
                </div>
            ) : null} */}
        </form>
    );
}
