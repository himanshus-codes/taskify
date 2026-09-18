

export default function ColumnMenu({column, toggleColMoreMenu, toggleDeleteListPrompt, toggleEmptyListPrompt}){

    console.log(`Hiiii Open Col Menu "${column.title}"`)

    return <>
        <div
            className="
                absolute
                left-70
                z-60
                group
                w-70
                rounded-sm
                border
                border-[#363434]
                bg-[#292828]
                shadow-xl
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
                onClick={() => toggleColMoreMenu(column._id)}
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
                    text-xs
                    mt-2
                    mb-2
                    text-[#969292]
                    text-center
                "
            >
                List Options
            </div>


            {/* Options */}

            <div
                className="
                    flex
                    flex-col
                    mb-1
                    mt-1
                    text-xs
                    text-[#e6dede]
                "
            >
                <div onClick={()=>toggleDeleteListPrompt(column)} className=" p-1.5 px-3 hover:bg-[#3b3737] w-full h-fit cursor-pointer ">Delete List</div>
                <div onClick={()=>toggleEmptyListPrompt(column)} className="p-1.5 px-3  hover:bg-[#3b3737] w-full h-fit cursor-pointer  ">Empty List</div>
            </div>

        </div>
    </>
}