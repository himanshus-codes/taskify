import { useBoardDisplayContext } from "./hooks/useBoardDisplayContext";
import Kanban from "./views/Kanban/Kanban"
import { KanbanProvider } from "./views/Kanban/KanbanContext"
import QuickCardPreview from "./views/Kanban/QuickCardPreview";

export default function BoardViewSelector() {
    
    const { 
        viewType, 
        isQuickCardPreviewOpen,
        openMenu 
        
    } = useBoardDisplayContext();

    // switch (viewType) {
    //     case "kanban":
    //         return <KanbanProvider>
    //                 <Kanban />
    //                 {/* card preview: here we can have  */}
    //             </KanbanProvider>;

    //     default:
    //         return <KanbanProvider>
    //             <Kanban />
    //         </KanbanProvider>;
    // }

 return (
        <div
            className="
                relative
                flex-1
                min-h-0
                min-w-0
            "
        >

            {viewType === "kanban" && (
                <KanbanProvider>
                            <Kanban />

                            {/* {isQuickCardPreviewOpen && ( */}

                            {openMenu === "quickcardpreview" && (
                                <QuickCardPreview />
                            )}
                </KanbanProvider>
            )}


        </div>
    );
// board views like.. calender, kanban, list, table etc etc.. where in clicking a card will open this
// card preview or even here; acting as a generic preview container for all kinds of
 

}

