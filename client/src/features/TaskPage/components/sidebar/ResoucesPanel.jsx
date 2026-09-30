export default function ResourcesPanel() {

    return (
        <div className="space-y-5 px-5">

            <div className="flex items-center justify-between">

                <div>
                    <h2 className="text-sm font-medium text-[#ddd8d8]">
                        Resources
                    </h2>

                    <p className="mt-1 text-xs text-[#6f6a6a]">
                        Files, linked tasks and external links.
                    </p>
                </div>

                <button
                    type="button"
                    className="
                        rounded-md
                        border
                        border-[#2b2929]
                        px-2
                        py-1
                        text-xs
                        text-[#8f8989]
                        hover:bg-[#252323]
                        hover:text-[#d2cccc]
                    "
                >
                    + Add
                </button>

            </div>


            {/* File */}
            <ResourceCard
                type="file"
                title="requirements.pdf"
                subtitle="PDF · 1.8 MB"
            />

            {/* Linked task */}
            <ResourceCard
                type="task"
                title="Implement authentication"
                subtitle="Task · In Progress"
            />

            {/* Link */}
            <ResourceCard
                type="link"
                title="Project documentation"
                subtitle="https://example.com"
            />

        </div>
    );
}


function ResourceCard({
    type,
    title,
    subtitle,
}) {

    return (
        <button
            type="button"
            className="
                flex
                w-full
                items-center
                gap-3
                rounded-lg
                border
                border-[#292727]
                bg-[#1c1b1b]
                px-3
                py-3
                text-left
                hover:bg-[#222020]
            "
        >

            <div
                className="
                    flex
                    h-8
                    w-8
                    shrink-0
                    items-center
                    justify-center
                    rounded-md
                    bg-[#272525]
                    text-xs
                    text-[#aaa4a4]
                "
            >
                {type === "file" && "F"}
                {type === "task" && "#"}
                {type === "link" && "↗"}
            </div>


            <div className="min-w-0">

                <div
                    className="
                        truncate
                        text-xs
                        text-[#c7c1c1]
                    "
                >
                    {title}
                </div>

                <div
                    className="
                        mt-1
                        truncate
                        text-[10px]
                        text-[#686363]
                    "
                >
                    {subtitle}
                </div>

            </div>

        </button>
    );
}