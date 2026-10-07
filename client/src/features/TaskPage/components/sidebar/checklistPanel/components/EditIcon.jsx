export default function EditIcon({
    onClick,
    disabled = false
}) {

    return (
        <button
            type="button"
            aria-label="Edit"
            title="Edit"
            disabled={disabled}
            onClick={onClick}
            className="
                h-5
                w-5
                shrink-0
                items-center
                justify-center
                rounded
                text-[#686363]
                hover:bg-[#252323]
                hover:text-[#aaa4a4]
                disabled:cursor-default
                disabled:opacity-40
                hidden
                group-hover:flex
            "
        >
            <svg
                width="14"
                height="14"
                viewBox="0 0 24 24"
                fill="none"
            >
                <path
                    d="M4 20h4L19.5 8.5a2.12 2.12 0 0 0-3-3L5 17v3Z"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                />
            </svg>
        </button>
    );
}