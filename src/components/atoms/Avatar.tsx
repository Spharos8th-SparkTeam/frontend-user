type AvatarProps = {
    initial: string;
};

export function Avatar({ initial }: AvatarProps) {
    const letter = initial.slice(0, 1);

    return (
        <span
            role="img"
            aria-label={`사용자 ${letter}`}
            className="grid h-8 w-8 place-items-center rounded-full bg-[#49382F] text-sm font-medium text-white"
        >
            {letter}
        </span>
    );
}
