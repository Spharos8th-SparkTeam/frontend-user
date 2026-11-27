const STATUS_CLASS = {
    onSale: "bg-[#E7F3EA] text-[#2F7D4A]",
    reserved: "bg-[#F8E7C8] text-[#8A5A12]",
    sold: "bg-[#EFEAE4] text-[#8A8178]",
} as const;

export type SaleBadgeStatus = keyof typeof STATUS_CLASS;

/* 알림, 채팅 숫자 */
type CountBadgeProps = {
    kind: "count";
    count: number;
};

/* 상품 상태 : 판매중, 예약중, 판매완료 */
type StatusBadgeProps = {
    kind: "status";
    status: SaleBadgeStatus;
    label: string;
};

type BadgeProps = CountBadgeProps | StatusBadgeProps;

export function Badge(props: BadgeProps) {
    if (props.kind === "count") {
        return (
            <span className="inline-flex min-w-5 items-center justify-center rounded-full bg-[#E07A7A] px-1.5 text-[10px] font-semibold leading-4 text-white">
                {props.count}
            </span>
        );
    }

    return (
        <span
            className={`inline-flex rounded-full px-2 py-0.5 text-xs font-medium ${STATUS_CLASS[props.status]}`}
        >
            {props.label}
        </span>
    );
}
