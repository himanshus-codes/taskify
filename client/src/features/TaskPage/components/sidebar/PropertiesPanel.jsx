import { useTaskPageContext } from "../../TaskPageContext";

import StatusProperty from "./properties/StatusProperty.jsx";
import PriorityProperty from "./properties/PriorityProperty.jsx";
import LabelsProperty from "./properties/LabelsProperty.jsx";
import ListProperty from "./properties/ListProperty.jsx";
import DatesProperty from "./properties/DatesProperty.jsx";
import CreatedProperty from "./properties/CreatedProperty.jsx";


export default function PropertiesPanel() {

    const { task } = useTaskPageContext();

    if (!task) {
        return null;
    }

    return (
        <div className="px-4 pl-7 text-xs">

            <div className="mb-4">
                <h2 className="text-sm font-medium text-[#ddd8d8]">
                    Properties
                </h2>

                <p className="mt-1 text-xs text-[#6f6a6a]">
                    Task information and metadata.
                </p>
            </div>

            <StatusProperty />

            <PriorityProperty />

            <LabelsProperty />

            <ListProperty />

            <DatesProperty />

            <CreatedProperty />

            {/* Later */}
            {/* <AssigneeProperty /> */}
            {/* <MembersProperty /> */}

        </div>
    );
}












// import { useState } from "react";

// import { useTaskPageContext } from "../../TaskPageContext";


// const statusOptions = [
//     {
//         value: "pending",
//         label: "Backlog",
//     },
//     {
//         value: "in-progress",
//         label: "In Progress",
//     },
//     {
//         value: "under-review",
//         label: "Under Review",
//     },
//     {
//         value: "completed",
//         label: "Completed",
//     },
// ];


// const priorityOptions = [
//     {
//         value: "normal",
//         label: "Normal",
//     },
//     {
//         value: "low",
//         label: "Low",
//     },
//     {
//         value: "medium",
//         label: "Medium",
//     },
//     {
//         value: "high",
//         label: "High",
//     },
// ];


// export default function PropertiesPanel() {

//     const {
//         task,

//         labels,

//         updateTaskProperty,

//         addLabelToTask,
//         removeLabelFromTask,
//         createAndAddLabel,
//     } = useTaskPageContext();


//     const [
//         isLabelPickerOpen,
//         setIsLabelPickerOpen
//     ] = useState(false);


//     const [
//         isCreatingLabel,
//         setIsCreatingLabel
//     ] = useState(false);


//     const [
//         newLabelName,
//         setNewLabelName
//     ] = useState("");


//     const [
//         newLabelColor,
//         setNewLabelColor
//     ] = useState("#888888");


//     if (!task) {
//         return null;
//     }


//     const taskLabelIds = task.labels || [];

    
//     const taskLabels = labels.filter(label =>
//         taskLabelIds.some(
//             labelId =>
//                 String(labelId) === String(label._id)
//         )
//     );


//     async function handleStatusChange(event) {

//         const status = event.target.value;

//         try {

//             await updateTaskProperty({
//                 status
//             });

//         } catch (error) {

//             console.error(
//                 "Failed to update task status:",
//                 error
//             );
//         }
//     }


//     async function handlePriorityChange(event) {

//         const priority = event.target.value;

//         try {

//             await updateTaskProperty({
//                 priority
//             });

//         } catch (error) {

//             console.error(
//                 "Failed to update task priority:",
//                 error
//             );
//         }
//     }


//     async function handleStartDateChange(event) {

//         const value = event.target.value;

//         try {

//             await updateTaskProperty({
//                 startDate: value
//                     ? value
//                     : null
//             });

//         } catch (error) {

//             console.error(
//                 "Failed to update start date:",
//                 error
//             );
//         }
//     }


//     async function handleTargetDateChange(event) {

//         const value = event.target.value;

//         try {

//             await updateTaskProperty({
//                 targetDate: value
//                     ? value
//                     : null
//             });

//         } catch (error) {

//             console.error(
//                 "Failed to update target date:",
//                 error
//             );
//         }
//     }


//     async function handleToggleLabel(labelId) {

//         const isAlreadyAssigned =
//             taskLabelIds.some(
//                 id =>
//                     String(id) === String(labelId)
//             );


//         try {

//             if (isAlreadyAssigned) {

