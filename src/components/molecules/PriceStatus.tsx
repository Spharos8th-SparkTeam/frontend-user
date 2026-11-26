import { Badge, type SaleBadgeStatus } from "@/components/atoms/Badge";
import { Text } from "@/components/atoms/Text";

type PriceStatusProps = {
    price: string;
    status: SaleBadgeStatus;
    statusLabel: string;
};

export function PriceStatus({ price, status, statusLabel }: PriceStatusProps) {
    const sold = status === "sold";

    return (
        <div className="flex w-full items-center justify-between">
            <Text
                variant="price"
                className={sold ? "text-xl text-[#B3A89F] line-through" : "text-xl text-[#1C1917]"}
            >
                {price}
            </Text>
            <Badge kind="status" status={status} label={statusLabel} />
        </div>
    );
}
