import { useTaskPageContext } from "../../../TaskPageContext";

import PropertyRow from "./PropertyRow";


export default function CreatedProperty() {

    const { task } = useTaskPageContext();


    if (!task) {
        return null;
    }


    return (
        <PropertyRow
            label="Created"

            icon={
                <span className="text-[#777171] text-sm">
                    ◷
                </span>
            }

            value={formatTaskDate(task.createdAt)}
        />
    );
}


function formatTaskDate(date) {

    if (!date) {
        return "—";
    }

    return new Date(date).toLocaleDateString(
        "en-IN",
        {
            day: "numeric",
            month: "short",
            year: "numeric"
        }
    );
}