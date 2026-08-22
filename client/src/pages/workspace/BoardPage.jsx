import BoardViewLayout from "../../components/AppShell/BoardViewLayout";
import BoardProvider from "../../context/BoardContext";

export default function BoardPage() {
    return (
        <BoardProvider>
            <BoardViewLayout />
        </BoardProvider>
    );
}