//                 await removeLabelFromTask(
//                     labelId
//                 );

//             } else {

//                 await addLabelToTask(
//                     labelId
//                 );
//             }

//         } catch (error) {

//             console.error(
//                 "Failed to update task labels:",
//                 error
//             );
//         }
//     }


//     async function handleCreateLabel(event) {

//         event.preventDefault();


//         const trimmedName =
//             newLabelName.trim();


//         if (!trimmedName) {
//             return;
//         }


//         try {

//             await createAndAddLabel({
//                 name: trimmedName,
//                 color: newLabelColor
//             });


//             setNewLabelName("");

//             setNewLabelColor("#888888");

//             setIsCreatingLabel(false);

//         } catch (error) {

//             console.error(
//                 "Failed to create label:",
//                 error
//             );
//         }
//     }


//     return (
//         <div className="px-4 pl-7 text-xs">

//             {/* -------------------------------- */}
//             {/* Header */}
//             {/* -------------------------------- */}

//             <div className="mb-4">

//                 <h2 className="text-sm font-medium text-[#ddd8d8]">
//                     Properties
//                 </h2>

//                 <p className="mt-1 text-xs text-[#6f6a6a]">
//                     Task information and metadata.
//                 </p>

//             </div>


//             {/* -------------------------------- */}
//             {/* Status */}
//             {/* -------------------------------- */}

//             <PropertyRow
//                 label="Status"
//                 icon={
//                     <span
//                         className={`
//                             h-3.5
//                             w-3.5
//                             rounded-full
//                             border-2
//                             border-dotted
//                             ${getStatusColor(task.status)}
//                         `}
//                     />
//                 }
//                 value={
//                     <select
//                         value={task.status || "pending"}
//                         onChange={handleStatusChange}
//                         className="
//                             w-full
//                             cursor-pointer
//                             appearance-none
//                             bg-transparent
//                             text-[#e5e0e0]
//                             outline-none
//                         "
//                     >
//                         {statusOptions.map(option => (
//                             <option
//                                 key={option.value}
//                                 value={option.value}
//                                 className="bg-[#1e1d1d] text-[#e5e0e0]"
//                             >
//                                 {option.label}
//                             </option>
//                         ))}
//                     </select>
//                 }
//             />


//             {/* -------------------------------- */}
//             {/* Priority */}
//             {/* -------------------------------- */}

//             <PropertyRow
//                 label="Priority"
//                 icon={
//                     <span className="tracking-[2px] text-[#777171]">
//                         --
//                     </span>
//                 }
//                 value={
//                     <select
//                         value={task.priority || "normal"}
//                         onChange={handlePriorityChange}
//                         className="
//                             w-full
//                             cursor-pointer
//                             appearance-none
//                             bg-transparent
//                             text-[#e5e0e0]
//                             outline-none
//                         "
//                     >
//                         {priorityOptions.map(option => (
//                             <option
//                                 key={option.value}
//                                 value={option.value}
//                                 className="bg-[#1e1d1d] text-[#e5e0e0]"
//                             >
//                                 {option.label}
//                             </option>
//                         ))}
//                     </select>
//                 }
//             />


//             {/* -------------------------------- */}
//             {/* Labels */}
//             {/* -------------------------------- */}

//             <PropertyRow
//                 label="Labels"
//                 icon={
//                     <span className="text-[#777171] text-sm">
//                         +
//                     </span>
//                 }
//                 value={
//                     <div className="relative">

//                         <button
//                             type="button"
//                             onClick={() =>
//                                 setIsLabelPickerOpen(
//                                     prev => !prev
//                                 )
//                             }
//                             className="
//                                 flex
//                                 min-w-0
//                                 max-w-full
//                                 items-center
//                                 gap-2
//                                 text-left
//                             "
//                         >

//                             {taskLabels.length === 0 ? (

//                                 <span className="text-[#777171]">
//                                     Add label
//                                 </span>

//                             ) : (

//                                 <div className="flex min-w-0 items-center gap-1.5">

//                                     {taskLabels
//                                         .slice(0, 3)
//                                         .map(label => (

