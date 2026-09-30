import TaskActivity from "./TaskActivity";
import { useTaskPageContext } from "../TaskPageContext";

export default function TaskMainContent() {

    const { task } = useTaskPageContext();

    return (
        <div className="mx-auto w-full max-w-4xl px-20 py-10">


            {/* Top Section */}

            <section>
                <div className="pb-10">
                               
                    {/* Title */}
                    <h1
                        className="
                            text-xl
                            font-semibold
                            tracking-tight
                            text-[#f0eded]
                        "
                    >
                        {task.title}
                    </h1>


                    {/* Summary */}
                    <p
                        className="
                            mt-2
                            max-w-3xl
                            text-sm
                            leading-6
                            text-[#898484]
                        "
                    >
                        {task.summary}
                    </p>

                </div>
            </section>
            {/* Document content */}
            <section>


                    {/* <div
                        className="
                            mb-5
                            text-xs
                            uppercase
                            tracking-wider
                            text-[#625e5e]
                        "
                    >
                        Page Content
                    </div> */}


                    {/* Temporary editor placeholder */}
                    <div className="space-y-5">

                        <h2
                            className="
                                text-xl
                                font-semibold
                                text-[#efebeb]
                            "
                        >
                            Requirements
                        </h2>

                        <p
                            className="
                                text-sm
                                leading-7
                                text-[#aaa5a5]
                            "
                        >
                            This is where the rich document editor will go.
                            The task content will eventually support headings,
                            lists, code blocks, checklists and attachments.
                        </p>

                        <h3
                            className="
                                text-lg
                                font-medium
                                text-[#ddd7d7]
                            "
                        >
                            Current Goal
                        </h3>

                        <ul
                            className="
                                ml-5
                                list-disc
                                space-y-2
                                text-sm
                                leading-6
                                text-[#999393]
                            "
                        >
                            <li>Build task detail layout</li>
                            <li>Add sidebar sections</li>
                            <li>Replace this with rich text editor</li>
                        </ul>

                    </div>


            </section>
            
            <hr className="
                mt-20
                py-2
               
                border-[#1e1d1d]
                "/>

            {/* Activity */}
            <TaskActivity />

        </div>
    );
}