"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import type { SellMediaItem } from "@/components/organisms/MediaUploader";
import { SellTemplate } from "@/components/templates/SellTemplate";
import {
    CATEGORY_LIST,
    SALE_STATUS,
    formatUsd,
    getCategoryHref,
} from "@/features/product/model/Product";

const MEDIA_LIMIT = 10;
const MAX_PRICE = 1_000_000;
const SHIPPING_INCLUDED = "included";
const SHIPPING_SEPARATE = "separate";
const COUNTRY_LIST = ["일본", "중국", "대만", "미국", "덴마크", "체코", "독일"] as const;
const STATUS_LIST = [SALE_STATUS.ON_SALE, SALE_STATUS.RESERVED, SALE_STATUS.SOLD] as const;
const KEYWORD_RULES = [
    { pattern: /포켓몬|pokemon|피카|리자몽|tcg|card|카드|psa|bgs/i, keyword: "TCG", price: "128" },
    { pattern: /레고|lego|brick/i, keyword: "레고", price: "97" },
    { pattern: /산리오|sanrio|키티|쿠로미|인형|doll|plush|누이/i, keyword: "인형", price: "38" },
    { pattern: /스퀴시|피젯|fidget|squish/i, keyword: "스퀴시", price: "16" },
    { pattern: /아트토이|arttoy|sofubi|소프비/i, keyword: "아트토이", price: "73" },
    { pattern: /프라모델|건담|gunpla/i, keyword: "프라모델", price: "54" },
    { pattern: /피규|넨도|nendo|figure|scale|하이큐|블리치/i, keyword: "피규어", price: "86" },
] as const;

function isVideoFile(file: File): boolean {
    return file.type.startsWith("video/") || /\.(mp4|mov)$/i.test(file.name);
}

function isAllowedFile(file: File): boolean {
    return isVideoFile(file) || file.type.startsWith("image/") || /\.(png|jpe?g)$/i.test(file.name);
}

