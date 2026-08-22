// bg-[#181717]
// bg-[#1e1d1d]

export default function Kanban() {
    return (
        <div className="
        mr-5
            pt-7
            pl-7
            pr-5
            kanban-scrollbar
            flex-1
            min-h-0
            min-w-0
            overflow-x-auto
            overflow-y-hidden
        ">

            <div className="
                pb-5
                grid
                grid-flow-col
                auto-cols-75
                gap-6
                h-full
                "
            >
                <div className="flex flex-col bg-[#1c1b1b]  rounded-md border-[0.1px] border-[#2f2d2d] p-2 h-full min-h-0 ">
                    <div className="flex mx-2 mb-5">
                        <div className="grow">Title</div>
                        <div className="flex items-center gap-3"> 
                            <div className="hover:bg-[#222121] rounded-sm p-0.5">
                                <svg width="16px" height="20px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" color="#ffffff"><path d="M6 12H12M18 12H12M12 12V6M12 12V18" stroke="#ffffff" stroke-width="1.2" stroke-linecap="round" stroke-linejoin="round"></path></svg>

                            </div>
                            <div className="hover:bg-[#222121] rounded-sm p-0.5">
                                <svg width="17px" height="20px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" color="#ffffff"><path d="M20 12.5C20.2761 12.5 20.5 12.2761 20.5 12C20.5 11.7239 20.2761 11.5 20 11.5C19.7239 11.5 19.5 11.7239 19.5 12C19.5 12.2761 19.7239 12.5 20 12.5Z" fill="#ffffff" stroke="#ffffff" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"></path><path d="M12 12.5C12.2761 12.5 12.5 12.2761 12.5 12C12.5 11.7239 12.2761 11.5 12 11.5C11.7239 11.5 11.5 11.7239 11.5 12C11.5 12.2761 11.7239 12.5 12 12.5Z" fill="#ffffff" stroke="#ffffff" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"></path><path d="M4 12.5C4.27614 12.5 4.5 12.2761 4.5 12C4.5 11.7239 4.27614 11.5 4 11.5C3.72386 11.5 3.5 11.7239 3.5 12C3.5 12.2761 3.72386 12.5 4 12.5Z" fill="#ffffff" stroke="#ffffff" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"></path></svg>

                            </div>
                        </div>
                    </div>

                    <div className=" flex flex-col pr-1 overflow-y-auto gap-2 rounded-md kanban-scrollbar-col  ">
                        
                        <div className="bg-[#242323] rounded-md min-h-24 flex flex-col p-3 text-sm gap-1 hover:bg-[#2a2929]">
                                 <div className="flex">
                                    <div className="grow">Title</div>
                                    <div className="flex gap-2 items-center "> 
                                        <div>#Label</div>
                                        <div className="hover:bg-[#222121] rounded-sm p-0.5">
                                            <svg width="14px" height="16px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" color="#e3e3e3"><path d="M20 9L18.005 20.3463C17.8369 21.3026 17.0062 22 16.0353 22H7.96474C6.99379 22 6.1631 21.3026 5.99496 20.3463L4 9" stroke="#e3e3e3" stroke-width="1.2" stroke-linecap="round" stroke-linejoin="round"></path><path d="M21 6L15.375 6M3 6L8.625 6M8.625 6V4C8.625 2.89543 9.52043 2 10.625 2H13.375C14.4796 2 15.375 2.89543 15.375 4V6M8.625 6L15.375 6" stroke="#e3e3e3" stroke-width="1.2" stroke-linecap="round" stroke-linejoin="round"></path></svg>
                                        </div>
                                        
                                        <div className="hover:bg-[#222121] rounded-sm p-0.5">
                                            {/* <svg width="15px" height="16px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" color="#ebebeb"><path d="M22 5V19C22 20.1046 21.1046 21 20 21H4C2.89543 21 2 20.1046 2 19V5C2 3.89543 2.89543 3 4 3H20C21.1046 3 22 3.89543 22 5Z" stroke="#ebebeb" stroke-width="1.2"></path><path d="M2 12H6" stroke="#ebebeb" stroke-width="1.2"></path><path d="M6 3V21" stroke="#ebebeb" stroke-width="1.2"></path><path d="M15.5 11.5L12 14.5" stroke="#ebebeb" stroke-width="1.2" stroke-linecap="round" stroke-linejoin="round"></path><path d="M17 10.01L17.01 9.99889" stroke="#ebebeb" stroke-width="1.2" stroke-linecap="round" stroke-linejoin="round"></path></svg> */}
                                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.2} stroke="currentColor" className="size-4">
                                                <path strokeLinecap="round" strokeLinejoin="round" d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10" />
                                            </svg>

                                            {/* <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
                                                <path stroke-linecap="round" stroke-linejoin="round" d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10" />
                                            </svg> */}

                                        </div>
                                    </div>
                                </div>
                                <div className="text-sm">hi this is it</div>
                                <div className="flex">
                                    <div className="grow">Title</div>
                                    <div className="flex gap-3"> 
                                        <div>Due</div>
                                        <div>Low</div>
                                        <div>(C)</div>
                                    </div>
                                </div>
                        </div>
                       
                 
                        
                    </div>
                </div>          
               
            </div>

        </div>
    );
}


