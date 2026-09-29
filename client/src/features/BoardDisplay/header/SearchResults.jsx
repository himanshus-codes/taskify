export default function SearchResults({ results = [] }) {

    return (
        <div
            className="
                absolute
                top-full
                right-0
                mt-2
                w-80
                max-h-96
                overflow-y-auto
                rounded-sm
                border
                border-[#3b3939]
                bg-[#292828]
                shadow-xl
                z-50
                p-2
            "
        >

            {/* Heading */}
            <div className="
                px-2
                py-2
                text-xs
                font-medium
                text-[#8f8b8b]
            ">
                Search results
            </div>


            {results.length === 0 ? (

                <div className="
                    px-3
                    py-6
                    text-center
                    text-sm
                    text-[#888484]
                ">
                    No results found
                </div>

            ) : (

                <div className="flex flex-col gap-1">

                    {results.map((result) => (

                        <button
                            key={result._id}
                            type="button"
                            className="
                                w-full
                                rounded-md
                                px-3
                                py-1
                                text-left
                                hover:bg-[#343333]
                            "
                        >
                            <div className="
                                text-xs
                                text-[#e3e0e0]
                            ">
                                {result.title}
                            </div>

                        </button>

                    ))}

                </div>

            )}

        </div>
    );
}