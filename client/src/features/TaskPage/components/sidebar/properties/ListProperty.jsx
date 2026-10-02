import { useTaskPageContext } from "../../../TaskPageContext";

import PropertyRow from "./PropertyRow";


export default function ListProperty() {

    const {
        parentColumn
    } = useTaskPageContext();


    return (
        <PropertyRow
            label="List"

            icon={
                <span className="text-[#777171] text-sm">
                    ^
                </span>
            }

            value={
                parentColumn?.title || "Unknown list"
            }
        />
    );
}