export function SellPage() {
    const router = useRouter();
    const [media, setMedia] = useState<SellMediaItem[]>([]);
    const [name, setName] = useState("");
    const [category, setCategory] = useState("");
    const [country, setCountry] = useState("");
    const [status, setStatus] = useState<string>(SALE_STATUS.ON_SALE);
    const [price, setPrice] = useState("");
    const [description, setDescription] = useState("");
    const [shipping, setShipping] = useState(SHIPPING_INCLUDED);
    const [, setRegistered] = useState(false);
    const mediaRef = useRef(media);

    useEffect(() => {
        mediaRef.current = media;
    }, [media]);

    useEffect(
        () => () => {
            mediaRef.current.forEach((item) => URL.revokeObjectURL(item.src));
        },
        [],
    );

    const representative = media.find((item) => !item.video);
    const amount = Number(price);
    const previewPrice = price !== "" && !Number.isNaN(amount) ? formatUsd(amount) : formatUsd(0);

    function markDraft() {
        setRegistered(false);
    }

    function selectFile(file: File) {
        if (!isAllowedFile(file)) {
            return;
        }

        markDraft();
        setMedia((current) => {
            if (current.length >= MEDIA_LIMIT) {
                return current;
            }

            return [
                ...current,
                {
                    id: crypto.randomUUID(),
                    src: URL.createObjectURL(file),
                    alt: file.name,
                    video: isVideoFile(file),
                },
            ];
        });
    }

    function moveMedia(fromIndex: number, toIndex: number) {
        if (fromIndex === toIndex) {
            return;
        }

        markDraft();
        setMedia((current) => {
            const moving = current[fromIndex];

            if (!moving || moving.video) {
                return current;
            }

            const next = [...current];
            const [item] = next.splice(fromIndex, 1);

            next.splice(toIndex, 0, item);

            return next;
        });
    }

    function changePrice(value: string) {
        if (value !== "" && !/^\d*\.?\d{0,2}$/.test(value)) {
            return;
        }

        const nextAmount = Number(value);

        if (value !== "" && value !== "." && !Number.isNaN(nextAmount) && nextAmount > MAX_PRICE) {
            return;
        }

        markDraft();
        setPrice(value);
    }

    function analyzePrice() {
        if (!representative) {
            return;
        }

        const matched = KEYWORD_RULES.find((rule) => rule.pattern.test(representative.alt));
        const stem = representative.alt.replace(/\.[^.]+$/, "");

        markDraft();
        setName(matched?.keyword ?? stem);
        setPrice(matched?.price ?? "48");
    }

    function registerListing() {
        if (!/^\d+(\.\d{1,2})?$/.test(price) || Number(price) > MAX_PRICE || !category) {
            return;
        }

        setRegistered(true);
        router.push(getCategoryHref(category));
    }

    return (
        <SellTemplate
            intro={{
                title: "상품 등록",
                description:
                    "사진첩에서 미디어를 올리고 판매 상태를 고르세요. 기본값은 판매중입니다.",
            }}
            form={{
                mediaLabel: "사진 / 동영상",
                mediaHint:
                    "사진첩에서만 선택 · 최소 1개, 최대 10개 · 사진(png, jpg, jpeg), 동영상(mp4, mov)",
                mediaNote: "사진을 드래그 해서 대표 이미지로 변경해보세요.",
                mediaActionLabel: "사진첩에서 선택",
                representativeBadge: "대표",
                prohibitedHref: "/legal/prohibited",
                prohibitedLabel: "판매 금지 품목",
                media,
                mediaLimit: MEDIA_LIMIT,
                onSelectFile: selectFile,
                onMoveMedia: moveMedia,
                aiTitle: "가격이 고민되시나요?",
                aiDescription: "대표 이미지를 분석해 추천 판매가를 알려드립니다.",
                aiActionLabel: "AI 분석 조회",
                onAnalyze: analyzePrice,
                nameLabel: "상품제목",
                name,
                namePlaceholder: "상품제목을 입력해 주세요",
                onNameChange: (value) => {
                    markDraft();
                    setName(value);
                },
                categoryLabel: "카테고리",
                category,
                categoryOptions: [
                    { value: "", label: "선택해 주세요" },
                    ...CATEGORY_LIST.map((item) => ({ value: item.label, label: item.label })),
                ],
                onCategoryChange: (value) => {
                    markDraft();
                    setCategory(value);
                },
                countryLabel: "국가",
                country,
                countryOptions: [
                    { value: "", label: "선택해 주세요" },
                    ...COUNTRY_LIST.map((item) => ({ value: item, label: item })),
                ],
                onCountryChange: (value) => {
                    markDraft();
                    setCountry(value);
                },
                statusLabel: "판매 상태",
                status,
                statusOptions: STATUS_LIST.map((item) => ({ value: item, label: item })),
                statusHint: "판매중, 예약중, 판매완료를 언제든 다시 고를 수 있어요.",
                onStatusChange: (value) => {
                    markDraft();
                    setStatus(value);
                },
                priceLabel: "가격 (USD)",
                price,
                pricePlaceholder: "0–1,000,000",
                onPriceChange: changePrice,
                descriptionLabel: "상품 설명",
                description,
                descriptionPlaceholder: "상품 상태, 구성품, 사용 여부 등을 10자 이상 작성해주세요",
                descriptionHint: "",
                onDescriptionChange: (value) => {
                    markDraft();
                    setDescription(value);
                },
                shippingLabel: "배송비",
                shipping,
                shippingOptions: [
                    { value: SHIPPING_INCLUDED, label: "배송비 포함" },
                    { value: SHIPPING_SEPARATE, label: "배송비 별도" },
                ],
                shippingHint:
                    shipping === SHIPPING_INCLUDED
                        ? "배송비가 상품 가격에 포함돼요."
                        : "배송비는 상품 가격과 따로 받아요.",
                onShippingChange: (value) => {
                    markDraft();
                    setShipping(value);
                },
                submitLabel: "매물 등록",
                onSubmit: registerListing,
            }}
            aside={{
                previewTitle: "미리보기",
                previewHint: "입력하면 카드에 바로 반영돼요.",
                imageSrc: representative?.src,
                imageAlt: representative?.alt ?? "상품 사진",
                category,
                country,
                title: name,
                titlePlaceholder: "상품명을 입력해 주세요",
                price: previewPrice,
                statusLabel: status,
                noticeTitle: "등록 전에 확인해 주세요",
                noticeItems: [
                    "사진은 최소 1개, 최대 10개까지 올릴 수 있어요.",
                    "첫 사진이 대표 이미지가 돼요.",
                    "동영상은 대표 이미지가 될 수 없어요.",
                    "판매 금지 품목은 등록할 수 없어요.",
                    "가격은 USD로 적고, 배송비 포함 여부를 선택해주세요.",
                ],
                guideHref: "/legal/prohibited",
                guideLabel: "판매 금지 품목 안내",
            }}
        />
    );
}
