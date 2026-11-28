import { Button } from "@/components/atoms/Button";

type LoginRequiredDialogProps = {
    message: string;
    cancelLabel: string;
    confirmLabel: string;
    onCancel: () => void;
    onConfirm: () => void;
};

export function LoginRequiredDialog({
    message,
    cancelLabel,
    confirmLabel,
    onCancel,
    onConfirm,
}: LoginRequiredDialogProps) {
    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#1C1917]/40 px-4">
            <div
                role="dialog"
                aria-modal="true"
                aria-labelledby="login-required-message"
                className="w-full max-w-sm rounded-[28px] bg-white p-5 shadow-[0_10px_30px_rgba(90,60,30,0.04)] sm:p-6"
            >
                <p id="login-required-message" className="text-sm text-[#1C1917]">
                    {message}
                </p>
                <div className="mt-6 flex gap-2">
                    <Button variant="secondary" className="flex-1" onClick={onCancel}>
                        {cancelLabel}
                    </Button>
                    <Button variant="accent" className="flex-1" onClick={onConfirm}>
                        {confirmLabel}
                    </Button>
                </div>
            </div>
        </div>
    );
}
