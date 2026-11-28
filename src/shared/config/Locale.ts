export const LOCALE_LIST = [{ id: "ko", label: "한국어" }] as const;

export type LocaleId = (typeof LOCALE_LIST)[number]["id"];

type MessageKey =
    | "banner"
    | "roleGroup"
    | "roleBuyer"
    | "roleSeller"
    | "search"
    | "searchPlaceholder"
    | "empty"
    | "sell"
    | "login"
    | "signup"
    | "notification"
    | "chat"
    | "language"
    | "viewAll"
    | "popularTitle"
    | "popularLede"
    | "newTitle"
    | "newLede"
    | "emptyProducts"
    | "heroEyebrow"
    | "heroTitle"
    | "heroBody"
    | "orders"
    | "wishOn"
    | "wishOff"
    | "statusOnSale"
    | "statusReserved"
    | "statusSold"
    | "footerTagline"
    | "categoryNav"
    | "prohibited"
    | "guide"
    | "terms"
    | "privacy"
    | "youth"
    | "help";

const MESSAGE_MAP: Record<LocaleId, Record<MessageKey, string>> = {
    ko: {
        banner: "🛠️ 현재 프론트엔드 와이어프레임(더미 데이터 및 롤 시뮬레이션) 단계입니다",
        roleGroup: "거래 롤",
        roleBuyer: "구매자",
        roleSeller: "판매자",
        search: "상품 검색",
        searchPlaceholder: "상품명을 검색해보세요",
        empty: "찾는 매물이 없어요.",
        sell: "판매하기",
        login: "로그인",
        signup: "회원가입",
        notification: "알림",
        chat: "채팅",
        language: "언어",
        viewAll: "전체보기",
        popularTitle: "인기상품",
        popularLede: "찜이 많은 순이고, 같으면 조회수가 높은 순이에요.",
        newTitle: "신상품",
        newLede: "등록일이 최근인 순이에요.",
        emptyProducts: "보여줄 상품이 없어요.",
        heroEyebrow: "PREMIUM C2C",
        heroTitle: "좋아하는 것을, Spark.",
        heroBody: "당신의 취향이 머무는 곳.",
        orders: "구매/판매 내역",
        wishOn: "찜하기",
        wishOff: "찜 해제",
        statusOnSale: "판매중",
        statusReserved: "예약중",
        statusSold: "판매완료",
        footerTagline: "취향과 수집품이 머무는 프리미엄 C2C.",
        categoryNav: "카테고리",
        prohibited: "금지 품목",
        guide: "안내",
        terms: "이용약관",
        privacy: "개인정보처리방침",
        youth: "청소년보호정책",
        help: "고객센터",
    },
};

export function translate(locale: LocaleId, key: MessageKey): string {
    return MESSAGE_MAP[locale][key];
}
