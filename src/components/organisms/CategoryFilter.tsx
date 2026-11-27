import { Button } from "@/components/atoms/Button";
import { FilterChipGroup, type ChipOption } from "@/components/molecules/FilterChipGroup";
import { PriceRange } from "@/components/molecules/PriceRange";

export type CategoryFilterProps = {
    title: string;
    resetLabel: string;
    onReset: () => void;
    categoryLabel?: string;
    category?: string;
    categoryOptions?: ChipOption[];
    onCategoryChange?: (value: string) => void;
    countryLabel: string;
    country: string;
    countryOptions: ChipOption[];
    onCountryChange: (value: string) => void;
    statusLabel: string;
    status: string;
    statusOptions: ChipOption[];
    onStatusChange: (value: string) => void;
    priceLabel: string;
    minPrice: string;
    maxPrice: string;
    minPricePlaceholder?: string;
    maxPricePlaceholder?: string;
    priceActionLabel: string;
    priceHint?: string;
    onMinPriceChange: (value: string) => void;
    onMaxPriceChange: (value: string) => void;
    onApplyPrice: () => void;
};

export function CategoryFilter({
    title,
    resetLabel,
    onReset,
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
    onStatusChange,
    priceLabel,
    minPrice,
    maxPrice,
    minPricePlaceholder,
    maxPricePlaceholder,
    priceActionLabel,
    priceHint,
    onMinPriceChange,
    onMaxPriceChange,
    onApplyPrice,
}: CategoryFilterProps) {
    return (
        <section className="rounded-[28px] border border-[#E7DFD6] bg-white p-5 sm:p-6">
            <div className="flex items-center justify-between gap-3">
                <h2 className="text-base font-semibold text-[#1C1917]">{title}</h2>
                <Button variant="secondary" onClick={onReset}>
                    {resetLabel}
                </Button>
            </div>
            <div className="mt-5 flex flex-col gap-5">
                {categoryLabel && categoryOptions && onCategoryChange ? (
                    <FilterChipGroup
                        label={categoryLabel}
                        value={category ?? ""}
                        options={categoryOptions}
                        onChange={onCategoryChange}
                    />
                ) : null}
                <FilterChipGroup
                    label={countryLabel}
                    value={country}
                    options={countryOptions}
                    onChange={onCountryChange}
                />
                <FilterChipGroup
                    label={statusLabel}
                    value={status}
                    options={statusOptions}
                    onChange={onStatusChange}
                />
                <PriceRange
                    label={priceLabel}
                    min={minPrice}
                    max={maxPrice}
                    minPlaceholder={minPricePlaceholder}
                    maxPlaceholder={maxPricePlaceholder}
                    actionLabel={priceActionLabel}
                    hint={priceHint}
                    onMinChange={onMinPriceChange}
                    onMaxChange={onMaxPriceChange}
                    onApply={onApplyPrice}
                />
            </div>
        </section>
    );
}
