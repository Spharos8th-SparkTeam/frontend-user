import type { ReactNode } from "react";
import { HeaderMain, type HeaderAccountActions } from "@/components/organisms/HeaderMain";
import type { SelectOption } from "@/components/atoms/Select";
import type { SearchSuggestion } from "@/components/molecules/SearchForm";

type HeaderProps = {
    searchLabel: string;
    searchValue: string;
    searchPlaceholder?: string;
    desktopSearchId: string;
    mobileSearchId: string;
    onSearchChange: (value: string) => void;
    onSearchSubmit: (value: string) => void;
    suggestions?: SearchSuggestion[];
    suggestionsOpen?: boolean;
    suggestionEmptyLabel?: string;
    onSelectSuggestion?: (id: string) => void;
    accountActions: HeaderAccountActions;
    languageId: string;
    languageLabel: string;
    language: string;
    languageOptions: SelectOption[];
    onLanguageChange: (value: string) => void;
    categoryNav: ReactNode;
};

export function Header({ categoryNav, ...main }: HeaderProps) {
    return (
        <header className="sticky top-0 z-40 border-b border-[#EFE6DC] bg-[#FFF9F4]/80 backdrop-blur-md">
            <div className="mx-auto max-w-7xl px-4 sm:px-6">
                <HeaderMain {...main} />
                {categoryNav}
            </div>
        </header>
    );
}
