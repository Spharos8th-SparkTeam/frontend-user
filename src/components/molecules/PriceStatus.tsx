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
        <div className="flex w-full items-center justify-between ml-0.5">
            <Text variant="price" className={sold ? "text-[#B3A89F] line-through" : "text-[#1C1917]"}>
                {price}
            </Text>
            <Badge kind="status" status={status} label={statusLabel} />
        </div>
    );
}
