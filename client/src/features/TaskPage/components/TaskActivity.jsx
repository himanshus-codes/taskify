export default function TaskActivity() {

    return (
        <section className="mt-5">

            <h2
                className="
                    mb-6
                    text-lg
                    font-medium
                    text-[#e5e0e0]
                "
            >
                Activity
            </h2>


            {/* Comment box */}
            <div
                className="
                    rounded-lg
                    border
                    border-[#2e2b2b]
                    bg-[#1d1c1c]
                    p-4
                "
            >

                <textarea
                    rows={4}
                    placeholder="Write a comment..."
                    className="
                        w-full
                        resize-none
                        bg-transparent
                        text-sm
                        leading-1.5
                        text-[#e8e3e3]
                        outline-none
                        placeholder:text-[#666161]
                    "
                />

                <div className="mt-3 flex justify-end">

                    <button
                        type="button"
                        className="
                            rounded-md
                            bg-[#243b78]
                            px-4
                            py-2
                            text-sm
                            text-white
                            hover:bg-[#2d498f]
                        "
                    >
                        Comment
                    </button>

                </div>

            </div>


            {/* Mock activity */}
            <div className="mt-5 space-y-4 ">

                <div className="text-sm text-[#858080]">
                    <span className="text-[#c7c1c1]">
                        Himanshu
                    </span>{" "}
                    created this task.
                </div>

                <div className="text-sm text-[#858080]">
                    Status changed to{" "}
                    <span className="text-[#c7c1c1]">
                        In Progress
                    </span>
                </div>

            </div>

        </section>
    );
}