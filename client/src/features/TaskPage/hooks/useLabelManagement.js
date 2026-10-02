import {
    updateLabel as updateLabelApi,
    deleteLabel as deleteLabelApi
} from "../../../services/labelService";


export function useLabelManagement({
    task,
    labels,
    setTask,
    setLabels,
    token
}) {

    // =========================================================
    // UPDATE BOARD LABEL
    // =========================================================

    async function updateBoardLabel(
        labelId,
        updates
    ) {

        // -----------------------------------------
        // Keep previous state for rollback
        // -----------------------------------------

        const previousLabels =
            labels;


        // -----------------------------------------
        // Optimistic update
        // -----------------------------------------

        const updatedLabels =
            labels.map(label =>
                String(label._id) ===
                String(labelId)

                    ? {
                        ...label,
                        ...updates
                    }

                    : label
            );


        setLabels(
            updatedLabels
        );


        try {

            const response =
                await updateLabelApi(
                    token,
                    labelId,
                    updates
                );


            // -------------------------------------
            // Use server representation
            // -------------------------------------

            if (response.data) {

                setLabels(
                    previousLabels =>
                        previousLabels.map(label =>
                            String(label._id) ===
                            String(labelId)

                                ? response.data

                                : label
                        )
                );
            }


            return response;

        } catch (error) {

            // -------------------------------------
            // Rollback
            // -------------------------------------

            setLabels(
                previousLabels
            );

            throw error;
        }
    }


    // =========================================================
    // DELETE BOARD LABEL
    // =========================================================

    async function deleteBoardLabel(
        labelId
    ) {

        // -----------------------------------------
        // Keep previous state for rollback
        // -----------------------------------------

        const previousLabels =
            labels;

        const previousTask =
            task;


        // -----------------------------------------
        // Optimistic label removal
        // -----------------------------------------

        setLabels(
            previousLabels =>
                previousLabels.filter(
                    label =>
                        String(label._id) !==
                        String(labelId)
                )
        );


        // -----------------------------------------
        // Keep current task UI consistent
        // -----------------------------------------

        setTask(
            previousTask => {

                if (!previousTask) {
                    return previousTask;
                }


                return {
                    ...previousTask,

                    labels: (
                        previousTask.labels ||
                        []
                    ).filter(
                        id =>
                            String(id) !==
                            String(labelId)
                    )
                };
            }
        );


        try {

            const response =
                await deleteLabelApi(
                    token,
                    labelId
                );


            return response;

        } catch (error) {

            // -------------------------------------
            // Rollback
            // -------------------------------------

            setLabels(
                previousLabels
            );

            setTask(
                previousTask
            );

            throw error;
        }
    }


    return {
        updateBoardLabel,
        deleteBoardLabel
    };
}