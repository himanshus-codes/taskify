import { TaskPageProvider } from "./TaskPageContext";
import TaskPageLayout from "./TaskPageLayout"

export default function TaskPage() {
    return (
        <TaskPageProvider>
            <TaskPageLayout />
        </TaskPageProvider>
    );
}