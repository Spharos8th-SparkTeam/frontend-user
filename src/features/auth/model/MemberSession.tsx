"use client";

import { createContext, useContext, useMemo, useSyncExternalStore, type ReactNode } from "react";
import type { SocialProvider } from "@/components/molecules/SocialAuthGroup";
import { TEST_ACCOUNT } from "@/features/auth/model/TestAccount";

const SESSION_KEY = "respark-member";

export type MemberProfile = {
    email: string;
    name: string;
};

type MemberSessionValue = {
    member: MemberProfile | null;
    login: (email: string, password: string) => boolean;
    loginWithSocial: (provider: SocialProvider) => void;
    logout: () => void;
};

const MemberSessionContext = createContext<MemberSessionValue | null>(null);
const listeners = new Set<() => void>();

let cachedRaw: string | null = null;
let cachedMember: MemberProfile | null = null;
let cacheValid = false;

function emitMemberChange() {
    listeners.forEach((listener) => listener());
}

function subscribeMember(onStoreChange: () => void) {
    listeners.add(onStoreChange);
    window.addEventListener("storage", onStoreChange);

    return () => {
        listeners.delete(onStoreChange);
        window.removeEventListener("storage", onStoreChange);
    };
}

function parseMember(raw: string | null): MemberProfile | null {
    if (!raw) {
        return null;
    }

    try {
        const parsed = JSON.parse(raw) as Partial<MemberProfile>;

        if (parsed.email === TEST_ACCOUNT.email && parsed.name === TEST_ACCOUNT.name) {
            return { email: parsed.email, name: parsed.name };
        }
    } catch {
        return null;
    }

    return null;
}

function getMemberSnapshot(): MemberProfile | null {
    const raw = window.localStorage.getItem(SESSION_KEY);

    if (cacheValid && raw === cachedRaw) {
        return cachedMember;
    }

    cachedRaw = raw;
    cachedMember = parseMember(raw);
    cacheValid = true;
    return cachedMember;
}

function getServerMemberSnapshot(): MemberProfile | null {
    return null;
}

const SOCIAL_PROVIDER_CODE = {
    line: "LINE",
    google: "GOOGLE",
    x: "X",
    apple: "APPLE",
} as const;

function saveMember(member: MemberProfile) {
    window.localStorage.setItem(SESSION_KEY, JSON.stringify(member));
    cacheValid = false;
    emitMemberChange();
}

export function loginMember(email: string, password: string): boolean {
    if (email !== TEST_ACCOUNT.email || password !== TEST_ACCOUNT.password) {
        return false;
    }

    saveMember({ email: TEST_ACCOUNT.email, name: TEST_ACCOUNT.name });
    return true;
}

// POST /api/v1/auth/social/login 이 열리기 전까지 테스트 회원으로 세션을 만든다.
export function loginWithSocial(provider: SocialProvider) {
    const request = {
        provider: SOCIAL_PROVIDER_CODE[provider],
        providerUserId: `mock-${provider}`,
    };

    if (!request.provider || !request.providerUserId) {
        return;
    }

    saveMember({ email: TEST_ACCOUNT.email, name: TEST_ACCOUNT.name });
}

export function logoutMember() {
    window.localStorage.removeItem(SESSION_KEY);
    cacheValid = false;
    emitMemberChange();
}

export function MemberSessionProvider({ children }: { children: ReactNode }) {
    const member = useSyncExternalStore(
        subscribeMember,
        getMemberSnapshot,
        getServerMemberSnapshot,
    );
    const value = useMemo(
        () => ({
            member,
            login: loginMember,
            loginWithSocial,
            logout: logoutMember,
        }),
        [member],
    );

    return <MemberSessionContext.Provider value={value}>{children}</MemberSessionContext.Provider>;
}

export function useMemberSession(): MemberSessionValue {
    const value = useContext(MemberSessionContext);

    if (!value) {
        throw new Error("MemberSessionProvider가 없습니다.");
    }

    return value;
}
