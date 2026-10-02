import { useTaskPageContext } from "../../../TaskPageContext";

import PropertyRow from "./PropertyRow.jsx";
import DateInput from "./datePicker/DateInput.jsx";


export default function DatesProperty() {

    const {
        task,
        updateTaskProperty,
    } = useTaskPageContext();


    if (!task) {
        return null;
    }


    async function handleStartDateChange(date) {

        try {

            await updateTaskProperty({
                startDate: date
            });

        } catch (error) {

            console.error(
                "Failed to update start date:",
                error
            );
        }
    }


    async function handleTargetDateChange(date) {

        try {

            await updateTaskProperty({
                targetDate: date
            });

        } catch (error) {

            console.error(
                "Failed to update target date:",
                error
            );
        }
    }


    return (
        <PropertyRow
            label="Dates"

            icon={
                <span className="text-[#777171] text-sm">
                    ▣
                </span>
            }

            value={
                <div className="flex items-center gap-2">

                    <DateInput
                        value={task.startDate}
                        placeholder="Start"
                        onChange={handleStartDateChange}
                    />

                    <span className="text-[#777171]">
                        →
                    </span>

                    <DateInput
                        value={task.targetDate}
                        placeholder="Target"
                        onChange={handleTargetDateChange}
                    />

                </div>
            }

            muted
        />
    );
}