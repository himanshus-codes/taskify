import { useBoardDisplayContext } from "./hooks/useBoardDisplayContext";
import Kanban from "./components/views/Kanban"


export default function BoardViewSelector() {
    const { viewType } = useBoardDisplayContext();

    switch (viewType) {
        case "kanban":
            return <Kanban />;

        default:
            return <Kanban />;
    }
}

