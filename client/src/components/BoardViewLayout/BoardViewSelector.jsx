import { useBoardContext } from "../../hooks/useBoardContext";
import Kanban from "./Views/Kanban"


export default function BoardViewSelector() {
    const { viewType } = useBoardContext();

    switch (viewType) {
        case "kanban":
            return <Kanban />;

        default:
            return <Kanban />;
    }
}

