type PaginationProps = {
    page: number;
    pageCount: number;
    previousLabel?: string;
    nextLabel?: string;
    onPageChange: (page: number) => void;
};

export function Pagination({
    page,
    pageCount,
    previousLabel = "이전",
    nextLabel = "다음",
    onPageChange,
}: PaginationProps) {
    const pages = Array.from({ length: pageCount }, (_, index) => index + 1);

    return (
        <nav aria-label="페이지" className="flex items-center justify-center gap-2">
            <button
                type="button"
                disabled={page <= 1}
                onClick={() => onPageChange(page - 1)}
                className="px-2 text-sm text-[#49382F] disabled:text-[#49382F]"
            >
                {previousLabel}
            </button>
            {pages.map((pageNumber) => {
                const current = pageNumber === page;

                return (
                    <button
                        key={pageNumber}
                        type="button"
                        aria-current={current ? "page" : undefined}
                        onClick={() => onPageChange(pageNumber)}
                        className={
                            current
                                ? "flex h-8 w-8 items-center justify-center rounded-full bg-[#BA5847] text-sm text-white"
                                : "flex h-8 w-8 items-center justify-center text-sm text-[#6F675F]"
                        }
                    >
                        {pageNumber}
                    </button>
                );
            })}
            <button
                type="button"
                disabled={page >= pageCount}
                onClick={() => onPageChange(page + 1)}
                className="px-2 text-sm text-[#49382F] disabled:text-[#49382F]"
            >
                {nextLabel}
            </button>
        </nav>
    );
}
