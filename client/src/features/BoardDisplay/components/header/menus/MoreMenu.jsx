import { useBoardDisplayContext } from "../../../hooks/useBoardDisplayContext";


export function MoreMenuBtn() {

    const { openMenu, setOpenMenu } = useBoardDisplayContext();

    const isOpen = openMenu === "more";

    function toggleMenu() {
        setOpenMenu(isOpen ? null : "more");
    }

    return (
        <button
            onClick={toggleMenu}
            className="
                flex
                justify-center
                items-center
                hover:bg-[#252424]
                p-1.5
                rounded-sm
            "
        >
            <div>
                <svg
                    width="18px"
                    height="18px"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    color="#ffffff"
                >
                    <path
                        d="M20 12.5C20.2761 12.5 20.5 12.2761 20.5 12C20.5 11.7239 20.2761 11.5 20 11.5C19.7239 11.5 19.5 11.7239 19.5 12C19.5 12.2761 19.7239 12.5 20 12.5Z"
                        fill="#ffffff"
                        stroke="#ffffff"
                        strokeWidth="1.7"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                    />

                    <path
                        d="M12 12.5C12.2761 12.5 12.5 12.2761 12.5 12C12.5 11.7239 12.2761 11.5 12 11.5C11.7239 11.5 11.5 11.7239 11.5 12C11.5 12.2761 11.7239 12.5 12 12.5Z"
                        fill="#ffffff"
                        stroke="#ffffff"
                        strokeWidth="1.7"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                    />

                    <path
                        d="M4 12.5C4.27614 12.5 4.5 12.2761 4.5 12C4.5 11.7239 4.27614 11.5 4 11.5C3.72386 11.5 3.5 11.7239 3.5 12C3.5 12.2761 3.72386 12.5 4 12.5Z"
                        fill="#ffffff"
                        stroke="#ffffff"
                        strokeWidth="1.7"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                    />
                </svg>
            </div>
        </button>
    );
}


export function MoreMenu() {

    const { setOpenMenu } = useBoardDisplayContext();


    return (
        <div
            className="
                relative
                group
                w-full
                rounded-sm
                border
                border-[#363434]
                bg-[#292828]
                shadow-xl
                p-2
            "
        >

            {/* Close button */}

            <button
                type="button"
                aria-label="Close"
                className="
                    absolute
                    right-1
                    top-1
                    p-1
                    rounded-sm
                    hover:bg-white/5
                    group-hover:block
                    hidden
                "
                onClick={() => setOpenMenu(null)}
            >
                <svg
                    width="14px"
                    height="14px"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                >
                    <path
                        d="M6.75827 17.2426L12.0009 12M17.2435 6.75736L12.0009 12M12.0009 12L6.75827 6.75736M12.0009 12L17.2435 17.2426"
                        stroke="#e3e3e3"
                        strokeWidth="1.2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                    />
                </svg>
            </button>


            {/* Menu heading */}

            <div
                className="
                    px-3
                    py-2
                    text-xs
                    text-[#8f8b8b]
                "
            >
                More Settings
            </div>


            {/* Options */}

            <div
                className="
                    px-3
                    py-2
                    text-xs
                    text-[#e6dede]
                "
            >
                Upcoming feature!
            </div>

        </div>
    );
}