//                                             <span
//                                                 key={label._id}
//                                                 className="
//                                                     inline-flex
//                                                     max-w-24
//                                                     items-center
//                                                     truncate
//                                                     rounded
//                                                     px-1.5
//                                                     py-0.5
//                                                     text-[10px]
//                                                 "
//                                                 style={{
//                                                     backgroundColor:
//                                                         `${label.color}22`,
//                                                     color:
//                                                         label.color
//                                                 }}
//                                             >
//                                                 {label.name}
//                                             </span>
//                                         ))
//                                     }

//                                     {taskLabels.length > 3 && (

//                                         <span className="text-[#777171]">
//                                             +{taskLabels.length - 3}
//                                         </span>

//                                     )}

//                                 </div>
//                             )}

//                         </button>


//                         {isLabelPickerOpen && (

//                             <div
//                                 className="
//                                     absolute
//                                     left-0
//                                     top-7
//                                     z-50
//                                     w-64
//                                     rounded-md
//                                     border
//                                     border-[#302e2e]
//                                     bg-[#1c1b1b]
//                                     p-2
//                                     shadow-xl
//                                 "
//                             >

//                                 <div className="mb-2 text-[11px] text-[#777171]">
//                                     Board labels
//                                 </div>


//                                 <div className="max-h-48 overflow-y-auto">

//                                     {labels.length === 0 ? (

//                                         <div className="py-2 text-[11px] text-[#777171]">
//                                             No labels yet.
//                                         </div>

//                                     ) : (

//                                         labels.map(label => {

//                                             const checked =
//                                                 taskLabelIds.some(
//                                                     id =>
//                                                         String(id) ===
//                                                         String(label._id)
//                                                 );

//                                             return (
//                                                 <button
//                                                     key={label._id}
//                                                     type="button"
//                                                     onClick={() =>
//                                                         handleToggleLabel(
//                                                             label._id
//                                                         )
//                                                     }
//                                                     className="
//                                                         flex
//                                                         w-full
//                                                         items-center
//                                                         gap-2
//                                                         rounded
//                                                         px-2
//                                                         py-1.5
//                                                         text-left
//                                                         hover:bg-[#262424]
//                                                     "
//                                                 >

//                                                     <span
//                                                         className="
//                                                             flex
//                                                             h-3
//                                                             w-3
//                                                             shrink-0
//                                                             items-center
//                                                             justify-center
//                                                             rounded-full
//                                                             text-[8px]
//                                                         "
//                                                         style={{
//                                                             backgroundColor:
//                                                                 label.color
//                                                         }}
//                                                     >
//                                                         {checked
//                                                             ? "✓"
//                                                             : ""}
//                                                     </span>


//                                                     <span className="truncate text-[#c7c1c1]">
//                                                         {label.name}
//                                                     </span>

//                                                 </button>
//                                             );
//                                         })
//                                     )}

//                                 </div>


//                                 <div className="my-2 border-t border-[#302e2e]" />


//                                 {!isCreatingLabel ? (

//                                     <button
//                                         type="button"
//                                         onClick={() =>
//                                             setIsCreatingLabel(true)
//                                         }
//                                         className="
//                                             w-full
//                                             rounded
//                                             px-2
//                                             py-1.5
//                                             text-left
//                                             text-[#8e8989]
//                                             hover:bg-[#262424]
//                                             hover:text-[#c7c1c1]
//                                         "
//                                     >
//                                         + Create new label
//                                     </button>

//                                 ) : (

//                                     <form
//                                         onSubmit={handleCreateLabel}
//                                         className="space-y-2"
//                                     >

//                                         <input
//                                             type="text"
//                                             value={newLabelName}
//                                             onChange={event =>
//                                                 setNewLabelName(
//                                                     event.target.value
//                                                 )
//                                             }
//                                             placeholder="Label name"
//                                             autoFocus
//                                             className="
//                                                 w-full
//                                                 rounded
//                                                 border
//                                                 border-[#302e2e]
//                                                 bg-[#151414]
//                                                 px-2
//                                                 py-1.5
//                                                 text-[#e5e0e0]
//                                                 outline-none
//                                             "
//                                         />


//                                         <div className="flex items-center gap-2">

//                                             <input
//                                                 type="color"
//                                                 value={newLabelColor}
//                                                 onChange={event =>
//                                                     setNewLabelColor(
//                                                         event.target.value
//                                                     )
//                                                 }
//                                                 className="
//                                                     h-7
//                                                     w-9
//                                                     cursor-pointer
//                                                     border-0
//                                                     bg-transparent
//                                                     p-0
//                                                 "
//                                             />

