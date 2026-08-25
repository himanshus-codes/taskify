
import { useAppShellUiContext } from "../../hooks/useAppShellUiContext";
import BoardHeader from "./components/header/BoardHeader";
import BoardViewSelector from "./BoardViewRenderer";

function BoardViewLayout() {
    const {
        closeProfileOtpnsTab,
        closeWorkspaceOtpnsTab
    } = useAppShellUiContext();


    return (
        <div
            className="
                bg-[#181717]
                flex
                flex-col
                text-[#d2cbcb]
               
                grow
                min-h-0
                rounded-lg
                overflow-hidden
                border-[0.1px]
                border-[#2f2d2d]
            "
            onClick={() => {
                closeProfileOtpnsTab();
                closeWorkspaceOtpnsTab();
            }}
        >
            <BoardHeader />

            <hr className="
                mr-7
                ml-7
                mt-2
                border-0
                border-t
                border-[#2b2b2c]
            " />

            <BoardViewSelector/>
        </div>
    );
}

export default BoardViewLayout



// help/info label on hover (setting option to turn off sidebar, list, card labels etc)
// custom card views (due, created, member, label, desc, priority, notifs, alert(ovedue) (something like notion))
// current selection state and higlighting of current selection, for example, filter selected, sort selected, change view menu opened so (highlight on change view button)
// implementation of trash
// ticket id cocept per card