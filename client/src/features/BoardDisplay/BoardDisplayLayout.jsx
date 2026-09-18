import BoardHeader from "./components/header/BoardHeader";
import BoardViewRenderer from "./BoardViewRenderer";


function BoardViewLayout() {
 
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
                mr-9
                ml-9
                mt-1
                border-0
                border-t
                border-[#1c1b1b]
            " />

                <BoardViewRenderer/> {/* Throws in Kanban Component */}


        </div>
    );
}

export default BoardViewLayout



// help/info label on hover (setting option to turn off sidebar, list, card labels etc)
// custom card views (due, created, member, label, desc, priority, notifs, alert(ovedue) (something like notion))
// current selection state and higlighting of current selection, for example, filter selected, sort selected, change view menu opened so (highlight on change view button)
// implementation of trash
// ticket id cocept per card