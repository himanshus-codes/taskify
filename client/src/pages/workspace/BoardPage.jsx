import BoardLayout from "../../layout/BoardLayout";
import BoardProvider from "../../context/BoardContext";

export default function BoardPage() {
    return (
        <BoardProvider>
            <BoardLayout />
        </BoardProvider>
    );
}