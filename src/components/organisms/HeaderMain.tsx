import { Button } from "@/components/atoms/Button";
import { Logo } from "@/components/atoms/Logo";
import { IconButtonWithBadge } from "@/components/molecules/IconButtonWithBadge";
import { LanguageSelect } from "@/components/molecules/LanguageSelect";
import { SearchForm, type SearchSuggestion } from "@/components/molecules/SearchForm";
import { UserMenuButton } from "@/components/molecules/UserMenuButton";
import type { SelectOption } from "@/components/atoms/Select";

type HeaderMainProps = {
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
};

export function HeaderMain({
    searchLabel,
    searchValue,
    searchPlaceholder,
    desktopSearchId,
    mobileSearchId,
    onSearchChange,
    onSearchSubmit,
    suggestions,
    suggestionsOpen,
    suggestionEmptyLabel,
    onSelectSuggestion,
    sellHref,
    sellLabel,
    notificationLabel,
    notificationCount,
    notificationHref,
    onNotificationClick,
    chatLabel,
    chatCount,
    chatHref,
    userName,
    onUserMenuClick,
    languageId,
    languageLabel,
    language,
    languageOptions,
    onLanguageChange,
}: HeaderMainProps) {
    const searchFormProps = {
        label: searchLabel,
        value: searchValue,
        placeholder: searchPlaceholder,
        onChange: onSearchChange,
        onSubmit: onSearchSubmit,
        suggestions,
        suggestionsOpen,
        emptyLabel: suggestionEmptyLabel,
        onSelectSuggestion,
    };

    return (
        <div>
            <div className="flex h-16 items-center gap-2">
                <Logo />
                <div className="hidden min-w-0 max-w-xl flex-1 xl:block">
                    <SearchForm id={desktopSearchId} {...searchFormProps} />
                </div>
                <div className="ml-auto flex items-center gap-1">
                    <Button href={sellHref}>{sellLabel}</Button>
                    <IconButtonWithBadge
                        icon="bell"
                        count={notificationCount}
                        label={notificationLabel}
                        href={notificationHref}
                        onClick={onNotificationClick}
                    />
                    <IconButtonWithBadge
                        icon="chat"
                        count={chatCount}
                        label={chatLabel}
                        href={chatHref}
                    />
                    <UserMenuButton name={userName} onClick={onUserMenuClick} />
                    <LanguageSelect
                        id={languageId}
                        label={languageLabel}
                        value={language}
                        options={languageOptions}
                        onChange={onLanguageChange}
                    />
                </div>
            </div>
            <div className="pb-2 md:hidden">
                <SearchForm id={mobileSearchId} {...searchFormProps} />
            </div>
        </div>
    );
}
