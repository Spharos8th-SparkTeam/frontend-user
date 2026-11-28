import { Button } from "@/components/atoms/Button";
import { Input } from "@/components/atoms/Input";
import { FormField } from "@/components/molecules/FormField";
import { InlineLink } from "@/components/molecules/InlineLink";
import { AgreementField } from "@/components/molecules/AgreementField";
import {
    SocialAuthGroup,
    type SocialAuthOption,
    type SocialProvider,
} from "@/components/molecules/SocialAuthGroup";
import { VerifyCodeField } from "@/components/molecules/VerifyCodeField";

export type SignUpAgreement = {
    id: string;
    label: string;
    checked: boolean;
    onChange: (checked: boolean) => void;
    viewLabel?: string;
    onView?: () => void;
};

export type SignUpFormProps = {
    idPrefix?: string;
    emailLabel: string;
    email: string;
    emailPlaceholder?: string;
    sendCodeLabel: string;
    onEmailChange: (value: string) => void;
    onSendCode: () => void;
    codeLabel: string;
    code: string;
    codePlaceholder?: string;
    codeHint?: string;
    confirmCodeLabel: string;
    onCodeChange: (value: string) => void;
    onConfirmCode: () => void;
    passwordLabel: string;
    password: string;
    passwordPlaceholder?: string;
    passwordHint?: string;
    onPasswordChange: (value: string) => void;
    passwordConfirmLabel: string;
    passwordConfirm: string;
    passwordConfirmPlaceholder?: string;
    passwordConfirmHint?: string;
    onPasswordConfirmChange: (value: string) => void;
    agreements: SignUpAgreement[];
    submitLabel: string;
    onSubmit: () => void;
    accountLabel: string;
    loginHref: string;
    loginLabel: string;
    socialTitle: string;
    socialOptions: SocialAuthOption[];
    onSelectSocial: (id: SocialProvider) => void;
};

export function SignUpForm({
    idPrefix = "sign-up",
    emailLabel,
    email,
    emailPlaceholder,
    sendCodeLabel,
    onEmailChange,
    onSendCode,
    codeLabel,
    code,
    codePlaceholder,
    codeHint,
    confirmCodeLabel,
    onCodeChange,
    onConfirmCode,
    passwordLabel,
    password,
    passwordPlaceholder,
    passwordHint,
    onPasswordChange,
    passwordConfirmLabel,
    passwordConfirm,
    passwordConfirmPlaceholder,
    passwordConfirmHint,
    onPasswordConfirmChange,
    agreements,
    submitLabel,
    onSubmit,
    accountLabel,
    loginHref,
    loginLabel,
    socialTitle,
    socialOptions,
    onSelectSocial,
}: SignUpFormProps) {
    const emailId = `${idPrefix}-email`;
    const codeId = `${idPrefix}-code`;
    const passwordId = `${idPrefix}-password`;
    const passwordConfirmId = `${idPrefix}-password-confirm`;

    return (
        <form
            className="space-y-6 rounded-[28px] bg-white p-5 shadow-[0_10px_30px_rgba(90,60,30,0.04)] sm:p-6"
            onSubmit={(event) => {
                event.preventDefault();
                onSubmit();
            }}
        >
            <VerifyCodeField
                id={emailId}
                label={emailLabel}
                type="email"
                value={email}
                placeholder={emailPlaceholder}
                actionLabel={sendCodeLabel}
                required
                onChange={onEmailChange}
                onAction={onSendCode}
            />
            <VerifyCodeField
                id={codeId}
                label={codeLabel}
                value={code}
                placeholder={codePlaceholder}
                hint={codeHint}
                actionLabel={confirmCodeLabel}
                required
                onChange={onCodeChange}
                onAction={onConfirmCode}
            />
            <FormField id={passwordId} label={passwordLabel} hint={passwordHint} required>
                <Input
                    id={passwordId}
                    variant="field"
                    type="password"
                    value={password}
                    placeholder={passwordPlaceholder}
                    required
                    onChange={onPasswordChange}
                />
            </FormField>
            <FormField
                id={passwordConfirmId}
                label={passwordConfirmLabel}
                hint={passwordConfirmHint}
                required
            >
                <Input
                    id={passwordConfirmId}
                    variant="field"
                    type="password"
                    value={passwordConfirm}
                    placeholder={passwordConfirmPlaceholder}
                    required
                    onChange={onPasswordConfirmChange}
                />
            </FormField>
            <div className="space-y-3">
                {agreements.map((agreement) => (
                    <AgreementField
                        key={agreement.id}
                        id={`${idPrefix}-${agreement.id}`}
                        label={agreement.label}
                        checked={agreement.checked}
                        viewLabel={agreement.viewLabel}
                        onChange={agreement.onChange}
                        onView={agreement.onView}
                    />
                ))}
            </div>
            <Button variant="accent" type="submit" className="w-full">
                {submitLabel}
            </Button>
            <p className="text-center text-sm text-[#6F675F]">
                {accountLabel} <InlineLink href={loginHref}>{loginLabel}</InlineLink>
            </p>
            <div className="border-t border-[#E7DFD6] pt-6">
                <SocialAuthGroup
                    title={socialTitle}
                    options={socialOptions}
                    onSelect={onSelectSocial}
                />
            </div>
        </form>
    );
}
