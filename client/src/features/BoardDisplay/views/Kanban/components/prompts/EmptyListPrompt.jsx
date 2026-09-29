import ConfirmActionModal from "../ConfirmActionModal";
import { useBoardDisplayContext } from "../../../../hooks/useBoardDisplayContext";
import { useState } from "react";
export default function EmptyListPrompt({
    column,
    toggleEmptyListPrompt
}) {

    console.log("Hiiii Empty List Prompt")

    const {  deleteAllTasksByColumnId} = useBoardDisplayContext()

    // loading spinner state
    const [isDeleting, setIsDeleting] = useState(false);

    // error state while deleting
    const [error, setError] = useState("");
    
    async function onConfirm(){
            
        setIsDeleting(true);

        setError("");

        try {
            let columnId = column._id


            await deleteAllTasksByColumnId(columnId)

            // Close the prompt
            toggleEmptyListPrompt(null);

        } catch (e) {
            throw new Error(e.message || "Unable to empty list.");
        } finally {
            setIsDeleting(false);
        }
    }
    

    return (
        <ConfirmActionModal
            title={`Are you sure you want to empty ${column ? column.title : "this"} list?`}
            message="All tasks in this list will be deleted. This action can't be undone."
            onCancel={()=>{toggleEmptyListPrompt(null)}}
            onConfirm={onConfirm}
            confirmText="Delete"
        />
    );
}


{/* <EmptyColumnPrompt
    onCancel={closeEmptyPrompt}
    onConfirm={() => deleteAllTasksByColumnId(column._id)}
/> */}