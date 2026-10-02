import {
    useEffect,
    useState
} from "react";

import { useParams } from "react-router-dom";

import {
    getTaskDetails as getTaskApi
} from "../../../services/taskService";

import {
    getColumnDetails as getColumnApi
} from "../../../services/listService";

import {
    getBoard as getBoardApi
} from "../../../services/boardService";

import {
    getLabels
} from "../../../services/labelService";

import {
    getChecklists as getChecklistsApi
} from "../../../services/checklistService";

import { useAuth } from "../../../context/AuthContext";


export function useTaskPageData() {

    const { token } = useAuth();

    const {
        taskId,
        boardId
    } = useParams();


    // -----------------------------------------
    // Task Page data
    // -----------------------------------------

    const [task, setTask] = useState(null);

    const [parentBoard, setParentBoard] = useState(null);

    const [parentColumn, setParentColumn] = useState(null);

    const [labels, setLabels] = useState([]);

    const [checklists, setChecklists] = useState([]);

    const [
        isChecklistsLoading,
        setIsChecklistsLoading
    ] = useState(false);


    // -----------------------------------------
    // Loading states
    // -----------------------------------------

    const [
        isTaskLoading,
        setTaskLoading
    ] = useState(false);

    const [
        isLabelsLoading,
        setIsLabelsLoading
    ] = useState(false);


    // =========================================================
    // INITIAL TASK PAGE DATA
    // =========================================================

    useEffect(() => {

        if (!token || !taskId) {
            return;
        }


        let cancelled = false;


        async function loadTaskPage() {

            setTaskLoading(true);

            setIsLabelsLoading(true);


            // -----------------------------------------
            // Clear old task-page state
            // -----------------------------------------

            setTask(null);

            setParentBoard(null);

            setParentColumn(null);

            setLabels([]);


            try {

                // -------------------------------------
                // 1. Get Task
                // -------------------------------------

                const taskResponse =
                    await getTaskApi(
                        token,
                        taskId
                    );


                const fetchedTask =
                    taskResponse.data;


                if (cancelled) {
                    return;
                }


                setTask(
                    fetchedTask
                );


                // -------------------------------------
                // Resolve IDs
                // -------------------------------------

                const resolvedBoardId =
                    fetchedTask.boardId || boardId;

                const resolvedColumnId =
                    fetchedTask.columnId;


                // -------------------------------------
                // 2. Fetch parent data in parallel
                // -------------------------------------

                const [
                    boardResponse,
                    columnResponse,
                    labelsResponse,
                    checklistsResponse
                ] = await Promise.all([

                    getBoardApi(
                        token,
                        resolvedBoardId
                    ),

                    getColumnApi(
                        token,
                        resolvedColumnId
                    ),

                    getLabels(
                        token,
                        resolvedBoardId
                    ),

                    getChecklistsApi(
                        token,
                        taskId
                    )

                ]);


                if (cancelled) {
                    return;
                }


                // -------------------------------------
                // Store fetched metadata
                // -------------------------------------

                setParentBoard(
                    boardResponse.data
                );

                setParentColumn(
                    columnResponse.data
                );


                console.log(
                    "LABEL RESPONSE:",
                    labelsResponse
                );

                console.log(
                    "LABEL DATA:",
                    labelsResponse.data.labels
                );


                setLabels(
                    labelsResponse.data.labels
                );


                setChecklists(
                    checklistsResponse.data.checklists
                );

            } catch (error) {

                console.error(
                    "Failed to load Task Page data:",
                    error
                );

            } finally {

                if (!cancelled) {

                    setTaskLoading(false);

                    setIsLabelsLoading(false);
                }
            }
        }


        loadTaskPage();


        return () => {
            cancelled = true;
        };

    }, [
        token,
        taskId,
        boardId
    ]);


    return {
        // Public data
        task,
        parentBoard,
        parentColumn,
        labels,
        checklists,

        // Loading
        isTaskLoading,
        isLabelsLoading,
        isChecklistsLoading,

        // Internal state setters
        setTask,
        setParentBoard,
        setParentColumn,
        setLabels,
        setChecklists,
        setTaskLoading,
        setIsLabelsLoading,
        setIsChecklistsLoading,

        // Request context needed by mutation hooks
        token,
        taskId,
        boardId
    };
}