//                                             <button
//                                                 type="submit"
//                                                 className="
//                                                     rounded
//                                                     bg-[#2b2929]
//                                                     px-2.5
//                                                     py-1.5
//                                                     text-[11px]
//                                                     text-[#ddd8d8]
//                                                     hover:bg-[#343131]
//                                                 "
//                                             >
//                                                 Create
//                                             </button>

//                                             <button
//                                                 type="button"
//                                                 onClick={() => {
//                                                     setIsCreatingLabel(
//                                                         false
//                                                     );

//                                                     setNewLabelName(
//                                                         ""
//                                                     );
//                                                 }}
//                                                 className="
//                                                     px-2
//                                                     py-1.5
//                                                     text-[11px]
//                                                     text-[#777171]
//                                                 "
//                                             >
//                                                 Cancel
//                                             </button>

//                                         </div>

//                                     </form>
//                                 )}

//                             </div>
//                         )}

//                     </div>
//                 }
//                 muted={taskLabels.length === 0}
//             />


//             {/* -------------------------------- */}
//             {/* List */}
//             {/* -------------------------------- */}

//             <PropertyRow
//                 label="List"
//                 icon={
//                     <span className="text-[#777171] text-sm">
//                         ^
//                     </span>
//                 }
//                 value={
//                     <span className="text-[#777171]">
//                         Change List
//                     </span>
//                 }
//                 muted
//             />


//             {/* -------------------------------- */}
//             {/* Dates */}
//             {/* -------------------------------- */}

//             <PropertyRow
//                 label="Dates"
//                 icon={
//                     <span className="text-[#777171] text-sm">
//                         ▣
//                     </span>
//                 }
//                 value={
//                     <div className="flex items-center gap-3">

//                         <DateValue
//                             value={task.startDate}
//                             placeholder="Start"
//                             onChange={
//                                 handleStartDateChange
//                             }
//                         />

//                         <span className="text-[#777171]">
//                             →
//                         </span>

//                         <DateValue
//                             value={task.targetDate}
//                             placeholder="Target"
//                             onChange={
//                                 handleTargetDateChange
//                             }
//                         />

//                     </div>
//                 }
//                 muted
//             />


//             {/* -------------------------------- */}
//             {/* Created */}
//             {/* -------------------------------- */}

//             <PropertyRow
//                 label="Created"
//                 icon={
//                     <span className="text-[#777171] text-sm">
//                         ◷
//                     </span>
//                 }
//                 value={
//                     formatTaskDate(
//                         task.createdAt
//                     )
//                 }
//             />


//             {/* -------------------------------- */}
//             {/* Future */}
//             {/* -------------------------------- */}

//             <PropertyRow
//                 label="Assignee"
//                 icon={
//                     <span className="text-[#777171] text-sm">
//                         ◌
//                     </span>
//                 }
//                 value="Add Assignee"
//                 muted
//             />


//             <PropertyRow
//                 label="Members"
//                 icon={
//                     <span className="text-[#777171] text-sm">
//                         ♧
//                     </span>
//                 }
//                 value="Add members"
//                 muted
//             />

//         </div>
//     );
// }


// function PropertyRow({
//     label,
//     icon,
//     value,
//     muted = false,
// }) {

//     return (
//         <div
//             className="
//                 grid
//                 grid-cols-[104px_minmax(0,1fr)]
//                 items-center
//                 min-h-11
//                 gap-2
//             "
//         >

//             <div className="text-[#9c9696]">
//                 {label}
//             </div>


//             <div
//                 className={`
//                     flex
//                     min-w-0
//                     items-center
//                     gap-3
//                     ${
//                         muted
//                             ? "text-[#777171]"
//                             : "text-[#e5e0e0]"
//                     }
//                 `}
//             >

//                 <span className="flex w-4 shrink-0 items-center justify-center">
//                     {icon}
//                 </span>


//                 <div className="min-w-0 flex-1 truncate">
//                     {value}
//                 </div>

//             </div>

//         </div>
//     );
// }


// function DateValue({
//     value,
//     placeholder,
//     onChange,
// }) {

//     return (
//         <label
//             className="
//                 flex
//                 cursor-pointer
//                 items-center
//                 gap-2
//             "
//         >

