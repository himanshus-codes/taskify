import BoardDisplayLayout from "../../features/BoardDisplay/BoardDisplayLayout";
import BoardDisplayProvider from "../../features/BoardDisplay/BoardDisplayContext";

export default function BoardPage() {
    return (
        <BoardDisplayProvider>
            <BoardDisplayLayout />
        </BoardDisplayProvider>
    );
}