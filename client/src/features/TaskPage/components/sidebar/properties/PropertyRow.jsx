export default function PropertyRow({
    label,
    icon,
    value,
    muted = false,
    align = "center",
}) {

    return (
        <div
            className={`
                grid
                grid-cols-[104px_minmax(0,1fr)]
                min-h-11
                gap-2
                ${
                    align === "start"
                        ? "items-start"
                        : "items-center"
                }
            `}
        >

            <div
                className={`
                    text-[#9c9696]
                    ${
                        align === "start"
                            ? "pt-1"
                            : ""
                    }
                `}
            >
                {label}
            </div>


            <div
                className={`
                    flex
                    min-w-0
                    items-center
                    gap-3
                    ${
                        muted
                            ? "text-[#777171]"
                            : "text-[#e5e0e0]"
                    }
                `}
            >

                <span className="flex w-4 shrink-0 items-center justify-center">
                    {icon}
                </span>

                <div className="min-w-0 flex-1">
                    {value}
                </div>

            </div>

        </div>
    );
}




















// export default function PropertyRow({
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

//                 <div className="min-w-0 flex-1 overflow-visible">
//                     {value}
//                 </div>

//             </div>

//         </div>
//     );
// }