//             <span className="text-[#777171]">
//                 ▣
//             </span>


//             <input
//                 type="date"
//                 value={
//                     value
//                         ? toInputDate(value)
//                         : ""
//                 }
//                 onChange={onChange}
//                 className="
//                     min-w-0
//                     cursor-pointer
//                     bg-transparent
//                     text-[#aaa4a4]
//                     outline-none
//                 "
//                 aria-label={placeholder}
//             />


//         </label>
//     );
// }


// function getStatusColor(status) {

//     switch (status) {

//         case "completed":
//             return "border-[#5fcf8f]";

//         case "under-review":
//             return "border-[#8d7bea]";

//         case "in-progress":
//             return "border-[#f2a33a]";

//         case "pending":
//         default:
//             return "border-[#777171]";
//     }
// }


// function toInputDate(date) {

//     const parsedDate = new Date(date);

//     if (Number.isNaN(parsedDate.getTime())) {
//         return "";
//     }

//     const year =
//         parsedDate.getFullYear();

//     const month =
//         String(
//             parsedDate.getMonth() + 1
//         ).padStart(2, "0");

//     const day =
//         String(
//             parsedDate.getDate()
//         ).padStart(2, "0");


//     return `${year}-${month}-${day}`;
// }


// function formatTaskDate(date) {

//     if (!date) {
//         return "—";
//     }


//     return new Date(date).toLocaleDateString(
//         "en-IN",
//         {
//             day: "numeric",
//             month: "short",
//             year: "numeric"
//         }
//     );
// }




































// // import { useTaskPageContext } from "../../TaskPageContext";

// // export default function PropertiesPanel() {
// //     const { task } = useTaskPageContext();

// //     return (
// //         <div className="px-4 pl-7 text-xs">

// //             <div className="mb-4">
// //                 <h2 className="text-sm font-medium text-[#ddd8d8]">
// //                     Properties
// //                 </h2>

// //                 <p className="mt-1 text-xs text-[#6f6a6a]">
// //                     Task information and metadata.
// //                 </p>
// //             </div>

// //             <PropertyRow
// //                 label="Status"
// //                 icon={
// //                     <span
// //                         className="
// //                             h-3.5
// //                             w-3.5
// //                             rounded-full
// //                             border-2
// //                             border-dotted
// //                             border-[#f2a33a]
// //                         "
// //                     />
// //                 }
// //                 value={task.status || "Backlog"}
// //             />

// //             <PropertyRow
// //                 label="Priority"
// //                 icon={
// //                     <span className="tracking-[2px] text-[#777171]">
// //                         --
// //                     </span>
// //                 }
// //                 value={task.priority || "No priority"}
// //             />

// //             <PropertyRow
// //                 label="Labels"
// //                 icon={
// //                     <span className="text-[#777171] text-sm">
// //                         +
// //                     </span>
// //                 }
// //                 value="Add label"
// //                 muted
// //             />
// //             <PropertyRow
// //                 label="List"
// //                 icon={
// //                     <span className="text-[#777171] text-sm">
// //                         ^
// //                     </span>
// //                 }
// //                 value="Change List"
// //                 muted
// //             />

// //             <PropertyRow
// //                 label="Dates"
// //                 icon={
// //                     <span className="text-[#777171] text-sm">
// //                         ▣
// //                     </span>
// //                 }
// //                 value={
// //                     <div className="flex items-center gap-4">

// //                         <PropertyValue
// //                             icon="▣"
// //                             text="Start"
// //                         />

// //                         <span className="text-[#777171]">
// //                             →
// //                         </span>

// //                         <PropertyValue
// //                             icon="▣"
// //                             text="Target"
// //                         />

// //                     </div>
// //                 }
// //                 muted
// //             />

// //             <PropertyRow
// //                 label="Created"
// //                 icon={
// //                     <span className="text-[#777171] text-sm">
// //                         ◷
// //                     </span>
// //                 }
// //                 value={formatTaskDate(task.createdAt)}
// //             />



// //             <PropertyRow
// //                 label="Assignee"
// //                 icon={
// //                     <span className="text-[#777171] text-sm">
// //                         ◌
// //                     </span>
// //                 }
// //                 value="Add Assignee"
// //                 muted
// //             />

