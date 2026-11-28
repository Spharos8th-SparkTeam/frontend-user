"use client";

import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Button } from "@/components/atoms/Button";
import { Input } from "@/components/atoms/Input";
import { FormField } from "@/components/molecules/FormField";
import { InlineLink } from "@/components/molecules/InlineLink";
import { SocialAuthGroup } from "@/components/molecules/SocialAuthGroup";
import { SignUpIntro } from "@/components/organisms/SignUpIntro";
import { readNextPath } from "@/features/auth/model/MemberPath";
import { useMemberSession } from "@/features/auth/model/MemberSession";

export function LoginPage() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const { login, loginWithSocial } = useMemberSession();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    function submit() {
        if (!email.trim() || !password) {
            setError("이메일과 비밀번호를 입력해 주세요.");
            return;
        }

        if (!login(email.trim(), password)) {
            setError("이메일 또는 비밀번호가 올바르지 않습니다.");
            return;
        }

        router.push(readNextPath(searchParams.get("next")));
    }

    return (
        <div className="mx-auto flex w-full max-w-xl flex-col gap-8 pt-8">
            <SignUpIntro
                title="다시 만나서 반가워요"
                description="이메일로 들어오거나, 아래 소셜 계정을 사용할 수 있어요."
            />
            <form
                className="space-y-6 rounded-[28px] bg-white p-5 shadow-[0_10px_30px_rgba(90,60,30,0.04)] sm:p-6"
                onSubmit={(event) => {
                    event.preventDefault();
                    submit();
                }}
            >
                <FormField id="login-email" label="이메일" required>
                    <Input
                        id="login-email"
                        variant="field"
                        type="email"
                        value={email}
                        placeholder="example@example.com"
                        onChange={setEmail}
                    />
                </FormField>
                <FormField id="login-password" label="비밀번호" required>
                    <Input
                        id="login-password"
                        variant="field"
                        type="password"
                        value={password}
                        placeholder="비밀번호"
                        onChange={setPassword}
                    />
                </FormField>
                {error ? <p className="text-sm text-[#BA5847]">{error}</p> : null}
                <Button variant="accent" type="submit" className="w-full">
                    이메일로 로그인
                </Button>
                <p className="text-center text-sm text-[#6F675F]">
                    계정이 없으신가요? <InlineLink href="/signup">회원가입</InlineLink>
                </p>
                <div className="border-t border-[#E7DFD6] pt-6">
                    <SocialAuthGroup
                        title="또는 소셜 계정으로 계속하기"
                        options={[
                            { id: "line", label: "LINE으로 계속하기" },
                            { id: "google", label: "Google로 계속하기" },
                            { id: "x", label: "X로 계속하기" },
                            { id: "apple", label: "Apple로 계속하기" },
                        ]}
                        onSelect={(provider) => {
                            loginWithSocial(provider);
                            router.push(readNextPath(searchParams.get("next")));
                        }}
                    />
                </div>
            </form>
        </div>
    );
}
