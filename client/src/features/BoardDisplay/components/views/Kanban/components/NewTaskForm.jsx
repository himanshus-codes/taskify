import { useState } from "react";

export default function NewTaskForm({
    columnId,
    columnTitle,
    createNewTask,
    toggleNewTaskForm
}) {

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

            toggleNewTaskForm();

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
                fixed
                inset-0
                z-70
                flex
                items-center
                justify-center
                bg-black/40
            "
        >

            {/* Form card */}
            <div
                className="
                    relative
                    h-fit
                    w-160
                    max-w-[calc(100%-2rem)]
                    rounded-md
                    border
                    border-[#3b3939]
                    bg-[#292828]
                    shadow-xl
                    flex
                    flex-col
                    gap-2
                    p-6
                "
            >

                {/* Close */}
                <button
                    type="button"
                    disabled={isCreating}
                    onClick={toggleNewTaskForm}
                    className="
                        absolute
                        right-3
                        top-3
                        rounded-sm
                        p-1
                        text-[#aaa5a5]
                        hover:bg-white/5
                        hover:text-white
                        disabled:cursor-not-allowed
                        disabled:opacity-50
                    "
                >
                    <svg
                        width="20px"
                        height="20px"
                        viewBox="0 0 24 24"
                        fill="none"
                    >
                        <path
                            d="
                                M6.758 17.243L12 12
                                M17.243 6.757L12 12
                                M12 12L6.758 6.757
                                M12 12L17.243 17.243
                            "
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


                {/* Form */}
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
                                rounded-sm
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
                            rows={3}
                            className="
                                w-full
                                resize-none
                                rounded-sm
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
                                rounded-sm
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
                    {/* {error && (
                        <div className="text-sm text-red-400">
                            {error}
                        </div>
                    )} */}

                    {/* Error */}
                    <div className="min-h-5 text-sm text-red-400">
                        {error}
                    </div>


                    {/* Actions */}
                    <div className="
                        flex
                        justify-end
                        gap-2
                        pt-2
                    ">

                        <button
                            type="button"
                            onClick={toggleNewTaskForm}
                            disabled={isCreating}
                            className="
                                rounded-sm
                                px-4
                                py-2
                                text-sm
                                text-[#d2cbcb]
                                hover:bg-[#353333]
                                hover:text-[#ede9e9]
                                disabled:cursor-not-allowed
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
                                min-w-24
                                rounded-sm
                                bg-[#243b78]
                                px-4
                                py-2
                                text-sm
                                text-white
                                hover:bg-[#2d498f]
                                disabled:cursor-not-allowed
                                disabled:opacity-70
                                flex
                                items-center
                                justify-center
                            "
                        >

                            {isCreating ? (
                                <span
                                    className="
                                        h-4
                                        w-4
                                        animate-spin
                                        rounded-full
                                        border-2
                                        border-white/30
                                        border-t-white
                                    "
                                />
                            ) : (
                                "Create card"
                            )}

                        </button>

                    </div>

                </form>

            </div>

        </div>
    );
}