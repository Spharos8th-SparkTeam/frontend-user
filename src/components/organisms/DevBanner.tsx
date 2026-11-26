import { Text } from "@/components/atoms/Text";
import { RoleToggle, type TradeRole } from "@/components/molecules/RoleToggle";

type DevBannerProps = {
    message: string;
    roleLabel: string;
    role: TradeRole;
    buyerLabel: string;
    sellerLabel: string;
    onRoleChange: (role: TradeRole) => void;
};

// 로그인 전 와이어프레임에서만 보여 주는 안내. 인증이 붙으면 이 컴포넌트를 빼면 된다.
export function DevBanner({
    message,
    roleLabel,
    role,
    buyerLabel,
    sellerLabel,
    onRoleChange,
}: DevBannerProps) {
    return (
        <div className="border-b border-[#E7DFD6] bg-[#F3E6D8]">
            <div className="mx-auto flex max-w-7xl flex-wrap items-center gap-x-3 gap-y-2 px-4 py-2 sm:px-6">
                <Text variant="caption" className="min-w-0 flex-1 text-[#6B4E3D]">
                    {message}
                </Text>
                <RoleToggle
                    label={roleLabel}
                    value={role}
                    buyerLabel={buyerLabel}
                    sellerLabel={sellerLabel}
                    onChange={onRoleChange}
                />
            </div>
        </div>
    );
}
