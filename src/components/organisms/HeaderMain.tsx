import { Button } from "@/components/atoms/Button";
import { Logo } from "@/components/atoms/Logo";
import { IconButtonWithBadge } from "@/components/molecules/IconButtonWithBadge";
import { LanguageSelect } from "@/components/molecules/LanguageSelect";
import { SearchForm, type SearchSuggestion } from "@/components/molecules/SearchForm";
import { UserMenuButton } from "@/components/molecules/UserMenuButton";
import type { SelectOption } from "@/components/atoms/Select";

type HeaderMainBaseProps = {
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
    languageId: string;
    languageLabel: string;
    language: string;
    languageOptions: SelectOption[];
    onLanguageChange: (value: string) => void;
};

export type MemberHeaderActions = {
    account: "member";
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
};

export type GuestHeaderActions = {
    account: "guest";
    loginHref: string;
    loginLabel: string;
    signupHref: string;
    signupLabel: string;
};

export type HeaderAccountActions = MemberHeaderActions | GuestHeaderActions;

type HeaderMainProps = HeaderMainBaseProps & {
    accountActions: HeaderAccountActions;
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
    accountActions,
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
                <div className="ml-auto flex items-center gap-3">
                    {accountActions.account === "guest" ? (
                        <>
                            <Button href={accountActions.loginHref} variant="ghost">
                                {accountActions.loginLabel}
                            </Button>
                            <Button href={accountActions.signupHref}>
                                {accountActions.signupLabel}
                            </Button>
                        </>
                    ) : (
                        <>
                            <Button href={accountActions.sellHref}>
                                {accountActions.sellLabel}
                            </Button>
                            <IconButtonWithBadge
                                icon="bell"
                                count={accountActions.notificationCount}
                                label={accountActions.notificationLabel}
                                href={accountActions.notificationHref}
                                onClick={accountActions.onNotificationClick}
                            />
                            <IconButtonWithBadge
                                icon="chat"
                                count={accountActions.chatCount}
                                label={accountActions.chatLabel}
                                href={accountActions.chatHref}
                            />
                            <UserMenuButton
                                name={accountActions.userName}
                                onClick={accountActions.onUserMenuClick}
                            />
                        </>
                    )}
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
