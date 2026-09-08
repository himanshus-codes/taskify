import { useState } from "react";
import SearchResults from "./SearchResults";
export default function Search(){
    const [isSearchOpen, setSearch] = useState(false)

    return <div className="relative flex items-center">
            {!isSearchOpen ? (
        
            <button
                type="button"
                onClick={() => setSearch(true)}
                className="
                    flex
                    items-center
                    justify-center
                    rounded-sm
                    p-1.5
                    hover:bg-[#252424]
                "
            >
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1}
                    stroke="currentColor"
                    className="size-4"
                >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z"
                    />
                </svg>
            </button>

        ) : (

            <div className="
            flex
            items-center
            w-80
            h-7.5
            rounded-md
            border
            border-[#464343]
            bg-[#202020]
            group
        ">

        <div className="ml-2 size-4 text-[#aaa]">
            <svg  xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1} stroke="#feeeff" className="size-4">
                <path strokeLinecap="round" strokeLinejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
            </svg>
        </div>

        <input
            autoFocus
            type="text"
            placeholder="Search cards..."
            className="
                flex-1
                bg-transparent
                px-2
                text-[13px]
                text-[#eee]
                outline-none
                placeholder:text-[#686464]
            "
        />

        <button
            type="button"
            onClick={() => setSearch(false)}
            className="
                mr-1.5
                rounded
                p-[0.5px]
                text-[#aaa]
                hover:bg-[#353434]
                hidden
                group-hover:block
            "
        >
            <svg 
                width="15px"
                height="15px"
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
        
        {/* <SearchResults results={[{title:"wq2"}, {title:"dcd wq2"}]} /> */}
        <SearchResults results={[]} />
        </div>

        )}
    
    
    </div>

}