// //             <PropertyRow
// //                 label="Members"
// //                 icon={
// //                     <span className="text-[#777171] text-sm">
// //                         ♧
// //                     </span>
// //                 }
// //                 value="Add members"
// //                 muted
// //             />

// //             {/* <PropertyRow
// //                 label="Teams"
// //                 icon={
// //                     <span className="flex h-3.5 w-3.5 items-center justify-center rounded-full bg-[#159447] text-[8px] text-black">
// //                         ↗
// //                     </span>
// //                 }
// //                 value="Learning linear"
// //             />

// //             <PropertyRow
// //                 label="Slack"
// //                 icon={
// //                     <span className="text-[#8b8585] text-sm">
// //                         ✣
// //                     </span>
// //                 }
// //                 value="Slack channel"
// //                 muted
// //             /> */}

// //         </div>
// //     );
// // }


// // function PropertyRow({
// //     label,
// //     icon,
// //     value,
// //     muted = false,
// // }) {
// //     return (
// //         <div
// //             className="
// //                 grid
// //                 grid-cols-[104px_minmax(0,1fr)]
// //                 items-center
// //                 min-h-11
// //                 gap-2
// //             "
// //         >

// //             {/* Label */}
// //             <div className="text-[#9c9696]">
// //                 {label}
// //             </div>


// //             {/* Value */}
// //             <div
// //                 className={`
// //                     flex
// //                     min-w-0
// //                     items-center
// //                     gap-3
// //                     ${
// //                         muted
// //                             ? "text-[#777171]"
// //                             : "text-[#e5e0e0]"
// //                     }
// //                 `}
// //             >

// //                 <span className="flex w-4 shrink-0 items-center justify-center">
// //                     {icon}
// //                 </span>

// //                 <div className="min-w-0 truncate">
// //                     {value}
// //                 </div>

// //             </div>

// //         </div>
// //     );
// // }


// // function PropertyValue({
// //     icon,
// //     text,
// // }) {
// //     return (
// //         <div className="flex items-center gap-2">
// //             <span className="text-[#777171]">
// //                 {icon}
// //             </span>

// //             <span className="text-[#aaa4a4]">
// //                 {text}
// //             </span>
// //         </div>
// //     );
// // }


// // function formatTaskDate(date) {

// //     if (!date) {
// //         return "—";
// //     }

// //     return new Date(date).toLocaleDateString(
// //         "en-IN",
// //         {
// //             day: "numeric",
// //             month: "short",
// //             year: "numeric"
// //         }
// //     );
// // }


// // // import { useTaskPageContext } from "../../TaskPageContext";

// // // export default function PropertiesPanel() {

// // //     const { task } = useTaskPageContext();

// // //     return (
// // //         <div className="space-y-5 px-5">

// // //             <div>
// // //                 <h2 className="text-sm font-medium text-[#ddd8d8]">
// // //                     Properties
// // //                 </h2>

// // //                 <p className="mt-1 text-xs text-[#6f6a6a]">
// // //                     Task information and metadata.
// // //                 </p>
// // //             </div>


// // //             <Property
// // //                 label="Status"
// // //                 value={task.status}
// // //             />

// // //             <Property
// // //                 label="Priority"
// // //                 value={task.priority}
// // //             />

// // //             <Property
// // //                 label="Assignee"
// // //                 value={task.assignee}
// // //             />

// // //             <Property
// // //                 label="Due date"
// // //                 value={task.dueDate}
// // //             />


// // //             <Property
// // //                 label="Task ID"
// // //                 value={task._id}
// // //             />

// // //         </div>
// // //     );
// // // }


// // // function Property({ label, value }) {

// // //     return (
// // //         <div className="space-y-1.5">

// // //             <div
// // //                 className="
// // //                     text-[10px]
// // //                     font-medium
// // //                     uppercase
// // //                     tracking-wider
// // //                     text-[#666161]
// // //                 "
// // //             >
// // //                 {label}
// // //             </div>

// // //             <div
// // //                 className="
// // //                     rounded-md
// // //                     border
// // //                     border-[#292727]
// // //                     bg-[#1d1c1c]
// // //                     px-3
// // //                     py-2
// // //                     text-xs
// // //                     text-[#bbb5b5]
// // //                 "
// // //             >
// // //                 {value}
// // //             </div>

// // //         </div>
// // //     );
// // // }