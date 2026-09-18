import { useState } from "react";
import { useBoardDisplayContext } from "../../../../hooks/useBoardDisplayContext";

export default function QuickAddTask({ columnId, isAdding, toggleQuickAddTask }) {
    const { createNewTask } = useBoardDisplayContext();

    const [title, setTitle] = useState("");

    function openForm() {
        toggleQuickAddTask(columnId);
    }

    function closeForm() {
        toggleQuickAddTask(null);
        setTitle("");
    }

    async function handleSubmit() {
        const trimmedTitle = title.trim();

        if (!trimmedTitle) {
            return;
        }

        await createNewTask(columnId, {
            title: trimmedTitle
        });

        closeForm();
    }

    function handleKeyDown(e) {
        if (e.key === "Enter") {
            handleSubmit();
        }
        if (e.key === "Escape") {
            closeForm();
        }
    }

    return (
        <>
           
            {isAdding ? (
                <QuickAddTaskForm 
                    title={title} 
                    setTitle={setTitle} 
                    closeForm={closeForm} 
                    handleKeyDown={handleKeyDown} 
                    handleSubmit={handleSubmit} 
                />
            ) : (
                <QuickAddTaskButton openForm={openForm} />
            )}
        </>
    );
}


function QuickAddTaskButton({ openForm }) {
    return (
        <div
            onClick={openForm}
            className="mr-1 flex items-center gap-2 px-1 py-1.5 text-sm text-gray-400 hover:text-gray-200 hover:bg-[#222121] rounded-sm cursor-pointer"
        >
            <span className="text-lg leading-none">+</span >
            <span>Add a card</span>
        </div>
    );
}


function QuickAddTaskForm({ title, setTitle, closeForm, handleKeyDown, handleSubmit }) {
    return (
        <div className="flex flex-col gap-2 pr-1 mb-1">
            <input
                autoFocus
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Enter a title or paste a link"
                className="w-full bg-[#242528] text-white placeholder:text-gray-400 rounded-sm px-3 py-1.5 outline-none border text-sm border-transparent focus:border-[#4c4d4f]"
            />

            <div className="flex items-center gap-3 ">
                <button
                    type="button"
                    onClick={handleSubmit}
                    className="px-3 py-0.5 bg-blue-800 hover:bg-blue-600 text-gray-300 rounded-sm text-sm"
                >
                    Add card
                </button>

                <button
                    type="button"
                    onClick={closeForm}
                    className="flex items-center justify-center text-gray-400 hover:text-white text-xl leading-none p-0 -translate-y-0.5 rounded-sm"
                >
                    ×
                </button>
            </div>
        </div>
    );
}