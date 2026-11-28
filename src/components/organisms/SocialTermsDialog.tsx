import { Button } from "@/components/atoms/Button";
import { Heading } from "@/components/atoms/Heading";
import { Text } from "@/components/atoms/Text";
import { AgreementField } from "@/components/molecules/AgreementField";
import type { SignUpAgreement } from "@/components/organisms/SignUpForm";

type SocialTermsDialogProps = {
    open: boolean;
    title: string;
    description: string;
    agreements: SignUpAgreement[];
    submitLabel: string;
    onSubmit: () => void;
    onClose: () => void;
};

export function SocialTermsDialog({
    open,
    title,
    description,
    agreements,
    submitLabel,
    onSubmit,
    onClose,
}: SocialTermsDialogProps) {
    if (!open) {
        return null;
    }

    return (
        <div
            className="fixed inset-0 z-50 flex items-center justify-center bg-[#1C1917]/40 px-4"
            onClick={onClose}
        >
            <div
                role="dialog"
                aria-modal="true"
                aria-labelledby="social-terms-title"
                className="w-full max-w-md rounded-[28px] bg-white p-5 shadow-[0_10px_30px_rgba(90,60,30,0.04)] sm:p-6"
                onClick={(event) => event.stopPropagation()}
            >
                <Heading level="h2">
                    <span id="social-terms-title">{title}</span>
                </Heading>
                <Text variant="catalog" className="mt-2 font-normal normal-case tracking-normal">
                    {description}
                </Text>
                <div className="mt-5 space-y-3">
                    {agreements.map((agreement) => (
                        <AgreementField
                            key={agreement.id}
                            id={`social-${agreement.id}`}
                            label={agreement.label}
                            checked={agreement.checked}
                            viewLabel={agreement.viewLabel}
                            onChange={agreement.onChange}
                            onView={agreement.onView}
                        />
                    ))}
                </div>
                <Button variant="accent" className="mt-6 w-full" onClick={onSubmit}>
                    {submitLabel}
                </Button>
            </div>
        </div>
    );
}
