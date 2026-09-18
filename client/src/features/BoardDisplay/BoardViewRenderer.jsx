import { useBoardDisplayContext } from "./hooks/useBoardDisplayContext";
import Kanban from "./components/views/Kanban/Kanban"
import { KanbanProvider } from "./components/views/Kanban/KanbanContext";


export default function BoardViewSelector() {
    const { viewType } = useBoardDisplayContext();

    switch (viewType) {
        case "kanban":
            return <KanbanProvider>
                    <Kanban />
                </KanbanProvider>;

        default:
            return <KanbanProvider>
                <Kanban />
            </KanbanProvider>;
    }
}

