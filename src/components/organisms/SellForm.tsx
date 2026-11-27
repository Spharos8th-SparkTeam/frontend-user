import { Button } from "@/components/atoms/Button";
import { Icon } from "@/components/atoms/Icon";
import { Input } from "@/components/atoms/Input";
import { Select, type SelectOption } from "@/components/atoms/Select";
import { AiAssist } from "@/components/molecules/AiAssist";
import { DescriptionEditor, type EditorCommand } from "@/components/molecules/DescriptionEditor";
import { FormField } from "@/components/molecules/FormField";
import { PriceInput } from "@/components/molecules/PriceInput";
import { RadioGroup, type RadioOption } from "@/components/molecules/RadioGroup";
import { MediaUploader, type SellMediaItem } from "@/components/organisms/MediaUploader";

export type SellFormProps = {
    idPrefix?: string;
    mediaLabel: string;
    mediaHint: string;
    mediaNote: string;
    mediaActionLabel: string;
    representativeBadge: string;
    prohibitedHref: string;
    prohibitedLabel: string;
    media: SellMediaItem[];
    mediaLimit?: number;
    onSelectFile: (file: File) => void;
    onMoveMedia: (fromIndex: number, toIndex: number) => void;
    aiTitle: string;
    aiDescription: string;
    aiActionLabel: string;
    onAnalyze: () => void;
    nameLabel: string;
    name: string;
    namePlaceholder?: string;
    onNameChange: (value: string) => void;
    categoryLabel: string;
    category: string;
    categoryOptions: SelectOption[];
    onCategoryChange: (value: string) => void;
    countryLabel: string;
    country: string;
    countryOptions: SelectOption[];
    onCountryChange: (value: string) => void;
    statusLabel: string;
    status: string;
    statusOptions: SelectOption[];
    statusHint?: string;
    onStatusChange: (value: string) => void;
    priceLabel: string;
    price: string;
    pricePlaceholder?: string;
    onPriceChange: (value: string) => void;
    descriptionLabel: string;
    description: string;
    descriptionPlaceholder?: string;
    descriptionHint: string;
    onDescriptionChange: (value: string) => void;
    onDescriptionCommand?: (command: EditorCommand) => void;
    shippingLabel: string;
    shipping: string;
    shippingOptions: RadioOption[];
    shippingHint: string;
    onShippingChange: (value: string) => void;
    submitLabel: string;
    onSubmit: () => void;
};

export function SellForm({
    idPrefix = "sell",
    mediaLabel,
    mediaHint,
    mediaNote,
    mediaActionLabel,
    representativeBadge,
    prohibitedHref,
    prohibitedLabel,
    media,
    mediaLimit,
    onSelectFile,
    onMoveMedia,
    aiTitle,
    aiDescription,
    aiActionLabel,
    onAnalyze,
    nameLabel,
    name,
    namePlaceholder,
    onNameChange,
    categoryLabel,
    category,
    categoryOptions,
    onCategoryChange,
    countryLabel,
    country,
    countryOptions,
    onCountryChange,
    statusLabel,
    status,
    statusOptions,
    statusHint,
    onStatusChange,
    priceLabel,
    price,
    pricePlaceholder,
    onPriceChange,
    descriptionLabel,
    description,
    descriptionPlaceholder,
    descriptionHint,
    onDescriptionChange,
    onDescriptionCommand,
    shippingLabel,
    shipping,
    shippingOptions,
    shippingHint,
    onShippingChange,
    submitLabel,
    onSubmit,
}: SellFormProps) {
    const nameId = `${idPrefix}-name`;
    const categoryId = `${idPrefix}-category`;
    const countryId = `${idPrefix}-country`;
    const statusId = `${idPrefix}-status`;
    const priceId = `${idPrefix}-price`;
    const descriptionId = `${idPrefix}-description`;

    return (
        <form
            className="space-y-8 rounded-[28px] bg-white p-5 shadow-[0_10px_30px_rgba(90,60,30,0.04)] sm:p-6"
            onSubmit={(event) => {
                event.preventDefault();
                onSubmit();
            }}
        >
            <MediaUploader
                id={`${idPrefix}-media`}
                label={mediaLabel}
                hint={mediaHint}
                note={mediaNote}
                actionLabel={mediaActionLabel}
                representativeBadge={representativeBadge}
                prohibitedHref={prohibitedHref}
                prohibitedLabel={prohibitedLabel}
                media={media}
                mediaLimit={mediaLimit}
                onSelectFile={onSelectFile}
                onMoveMedia={onMoveMedia}
            />
            <AiAssist
                title={aiTitle}
                description={aiDescription}
                actionLabel={aiActionLabel}
                onAnalyze={onAnalyze}
            />
            <FormField id={nameId} label={nameLabel} required>
                <Input
                    id={nameId}
                    variant="field"
                    value={name}
                    placeholder={namePlaceholder}
                    required
                    onChange={onNameChange}
                />
            </FormField>
            <div className="grid gap-4 sm:grid-cols-2">
                <FormField id={categoryId} label={categoryLabel} required>
                    <Select
                        id={categoryId}
                        variant="field"
                        value={category}
                        options={categoryOptions}
                        ariaLabel={categoryLabel}
                        required
                        onChange={onCategoryChange}
                    />
                </FormField>
                <FormField id={countryId} label={countryLabel} required>
                    <Select
                        id={countryId}
                        variant="field"
                        value={country}
                        options={countryOptions}
                        ariaLabel={countryLabel}
                        required
                        onChange={onCountryChange}
                    />
                </FormField>
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
                <FormField id={statusId} label={statusLabel} required hint={statusHint}>
                    <Select
                        id={statusId}
                        variant="field"
                        value={status}
                        options={statusOptions}
                        ariaLabel={statusLabel}
                        onChange={onStatusChange}
                    />
                </FormField>
                <FormField id={priceId} label={priceLabel} required>
                    <PriceInput
                        id={priceId}
                        value={price}
                        placeholder={pricePlaceholder}
                        required
                        onChange={onPriceChange}
                    />
                </FormField>
            </div>
            <FormField id={descriptionId} label={descriptionLabel} required hint={descriptionHint}>
                <DescriptionEditor
                    id={descriptionId}
                    value={description}
                    placeholder={descriptionPlaceholder}
                    required
                    onChange={onDescriptionChange}
                    onCommand={onDescriptionCommand}
                />
            </FormField>
            <FormField label={shippingLabel} required hint={shippingHint}>
                <RadioGroup
                    name={`${idPrefix}-shipping`}
                    value={shipping}
                    options={shippingOptions}
                    onChange={onShippingChange}
                />
            </FormField>
            <div className="flex justify-end">
                <Button type="submit" variant="accent">
                    {submitLabel}
                    <Icon name="arrow" className="h-4 w-4" />
                </Button>
            </div>
        </form>
    );
}
