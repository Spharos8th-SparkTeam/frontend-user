"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import type { SocialProvider } from "@/components/molecules/SocialAuthGroup";
import type { SignUpAgreement } from "@/components/organisms/SignUpForm";
import { SignUpTemplate } from "@/components/templates/SignUpTemplate";

const TEST_CODE = "5825";
const PASSWORD_HINT = "10~20자, 숫자·대문자·소문자·특수기호(! ~ - * ^) 중 3종류 이상";
const CODE_HINT = "인증번호는 4~6자리입니다.";
const SOCIAL_NAME: Record<SocialProvider, string> = {
    line: "LINE",
    google: "Google",
    x: "X",
    apple: "Apple",
};

function emailError(email: string): string | undefined {
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
        return "이메일 형식을 확인해 주세요.";
    }

    return undefined;
}

function passwordError(password: string): string | undefined {
    if (password.length < 10 || password.length > 20) {
        return "비밀번호는 10~20자로 입력해 주세요.";
    }

    if (!/^[A-Za-z0-9!~*^-]+$/.test(password)) {
        return "특수기호는 ! ~ - * ^ 만 사용할 수 있어요.";
    }

    const kinds = [/\d/, /[A-Z]/, /[a-z]/, /[!~*^-]/].filter((pattern) => pattern.test(password));

    if (kinds.length < 3) {
        return "숫자, 대문자, 소문자, 특수기호(! ~ - * ^) 중 3종류 이상을 조합해 주세요.";
    }

    return undefined;
}

