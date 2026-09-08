import { useBoardDisplayContext } from "../../../hooks/useBoardDisplayContext";


export function ShareMenuBtn() {

    const { openMenu, setOpenMenu } = useBoardDisplayContext();

    const isOpen = openMenu === "share";

    function toggleMenu() {
        setOpenMenu(isOpen ? null : "share");
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
                   width="16px" height="16px"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    color="#ffffff"
                >
                    <path
                        d="M20 13V19C20 20.1046 19.1046 21 18 21H6C4.89543 21 4 20.1046 4 19V13"
                        stroke="#ffffff"
                        strokeWidth="1.2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                    />

                    <path
                        d="M12 15V3M12 3L8.5 6.5M12 3L15.5 6.5"
                        stroke="#ffffff"
                        strokeWidth="1.2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                    />
                </svg>
            </div>
        </button>
    );
}


export function ShareMenu() {

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
                Share Link
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