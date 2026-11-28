import { SignUpForm, type SignUpFormProps } from "@/components/organisms/SignUpForm";
import { SignUpIntro, type SignUpIntroProps } from "@/components/organisms/SignUpIntro";
import {
    SocialTermsDialog,
    type SocialTermsDialogProps,
} from "@/components/organisms/SocialTermsDialog";

type SignUpTemplateProps = {
    intro: SignUpIntroProps;
    form: SignUpFormProps;
    socialTerms: SocialTermsDialogProps;
};

export function SignUpTemplate({ intro, form, socialTerms }: SignUpTemplateProps) {
    return (
        <>
            <div className="mx-auto flex w-full max-w-xl flex-col gap-8 pt-8">
                <SignUpIntro {...intro} />
                <SignUpForm {...form} />
            </div>
            <SocialTermsDialog {...socialTerms} />
        </>
    );
}