export function SignUpPage() {
    const router = useRouter();
    const [email, setEmail] = useState("");
    const [emailHint, setEmailHint] = useState<string>();
    const [sentTo, setSentTo] = useState("");
    const [code, setCode] = useState("");
    const [codeHint, setCodeHint] = useState(CODE_HINT);
    const [verifiedEmail, setVerifiedEmail] = useState("");
    const [password, setPassword] = useState("");
    const [passwordHint, setPasswordHint] = useState(PASSWORD_HINT);
    const [passwordConfirm, setPasswordConfirm] = useState("");
    const [passwordConfirmHint, setPasswordConfirmHint] = useState<string>();
    const [terms, setTerms] = useState(false);
    const [privacy, setPrivacy] = useState(false);
    const [age, setAge] = useState(false);
    const [marketing, setMarketing] = useState(false);
    const [notice, setNotice] = useState<string>();
    const [socialId, setSocialId] = useState<SocialProvider>();
    const [socialError, setSocialError] = useState(false);
    const [previewId, setPreviewId] = useState<string>();

    function changeEmail(value: string) {
        setEmail(value);
        setEmailHint(undefined);
        setVerifiedEmail("");
        setNotice(undefined);
    }

    function sendCode() {
        const message = emailError(email);

        if (message) {
            setEmailHint(message);
            return;
        }

        setEmailHint(undefined);
        setSentTo(email);
        setVerifiedEmail("");
        setCodeHint(`인증번호가 발송되었습니다. (테스트 번호: ${TEST_CODE})`);
        setNotice(undefined);
    }

    function confirmCode() {
        if (sentTo !== email) {
            setVerifiedEmail("");
            setCodeHint("인증번호를 먼저 발송해 주세요.");
            return;
        }

        if (!/^\d{4,6}$/.test(code)) {
            setVerifiedEmail("");
            setCodeHint("인증번호는 4~6자리 숫자로 입력해 주세요.");
            return;
        }

        if (code !== TEST_CODE) {
            setVerifiedEmail("");
            setCodeHint("인증번호가 올바르지 않습니다.");
            return;
        }

        setVerifiedEmail(email);
        setCodeHint("인증 완료");
        setNotice(undefined);
    }

    function submit() {
        const nextEmailError = emailError(email);

        if (nextEmailError) {
            setEmailHint(nextEmailError);
            setNotice(undefined);
            return;
        }

        setEmailHint(undefined);

        if (verifiedEmail !== email) {
            setNotice("이메일 인증을 완료해 주세요.");
            return;
        }

        const nextPasswordError = passwordError(password);

        if (nextPasswordError) {
            setPasswordHint(nextPasswordError);
            setNotice(undefined);
            return;
        }

        setPasswordHint(PASSWORD_HINT);

        if (!passwordConfirm) {
            setPasswordConfirmHint("비밀번호 확인을 입력해 주세요.");
            setNotice(undefined);
            return;
        }

        if (passwordConfirm !== password) {
            setPasswordConfirmHint("비밀번호가 일치하지 않아요.");
            setNotice(undefined);
            return;
        }

        setPasswordConfirmHint(undefined);

        if (!terms || !privacy || !age) {
            setNotice("필수 약관에 동의해 주세요.");
            return;
        }

        setNotice(undefined);
        router.push("/");
    }

    function submitSocial() {
        if (!terms || !privacy || !age) {
            setSocialError(true);
            return;
        }

        setSocialError(false);
        setSocialId(undefined);
        router.push("/");
    }

    const agreements: SignUpAgreement[] = [
        {
            id: "terms",
            label: "[필수] 서비스 이용약관 동의",
            checked: terms,
            viewLabel: "보기",
            onChange: setTerms,
            onView: () => setPreviewId("terms"),
        },
        {
            id: "privacy",
            label: "[필수] 개인정보 수집 및 이용 동의",
            checked: privacy,
            viewLabel: "보기",
            onChange: setPrivacy,
            onView: () => setPreviewId("privacy"),
        },
        {
            id: "age",
            label: "[필수] 만 14세 이상입니다",
            checked: age,
            onChange: setAge,
        },
        {
            id: "marketing",
            label: "[선택] 마케팅 정보 수신 동의",
            checked: marketing,
            onChange: setMarketing,
        },
    ];
    const requiredAgreements = agreements.filter((agreement) => agreement.id !== "marketing");
    const preview = agreements.find((agreement) => agreement.id === previewId);
    const socialName = socialId ? SOCIAL_NAME[socialId] : "";

    return (
        <SignUpTemplate
            intro={{
                title: "ReSpark에 가입하기",
                description: "이메일과 비밀번호만 있으면 돼요. 닉네임은 자동으로 만들어집니다.",
            }}
            form={{
                emailLabel: "이메일",
                email,
                emailPlaceholder: "example@example.com",
                emailHint,
                sendCodeLabel: "인증번호 발송",
                onEmailChange: changeEmail,
                onSendCode: sendCode,
                codeLabel: "인증번호",
                code,
                codePlaceholder: "4~6자리",
                codeHint,
                confirmCodeLabel: "인증 확인",
                onCodeChange: (value) => {
                    setCode(value);
                    setVerifiedEmail("");
                },
                onConfirmCode: confirmCode,
                passwordLabel: "비밀번호",
                password,
                passwordPlaceholder: "10~20자",
                passwordHint,
                onPasswordChange: (value) => {
                    setPassword(value);
                    setPasswordHint(PASSWORD_HINT);
                    setNotice(undefined);
                },
                passwordConfirmLabel: "비밀번호 확인",
                passwordConfirm,
                passwordConfirmPlaceholder: "비밀번호를 한 번 더 입력",
                passwordConfirmHint,
                onPasswordConfirmChange: (value) => {
                    setPasswordConfirm(value);
                    setPasswordConfirmHint(undefined);
                    setNotice(undefined);
                },
                agreements,
                notice,
                submitLabel: "완료",
                onSubmit: submit,
                accountLabel: "이미 계정이 있으신가요?",
                loginHref: "/login",
                loginLabel: "로그인",
                socialTitle: "또는 소셜 계정으로 가입하기",
                socialOptions: [
                    { id: "line", label: "LINE으로 계속하기" },
                    { id: "google", label: "Google로 계속하기" },
                    { id: "x", label: "X로 계속하기" },
                    { id: "apple", label: "Apple로 계속하기" },
                ],
                onSelectSocial: (id) => {
                    setPreviewId(undefined);
                    setSocialError(false);
                    setSocialId(id);
                },
            }}
            socialTerms={{
                open: Boolean(socialId) || Boolean(preview),
                title: preview ? preview.label : "소셜 회원가입 약관 동의",
                description: preview
                    ? "확인한 뒤 가입 화면에서 동의할 수 있어요."
                    : socialError
                      ? "필수 약관에 동의해 주세요."
                      : `${socialName} 계정으로 가입하려면 필수 약관에 동의해 주세요. 동의하기 전에는 계정이 만들어지지 않습니다.`,
                agreements: preview ? [preview] : requiredAgreements,
                submitLabel: preview ? "확인" : "동의하고 가입하기",
                onSubmit: preview ? () => setPreviewId(undefined) : submitSocial,
                onClose: () => {
                    setPreviewId(undefined);
                    setSocialId(undefined);
                    setSocialError(false);
                },
            }}
        />
    );
}
