import { CategoryNav, type CategoryNavItem } from "@/components/organisms/CategoryNav";
import { HeaderMain } from "@/components/organisms/HeaderMain";
import type { SelectOption } from "@/components/atoms/Select";
import type { SearchSuggestion } from "@/components/molecules/SearchForm";

type HeaderProps = {
    bannerMessage: string;
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
    sellHref: string;
    sellLabel: string;
    notificationLabel: string;
    notificationCount: number;
    notificationHref?: string;
    onNotificationClick?: () => void;
    chatLabel: string;
    chatCount: number;
    chatHref: string;
    userName: string;
    onUserMenuClick?: () => void;
    languageId: string;
    languageLabel: string;
    language: string;
    languageOptions: SelectOption[];
    onLanguageChange: (value: string) => void;
    categoryLabel: string;
    categories: CategoryNavItem[];
};

export function Header({
    bannerMessage,
    categoryLabel,
    categories,
    ...main
}: HeaderProps) {
    return (
        <header className="sticky top-0 z-40 border-b border-[#EFE6DC] bg-[#FFF9F4]/80 backdrop-blur-md">
            <div className="mx-auto max-w-7xl px-4 sm:px-6">
                <HeaderMain {...main} />
                <CategoryNav label={categoryLabel} categories={categories} />
            </div>
        </header>
    );
}
