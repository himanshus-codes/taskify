import { useState } from "react";

const initialItems = [
    {
        id: 1,
        text: "Build task detail layout",
        completed: true,
    },
    {
        id: 2,
        text: "Add sidebar tabs",
        completed: true,
    },
    {
        id: 3,
        text: "Integrate document editor",
        completed: false,
    },
    {
        id: 4,
        text: "Add attachments",
        completed: false,
    },
];

export default function ChecklistPanel() {

    const [items, setItems] = useState(initialItems);

    function toggleItem(id) {

        setItems(items =>
            items.map(item =>
                item.id === id
                    ? {
                        ...item,
                        completed: !item.completed,
                    }
                    : item
            )
        );
    }

    return (
        <div className="space-y-5 px-5">

            <div className="flex items-center justify-between">

                <div>
                    <h2 className="text-sm font-medium text-[#ddd8d8]">
                        Checklist
                    </h2>

                    <p className="mt-1 text-xs text-[#6f6a6a]">
                        Track smaller pieces of work.
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


            <div className="space-y-2">

                {items.map(item => (

                    <label
                        key={item.id}
                        className="
                            flex
                            cursor-pointer
                            items-start
                            gap-3
                            rounded-lg
                            border
                            border-[#292727]
                            bg-[#1c1b1b]
                            px-3
                            py-3
                        "
                    >

                        <input
                            type="checkbox"
                            checked={item.completed}
                            onChange={() => toggleItem(item.id)}
                            className="mt-0.5"
                        />

                        <span
                            className={`
                                text-xs
                                leading-5
                                ${
                                    item.completed
                                        ? "text-[#666161] line-through"
                                        : "text-[#bbb5b5]"
                                }
                            `}
                        >
                            {item.text}
                        </span>

                    </label>

                ))}

            </div>

        </div>
    );
}