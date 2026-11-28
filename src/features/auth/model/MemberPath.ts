// 요구사항 정의서의 회원 전용 화면 중 헤더와 상품 등록이 쓰는 경로
const MEMBER_ONLY_PREFIXES = ["/sell", "/chat", "/mypage"] as const;

export function isMemberOnlyPath(pathname: string): boolean {
    return MEMBER_ONLY_PREFIXES.some(
        (prefix) => pathname === prefix || pathname.startsWith(`${prefix}/`),
    );
}

export function readNextPath(value: string | null): string {
    if (!value || !value.startsWith("/") || value.startsWith("//")) {
        return "/";
    }

    return value;
}
