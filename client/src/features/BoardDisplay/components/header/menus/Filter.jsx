import { useBoardDisplayContext } from "../../../hooks/useBoardDisplayContext";


export function FilterMenuBtn() {

    const { openMenu, setOpenMenu } = useBoardDisplayContext();

    const isOpen = openMenu === "filter";

    function toggleMenu() {
        setOpenMenu(isOpen ? null : "filter");
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
                        d="M3.99961 3H19.9997C20.552 3 20.9997 3.44764 20.9997 3.99987L20.9999 5.58569C21 5.85097 20.8946 6.10538 20.707 6.29295L14.2925 12.7071C14.105 12.8946 13.9996 13.149 13.9996 13.4142L13.9996 19.7192C13.9996 20.3698 13.3882 20.8472 12.7571 20.6894L10.7571 20.1894C10.3119 20.0781 9.99961 19.6781 9.99961 19.2192L9.99961 13.4142C9.99961 13.149 9.89425 12.8946 9.70672 12.7071L3.2925 6.29289C3.10496 6.10536 2.99961 5.851 2.99961 5.58579V4C2.99961 3.44772 3.44732 3 3.99961 3Z"
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


export function FilterMenu() {

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
                Select Filter
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