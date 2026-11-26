import { Button } from "@/components/atoms/Button";

export type TradeRole = "buyer" | "seller";

type RoleToggleProps = {
    label: string;
    value: TradeRole;
    buyerLabel: string;
    sellerLabel: string;
    onChange: (role: TradeRole) => void;
};

const ROLE_LIST: TradeRole[] = ["buyer", "seller"];

export function RoleToggle({ label, value, buyerLabel, sellerLabel, onChange }: RoleToggleProps) {
    const roleLabel = {
        buyer: buyerLabel,
        seller: sellerLabel,
    };

    return (
        <div role="group" aria-label={label} className="inline-flex rounded-full bg-white p-0.5 ring-1 ring-[#E7DFD6]">
            {ROLE_LIST.map((role) => {
                const selected = value === role;

                return (
                    <Button
                        key={role}
                        variant={selected ? "primary" : "ghost"}
                        pressed={selected}
                        onClick={() => onChange(role)}
                        className="min-w-14"
                    >
                        {roleLabel[role]}
                    </Button>
                );
            })}
        </div>
    );
}
