import { useState } from "react";

export default function NewTaskForm({
    columnId,
    columnTitle,
    closeForm,
    openForm,
    createNewTask
}) {

    console.log(columnTitle)
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [priority, setPriority] = useState("medium");

    const [isCreating, setIsCreating] = useState(false);
    const [error, setError] = useState("");

    async function handleCreateTask(e) {

        e.preventDefault();

        setError("");

        const trimmedTitle = title.trim();
        const trimmedDescription = description.trim();

        if (!trimmedTitle) {
            setError("Task title is required.");
            return;
        }

        if (!trimmedDescription) {
            setError("Task description is required.");
            return;
        }

        try {

            setIsCreating(true);

            await createNewTask(columnId, {
                title: trimmedTitle,
                description: trimmedDescription,
                priority
            });

            closeForm();

        } catch (e) {

            console.log(e);

            setError(
                e.message || "Unable to create task."
            );

        } finally {

            setIsCreating(false);

        }
    }

    return (
        <div
            className="
                absolute
                inset-0
                z-70
                flex
                justify-center
                pointer-events-none
                bg-black/20
            "
        >

            <div
                className="
                    relative
                    h-fit
                    w-160
                    max-w-[calc(100%-2rem)]
                    rounded-lg
                    border
                    border-[#3b3939]
                    bg-[#292828]
                    shadow-xl
                    pointer-events-auto
                    flex
                    flex-col
                    gap-2
                    p-6
                "
            >

                {/* Close */}
                <button
                    type="button"
                    onClick={()=>{closeForm()}}
                    className="
                        absolute
                        right-3
                        top-3
                        rounded-sm
                        p-1
                        text-[#aaa5a5]
                        hover:bg-white/5
                        hover:text-white
                        disabled:opacity-50
                    "
                >
                    <svg
                        width="20"
                        height="20"
                        viewBox="0 0 24 24"
                        fill="none"
                    >
                        <path
                            d="M6.758 17.243L12 12M17.243 6.757L12 12M12 12L6.758 6.757M12 12L17.243 17.243"
                            stroke="currentColor"
                            strokeWidth="1.2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        />
                    </svg>
                </button>


                {/* Heading */}
                <div className="pr-8">

                    <div className="text-[13px] text-[#969292]">
                        {columnTitle}
                    </div>

                    <h2 className="
                        text-lg
                        font-medium
                        text-[#f1eeee]
                    ">
                        New card
                    </h2>

                </div>


                <form
                    onSubmit={handleCreateTask}
                    className="flex flex-col gap-4"
                >

                    {/* Title */}
                    <div className="flex flex-col gap-1.5">

                        <label
                            htmlFor="task-title"
                            className="text-sm text-[#d2cbcb]"
                        >
                            Title
                        </label>

                        <input
                            id="task-title"
                            type="text"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            placeholder="Enter task title"
                            autoFocus
                            disabled={isCreating}
                            className="
                                w-full
                                rounded-md
                                border
                                border-[#464343]
                                bg-[#202020]
                                px-3
                                py-2
                                text-sm
                                text-[#eeeeee]
                                outline-none
                                placeholder:text-[#686464]
                                focus:border-[#6662a8]
                            "
                        />

                    </div>


                    {/* Description */}
                    <div className="flex flex-col gap-1.5">

                        <label
                            htmlFor="task-description"
                            className="text-sm text-[#d2cbcb]"
                        >
                            Description
                        </label>

                        <textarea
                            id="task-description"
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            placeholder="Describe this task"
                            disabled={isCreating}
                            rows={5}
                            className="
                                w-full
                                resize-none
                                rounded-md
                                border
                                border-[#464343]
                                bg-[#202020]
                                px-3
                                py-2
                                text-sm
                                text-[#eeeeee]
                                outline-none
                                placeholder:text-[#686464]
                                focus:border-[#6662a8]
                            "
                        />

                    </div>


                    {/* Priority */}
                    <div className="flex flex-col gap-1.5">

                        <label
                            htmlFor="task-priority"
                            className="text-sm text-[#d2cbcb]"
                        >
                            Priority
                        </label>

                        <select
                            id="task-priority"
                            value={priority}
                            onChange={(e) => setPriority(e.target.value)}
                            disabled={isCreating}
                            className="
                                w-full
                                rounded-md
                                border
                                border-[#464343]
                                bg-[#202020]
                                px-3
                                py-2
                                text-sm
                                text-[#eeeeee]
                                outline-none
                                focus:border-[#6662a8]
                            "
                        >
                            <option value="low">
                                Low
                            </option>

                            <option value="medium">
                                Medium
                            </option>

                            <option value="high">
                                High
                            </option>

                        </select>

                    </div>


                    {/* Error */}
                    {error && (
                        <div className="text-sm text-red-400">
                            {error}
                        </div>
                    )}


                    {/* Actions */}
                    <div className="
                        flex
                        justify-end
                        gap-2
                        pt-2
                    ">

                        <button
                            type="button"
                            onClick={closeForm}
                            disabled={isCreating}
                            className="
                                rounded-md
                                px-4
                                py-2
                                text-sm
                                text-[#d2cbcb]
                                hover:bg-[#353333]
                                hover:text-[#ede9e9]
                                disabled:opacity-50
                            "
                        >
                            Cancel
                        </button>

                        <button
                            type="submit"
                            disabled={
                                isCreating ||
                                !title.trim() ||
                                !description.trim()
                            }
                            className="
                                rounded-md
                                bg-[#243b78]
                                px-4
                                py-2
                                text-sm
                                text-white
                                hover:bg-[#2d498f]
                                disabled:cursor-not-allowed
                                disabled:opacity-50
                            "
                        >
                            {isCreating
                                ? "Creating..."
                                : "Create card"
                            }
                        </button>

                    </div>

                </form>

            </div>

        </div>
    );
}