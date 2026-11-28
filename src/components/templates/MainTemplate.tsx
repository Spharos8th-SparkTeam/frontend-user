"use client";

import { createContext, Suspense, useContext, useMemo, useState, type ReactNode } from "react";
import { usePathname, useRouter } from "next/navigation";
import { Footer } from "@/components/organisms/Footer";
import { Header } from "@/components/organisms/Header";
import { LoginRequiredDialog } from "@/components/organisms/LoginRequiredDialog";
import type { HeaderAccountActions } from "@/components/organisms/HeaderMain";
import { CategoryNav } from "@/components/organisms/CategoryNav";
import { isMemberOnlyPath } from "@/features/auth/model/MemberPath";
import { useMemberSession } from "@/features/auth/model/MemberSession";
import { searchProductSuggestionList } from "@/features/product/api/GetHomeProductList";
import {
    CATEGORY_ALL_SLUG,
    CATEGORY_LIST,
    formatUsd,
    getCategoryHref,
} from "@/features/product/model/Product";
import { LOCALE_LIST, translate, type LocaleId } from "@/shared/config/Locale";

const PageLocaleContext = createContext<LocaleId>("ko");

export function usePageLocale(): LocaleId {
    return useContext(PageLocaleContext);
}

type MainTemplateProps = {
    children: ReactNode;
};

function MemberAccessGate({ children }: { children: ReactNode }) {
    const pathname = usePathname();
    const router = useRouter();
    const { member } = useMemberSession();
    const memberOnly = isMemberOnlyPath(pathname);

    if (memberOnly && !member) {
        return (
            <LoginRequiredDialog
                message="로그인이 필요한 서비스입니다."
                cancelLabel="취소"
                confirmLabel="확인"
                onCancel={() => {
                    if (window.history.length > 1) {
                        router.back();
                        return;
                    }

                    router.push("/");
                }}
                onConfirm={() => {
                    router.push(`/login?next=${encodeURIComponent(pathname)}`);
                }}
            />
        );
    }

    return children;
}

function CategoryLinks({ label, pathname }: { label: string; pathname?: string }) {
    return (
        <CategoryNav
            label={label}
            categories={[
                {
                    href: `/c/${CATEGORY_ALL_SLUG}`,
                    label: "전체 상품",
                    current: pathname === `/c/${CATEGORY_ALL_SLUG}`,
                },
                ...CATEGORY_LIST.map((category) => {
                    const href = getCategoryHref(category.label);

                    return { href, label: category.label, current: pathname === href };
                }),
            ]}
        />
    );
}

function CurrentCategoryLinks({ label }: { label: string }) {
    const pathname = usePathname();

    return <CategoryLinks label={label} pathname={pathname} />;
}

export function MainTemplate({ children }: MainTemplateProps) {
    const router = useRouter();
    const { member, logout } = useMemberSession();
    const [locale, setLocale] = useState<LocaleId>("ko");
    const [query, setQuery] = useState("");
    const [suggestionsOpen, setSuggestionsOpen] = useState(false);
    const suggestions = useMemo(
        () =>
            searchProductSuggestionList(query).map((product) => ({
                id: product.id,
                title: product.title,
                priceLabel: formatUsd(product.price),
            })),
        [query],
    );

    function submitSearch(nextQuery: string) {
        const keyword = nextQuery.trim();

        if (!keyword) {
            return;
        }

        setSuggestionsOpen(false);
        router.push(`/search?q=${encodeURIComponent(keyword)}`);
    }

    function selectSuggestion(productId: string) {
        setSuggestionsOpen(false);
        router.push(`/products/${productId}`);
    }

    const accountActions: HeaderAccountActions = member
        ? {
              account: "member",
              sellHref: "/sell",
              sellLabel: translate(locale, "sell"),
              notificationLabel: translate(locale, "notification"),
              notificationCount: 3,
              notificationHref: "/mypage/notifications",
              chatLabel: translate(locale, "chat"),
              chatCount: 7,
              chatHref: "/chat",
              userName: member.name,
              onUserMenuClick: () => router.push("/mypage"),
              logoutLabel: translate(locale, "logout"),
              onLogout: () => {
                  logout();
                  router.push("/");
              },
          }
        : {
              account: "guest",
              loginHref: "/login",
              loginLabel: translate(locale, "login"),
              signupHref: "/signup",
              signupLabel: translate(locale, "signup"),
          };

    return (
        <PageLocaleContext.Provider value={locale}>
            <div className="flex min-h-full flex-col bg-[#FFF9F4] text-[#1C1917]">
                <Header
                    searchLabel={translate(locale, "search")}
                    searchValue={query}
                    searchPlaceholder={translate(locale, "searchPlaceholder")}
                    desktopSearchId="home-search-desktop"
                    mobileSearchId="home-search-mobile"
                    onSearchChange={(nextQuery) => {
                        setQuery(nextQuery);
                        setSuggestionsOpen(true);
                    }}
                    onSearchSubmit={submitSearch}
                    suggestions={suggestions}
                    suggestionsOpen={suggestionsOpen}
                    suggestionEmptyLabel={translate(locale, "empty")}
                    onSelectSuggestion={selectSuggestion}
                    accountActions={accountActions}
                    languageId="home-language"
                    languageLabel={translate(locale, "language")}
                    language={locale}
                    languageOptions={LOCALE_LIST.map((item) => ({
                        value: item.id,
                        label: item.label,
                    }))}
                    onLanguageChange={(value) => setLocale(value as LocaleId)}
                    categoryNav={
                        <Suspense
                            fallback={<CategoryLinks label={translate(locale, "categoryNav")} />}
                        >
                            <CurrentCategoryLinks label={translate(locale, "categoryNav")} />
                        </Suspense>
                    }
                />
                <main className="mx-auto flex w-full max-w-6xl flex-1 flex-col gap-16 px-4 pb-20 sm:px-6">
                    <Suspense fallback={children}>
                        <MemberAccessGate>{children}</MemberAccessGate>
                    </Suspense>
                </main>
                <Footer
                    description={translate(locale, "footerTagline")}
                    groups={[
                        {
                            title: translate(locale, "categoryNav"),
                            links: [
                                ...CATEGORY_LIST.map((category) => ({
                                    href: getCategoryHref(category.label),
                                    label: category.label,
                                })),
                            ],
                        },
                        {
                            title: translate(locale, "guide"),
                            links: [
                                { href: "/legal/terms", label: translate(locale, "terms") },
                                { href: "/legal/privacy", label: translate(locale, "privacy") },
                                { href: "/legal/youth", label: translate(locale, "youth") },
                                // { href: "/membership", label: "Spark VIP" },
                                // { href: "/orders", label: translate(locale, "orders") },
                            ],
                        },
                    ]}
                    supportTitle={translate(locale, "help")}
                    supportLinks={[
                        { href: "/support", label: "고객센터" },
                        { href: "/support/faqs", label: "FAQ" },
                        { href: "/support/notices", label: "공지사항" },
                        { href: "/support/inquiries", label: "문의하기" },
                        { href: "/support/events", label: "이벤트" },
                    ]}
                    hours="평일 10:00–18:00"
                    email="help@spark.market"
                    companyLines={[
                        "주식회사 스파크랩 · 대표 여도원 · 부산 동구 초량중로 29 한국방송통신전파진흥원 부산본부 3층",
                        "사업자등록번호 123-45-67890 · 통신판매업 2026-부산동구-0123",
                        "© 2026 ReSpark. 수집의 설렘을 환하게.",
                    ]}
                />
            </div>
        </PageLocaleContext.Provider>
    );
}
