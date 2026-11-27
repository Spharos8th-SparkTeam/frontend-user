import { SellAside, type SellAsideProps } from "@/components/organisms/SellAside";
import { SellForm, type SellFormProps } from "@/components/organisms/SellForm";
import { SellIntro, type SellIntroProps } from "@/components/organisms/SellIntro";

type SellTemplateProps = {
    intro: SellIntroProps;
    form: SellFormProps;
    aside: SellAsideProps;
};

export function SellTemplate({ intro, form, aside }: SellTemplateProps) {
    return (
        <div className="flex flex-col gap-8 pt-8">
            <SellIntro {...intro} />
            <div className="grid items-start gap-6 lg:grid-cols-[minmax(0,1fr)_18rem]">
                <SellForm {...form} />
                <div className="lg:sticky lg:top-32">
                    <SellAside {...aside} />
                </div>
            </div>
        </div>
    );
}
