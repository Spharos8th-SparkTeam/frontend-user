export const LOCALE_LIST = [
    { id: "ko", label: "한국어" },
    { id: "en", label: "English" },
    { id: "ja", label: "日本語" },
    { id: "zh", label: "中文" },
    { id: "de", label: "Deutsch" },
    { id: "cs", label: "Čeština" },
] as const;

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
        searchPlaceholder: "피규어, 레고, PSA10",
        empty: "찾는 매물이 없어요.",
        sell: "판매하기",
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
    en: {
        banner: "🛠️ Frontend wireframe (dummy data and role simulation)",
        roleGroup: "Trade role",
        roleBuyer: "Buyer",
        roleSeller: "Seller",
        search: "Search products",
        searchPlaceholder: "Figure, LEGO, PSA10",
        empty: "No matching listings.",
        sell: "Sell",
        notification: "Alerts",
        chat: "Chat",
        language: "Language",
        viewAll: "View all",
        popularTitle: "Popular",
        popularLede: "Most wished, then most viewed.",
        newTitle: "New",
        newLede: "Most recently listed.",
        emptyProducts: "Nothing to show.",
        heroEyebrow: "PREMIUM C2C",
        heroTitle: "What you love, Spark.",
        heroBody: "Where your taste stays.",
        orders: "Orders",
        wishOn: "Save",
        wishOff: "Saved",
        statusOnSale: "For sale",
        statusReserved: "Reserved",
        statusSold: "Sold",
        footerTagline: "A premium C2C for taste and collectibles.",
        categoryNav: "Categories",
        prohibited: "Prohibited items",
        guide: "Info",
        terms: "Terms",
        privacy: "Privacy",
        youth: "Youth protection",
        help: "Support",
    },
    ja: {
        banner: "🛠️ フロントのワイヤーフレーム（ダミーデータとロールシミュレーション）です",
        roleGroup: "取引ロール",
        roleBuyer: "購入者",
        roleSeller: "出品者",
        search: "商品検索",
        searchPlaceholder: "フィギュア、レゴ、PSA10",
        empty: "該当する出品がありません。",
        sell: "出品",
        notification: "通知",
        chat: "チャット",
        language: "言語",
        viewAll: "すべて見る",
        popularTitle: "人気商品",
        popularLede: "ウィッシュが多い順、同じなら閲覧が多い順です。",
        newTitle: "新着",
        newLede: "登録が新しい順です。",
        emptyProducts: "表示できる商品がありません。",
        heroEyebrow: "PREMIUM C2C",
        heroTitle: "好きなものを、Spark.",
        heroBody: "あなたの趣味がとどまる場所。",
        orders: "取引履歴",
        wishOn: "ウィッシュ",
        wishOff: "解除",
        statusOnSale: "販売中",
        statusReserved: "予約中",
        statusSold: "売却済み",
        footerTagline: "趣味とコレクションが集まるプレミアムC2C。",
        categoryNav: "カテゴリ",
        prohibited: "禁止品目",
        guide: "案内",
        terms: "利用規約",
        privacy: "プライバシー",
        youth: "青少年保護",
        help: "サポート",
    },
    zh: {
        banner: "🛠️ 当前为前端线框阶段（虚拟数据与角色模拟）",
        roleGroup: "交易角色",
        roleBuyer: "买家",
        roleSeller: "卖家",
        search: "搜索商品",
        searchPlaceholder: "手办、乐高、PSA10",
        empty: "没有符合的商品。",
        sell: "出售",
        notification: "通知",
        chat: "聊天",
        language: "语言",
        viewAll: "查看全部",
        popularTitle: "人气商品",
        popularLede: "按收藏数，相同则按浏览数。",
        newTitle: "新上架",
        newLede: "按最近登记。",
        emptyProducts: "没有可显示的商品。",
        heroEyebrow: "PREMIUM C2C",
        heroTitle: "喜欢的东西，Spark.",
        heroBody: "口味停留的地方。",
        orders: "订单",
        wishOn: "收藏",
        wishOff: "取消收藏",
        statusOnSale: "在售",
        statusReserved: "已预订",
        statusSold: "已售出",
        footerTagline: "收藏与口味停留的精品 C2C。",
        categoryNav: "分类",
        prohibited: "禁售品",
        guide: "说明",
        terms: "使用条款",
        privacy: "隐私政策",
        youth: "青少年保护",
        help: "客服",
    },
    de: {
        banner: "🛠️ Frontend-Wireframe (Dummy-Daten und Rollensimulation)",
        roleGroup: "Handelsrolle",
        roleBuyer: "Käufer",
        roleSeller: "Verkäufer",
        search: "Suche",
        searchPlaceholder: "Figure, LEGO, PSA10",
        empty: "Keine passenden Angebote.",
        sell: "Verkaufen",
        notification: "Hinweise",
        chat: "Chat",
        language: "Sprache",
        viewAll: "Alle anzeigen",
        popularTitle: "Beliebt",
        popularLede: "Meist gewünscht, dann meist angesehen.",
        newTitle: "Neu",
        newLede: "Zuletzt eingestellt.",
        emptyProducts: "Nichts anzuzeigen.",
        heroEyebrow: "PREMIUM C2C",
        heroTitle: "Was du liebst, Spark.",
        heroBody: "Wo dein Geschmack bleibt.",
        orders: "Bestellungen",
        wishOn: "Merken",
        wishOff: "Gemerkt",
        statusOnSale: "Im Verkauf",
        statusReserved: "Reserviert",
        statusSold: "Verkauft",
        footerTagline: "Premium-C2C für Geschmack und Sammlerstücke.",
        categoryNav: "Kategorien",
        prohibited: "Verbotene Artikel",
        guide: "Info",
        terms: "AGB",
        privacy: "Datenschutz",
        youth: "Jugendschutz",
        help: "Hilfe",
    },
    cs: {
        banner: "🛠️ Frontendový wireframe (falešná data a simulace rolí)",
        roleGroup: "Obchodní role",
        roleBuyer: "Kupující",
        roleSeller: "Prodejce",
        search: "Hledat",
        searchPlaceholder: "Figure, LEGO, PSA10",
        empty: "Žádné odpovídající nabídky.",
        sell: "Prodat",
        notification: "Upozornění",
        chat: "Chat",
        language: "Jazyk",
        viewAll: "Zobrazit vše",
        popularTitle: "Oblíbené",
        popularLede: "Nejvíc přání, při shodě nejvíc zhlédnutí.",
        newTitle: "Nové",
        newLede: "Naposledy přidané.",
        emptyProducts: "Není co zobrazit.",
        heroEyebrow: "PREMIUM C2C",
        heroTitle: "To, co máš rád, Spark.",
        heroBody: "Místo, kde zůstává vkus.",
        orders: "Objednávky",
        wishOn: "Uložit",
        wishOff: "Uloženo",
        statusOnSale: "V prodeji",
        statusReserved: "Rezervováno",
        statusSold: "Prodáno",
        footerTagline: "Prémiové C2C pro vkus a sběratelské kousky.",
        categoryNav: "Kategorie",
        prohibited: "Zakázané položky",
        guide: "Info",
        terms: "Podmínky",
        privacy: "Soukromí",
        youth: "Ochrana mládeže",
        help: "Podpora",
    },
};

export function translate(locale: LocaleId, key: MessageKey): string {
    return MESSAGE_MAP[locale][key];
}
