import ConfirmActionModal from "../ConfirmActionModal";
import { useBoardDisplayContext } from "../../../../../hooks/useBoardDisplayContext";
import { useState } from "react";

export default function DeleteListPrompt({
    column,
    toggleDeleteListPrompt
}) {

    // Imp Addition: once a list is deleted where and how should current scroll position move/ view port

    const { deleteColumn } = useBoardDisplayContext()

    // loading spinner state
    const [isDeleting, setIsDeleting] = useState(false);

    // error state while deleting
    const [error, setError] = useState("");
    
    async function onConfirm(){

        console.log("deleting")    
        setIsDeleting(true);
        setError("");

        try {
            let columnId = column._id

            await deleteColumn(columnId)

            // Close the prompt
            toggleDeleteListPrompt(null);

        } catch (e) {
            throw new Error(e.message || "Unable to delete list.");
        } finally {
            setIsDeleting(false);
        }
    }
    
    

    console.log("Hiiii Del List Prompt")

    return (
        <ConfirmActionModal
            title={`Are you sure you want permanently delete the ${column ? column.title : "this"} list?`}
            message="This will permanently delete the list and all tasks in it. This action can't be undone."
            onCancel={()=>{toggleDeleteListPrompt(null)}}
            onConfirm={onConfirm}
            confirmText="Delete"
        />
    );
}

{/* <DeleteListPrompt
    columnTitle={column.title}
    onCancel={closeDeletePrompt}
    onConfirm={() => deleteColumn(column._id)}
/> */}