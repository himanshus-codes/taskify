import { useBoardDisplayContext } from "../hooks/useBoardDisplayContext"
import { useRef, useEffect } from "react";
export default function QuickCardPreview(){

    const { 
        tasks,
        columns,
        viewType, 
        quickPreviewTaskId,
        // isQuickCardPreviewOpen,
        closeQuickCardPreview,
        openQuickCardPreview,
        openMenu
    } = useBoardDisplayContext();

    
    const task = tasks.find(
        task => task._id === quickPreviewTaskId
    );
    
    console.log(task)
    
    const column = task
        ? columns.find(
            column => column._id === task.columnId
        )
        : null;

    const isQuickCardPreviewOpen = openMenu === "quickcardpreview" ? true : false  

    useEffect(() => {

        if (
            // isQuickCardPreviewOpen &&
            (openMenu === "quickcardpreview") &&
            quickPreviewTaskId &&
            !task
        ) {
            closeQuickCardPreview();
        }

    }, [
        task,
        quickPreviewTaskId,
        // isQuickCardPreviewOpen
        openMenu
    ]);

    const previewRef = useRef(null);

    useEffect(() => {

        if (
            // !isQuickCardPreviewOpen ||
            (openMenu != "quickcardpreview") ||
            !quickPreviewTaskId ||
            !task
        ) {
            return;
        }

        const animationFrame =
            requestAnimationFrame(() => {

                // --------------------------------
                // Find the selected card
                // --------------------------------

                const card = document.querySelector(
                    `[data-task-id="${quickPreviewTaskId}"]`
                );

                // --------------------------------
                // Find preview + Kanban container
                // --------------------------------

                const preview =
                    previewRef.current;

                const kanban =
                    document.querySelector(
                        ".kanban-scrollbar"
                    );

                if (
                    !card ||
                    !preview ||
                    !kanban
                ) {
                    return;
                }

                // --------------------------------
                // Find the column containing card
                // --------------------------------

                const column =
                    card.closest(
                        "[data-kanban-column]"
                    );

                if (!column) {
                    return;
                }

                // --------------------------------
                // Get geometry
                // --------------------------------

                const columnRect =
                    column.getBoundingClientRect();

                const previewRect =
                    preview.getBoundingClientRect();

                // --------------------------------
                // Space between column and preview
                // --------------------------------

                const gap = 16;

                const allowedRight =
                    previewRect.left - gap;

                const overlap =
                    columnRect.right -
                    allowedRight;

                // --------------------------------
                // Scroll only if column is
                // underneath preview
                // --------------------------------

                if (overlap > 0) {

                    const maxScroll =
                        kanban.scrollWidth -
                        kanban.clientWidth;

                    const targetScroll =
                        Math.min(
                            kanban.scrollLeft +
                            overlap,
                            maxScroll
                        );

                    kanban.scrollTo({
                        left: targetScroll,
                        behavior: "smooth"
                    });
                }

            });

        return () => {
            cancelAnimationFrame(
                animationFrame
            );
        };

    }, [
        quickPreviewTaskId,
        // isQuickCardPreviewOpen,
        openMenu,
        task
    ]);

    if (!task) {
        return null;
    }


return (
        <div
             ref={previewRef}
            className="
            absolute
            top-3
            right-3
            bottom-3

            w-100

            z-50

            bg-[#1e1d1d]
            border
            border-[#282525]
            rounded-md

            shadow-2xl

            flex
            flex-col

            overflow-hidden
            "
        >

            {/* Header */}
            <div
                className="
                    min-h-14
                    shrink-0
                    flex
                    items-center
                    justify-between
                    px-4
                    border-b
                    border-[#353333]
                "
            >
                {/* <div className="text-sm text-white/50">
                    Quick preview
                </div> */}

                <div className="px-1 pt-1 pb-1">

                    <h2
                        className="
                            text-lg
                            tracking-wider
                            font-semibold
                            leading-snug
                            text-white/90
                            wrap-break-word
                        "
                    >   
                        {column.title}
                    </h2>

                </div>


                <button
                    onClick={closeQuickCardPreview}
                    className="
                        w-8
                        h-8
                        flex
                        items-center
                        justify-center
                        rounded-md
                        text-white/50
                        hover:text-white
                        hover:bg-[#303030]
                        cursor-pointer
                    "
                >
                    ✕
                </button>
            </div>
            {/* Body */}
            <div
                className="
                    flex-1
                    min-h-0
                    overflow-y-auto
                    kanban-scrollbar
                    px-5
                    py-3
                "
            >

                {/* Title */}
                <div className="px-3">

                    <h2
                        className="
                            text-3xl
                            font-semibold
                            leading-snug
                            text-white
                            wrap-break-word
                        "
                    >
                        {task.title}
                    </h2>

                </div>


                {/* Information */}
                <div className="mt-7 px-3 space-y-6">

                    {/* List */}
                    <div>
                        <div className="text-xs text-white/40 mb-1">
                            List
                        </div>

                        <div className="text-sm text-white/75">
                            {column?.title || "Unknown list"}
                        </div>
                    </div>


                    {/* Priority */}
                    <div>
                        <div className="text-xs text-white/40 mb-2">
                            Priority
                        </div>

                        <span
                            className="
                                inline-flex
                                items-center
                                px-2.5
                                py-1
                                rounded-md
                                bg-white/10
                                text-sm
                                text-white/75
                            "
                        >
                            {task.priority}
                        </span>
                    </div>


                    {/* Description */}
                    <div>

                        <div className="text-xs text-white/40 mb-2">
                            Description
                        </div>

                        <div
                            className="
                                text-sm
                                leading-6
                                text-white/70
                                whitespace-pre-wrap
                                wrap-break-word
                            "
                        >
                            {task.description || "No description"}
                        </div>

                    </div>

                </div>

            </div>


            {/* Footer */}
            <div
                className="
                    shrink-0
                    border-t
                    border-[#353333]
                    p-4
                "
            >
                <button
                    className="
                        w-full
                        h-10
                        rounded-md
                        bg-[#303030]
                        hover:bg-[#383838]
                        text-sm
                        text-white/80
                        hover:text-white
                        cursor-pointer
                    "
                >
                    Open full card
                </button>
            </div>
            
        </div>
    );
}