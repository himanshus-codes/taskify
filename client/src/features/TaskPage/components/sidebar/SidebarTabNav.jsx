import { useTaskPageContext } from "../../TaskPageContext";

const tabs = [
    {
        id: "properties",
        label: "Property",
        icon: (
            <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                className="size-3.5"
            >
                <path d="M6 12a.75.75 0 0 1-.75-.75v-7.5a.75.75 0 1 1 1.5 0v7.5A.75.75 0 0 1 6 12ZM18 12a.75.75 0 0 1-.75-.75v-7.5a.75.75 0 1 1 1.5 0v7.5A.75.75 0 0 1 18 12ZM6.75 20.25v-1.5a.75.75 0 0 0-1.5 0v1.5a.75.75 0 0 0 1.5 0ZM18.75 18.75v1.5a.75.75 0 0 1-1.5 0v-1.5a.75.75 0 0 1 1.5 0ZM12.75 5.25v-1.5a.75.75 0 0 0-1.5 0v1.5a.75.75 0 0 0 1.5 0ZM12 21a.75.75 0 0 1-.75-.75v-7.5a.75.75 0 0 1 1.5 0v7.5A.75.75 0 0 1 12 21ZM3.75 15a2.25 2.25 0 1 0 4.5 0 2.25 2.25 0 0 0-4.5 0ZM12 11.25a2.25 2.25 0 1 1 0-4.5 2.25 2.25 0 0 1 0-4.5ZM15.75 15a2.25 2.25 0 1 0 4.5 0 2.25 2.25 0 0 0-4.5 0Z" />
            </svg>
        ),
    },
    {
        id: "checklist",
        label: "Checklist",
        // icon: "☷",
        icon: (
            <svg width="15px" height="17px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" color="#ffffff"><path d="M9 6L20 6" stroke="#ffffff" stroke-width="1.2" stroke-linecap="round" stroke-linejoin="round"></path><path d="M3.80002 5.79999L4.60002 6.59998L6.60001 4.59999" stroke="#ffffff" stroke-width="1.2" stroke-linecap="round" stroke-linejoin="round"></path><path d="M3.80002 11.8L4.60002 12.6L6.60001 10.6" stroke="#ffffff" stroke-width="1.2" stroke-linecap="round" stroke-linejoin="round"></path><path d="M3.80002 17.8L4.60002 18.6L6.60001 16.6" stroke="#ffffff" stroke-width="1.2" stroke-linecap="round" stroke-linejoin="round"></path><path d="M9 12L20 12" stroke="#ffffff" stroke-width="1.2" stroke-linecap="round" stroke-linejoin="round"></path><path d="M9 18L20 18" stroke="#ffffff" stroke-width="1.2" stroke-linecap="round" stroke-linejoin="round"></path></svg>

        ),
    },
    {
        id: "resources",
        label: "Resources",
        // icon: "📎",
        icon: (
            <svg width="12px" height="16px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" color="#ffffff"><path d="M21.4383 11.6622L12.2483 20.8522C11.1225 21.9781 9.59552 22.6106 8.00334 22.6106C6.41115 22.6106 4.88418 21.9781 3.75834 20.8522C2.63249 19.7264 2 18.1994 2 16.6072C2 15.015 2.63249 13.4881 3.75834 12.3622L12.9483 3.17222C13.6989 2.42166 14.7169 2 15.7783 2C16.8398 2 17.8578 2.42166 18.6083 3.17222C19.3589 3.92279 19.7806 4.94077 19.7806 6.00222C19.7806 7.06368 19.3589 8.08166 18.6083 8.83222L9.40834 18.0222C9.03306 18.3975 8.52406 18.6083 7.99334 18.6083C7.46261 18.6083 6.95362 18.3975 6.57834 18.0222C6.20306 17.6469 5.99222 17.138 5.99222 16.6072C5.99222 16.0765 6.20306 15.5675 6.57834 15.1922L15.0683 6.71222" stroke="#ffffff" stroke-width="1.2" stroke-linecap="round" stroke-linejoin="round"></path></svg>

        ),
    },
    {
        id: "activity",
        label: "Activity",
        icon: (
            <svg width="13px" height="16px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" color="#ffffff"><path d="M7 12L17 12" stroke="#ffffff" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path><path d="M7 8L13 8" stroke="#ffffff" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path><path d="M3 20.2895V5C3 3.89543 3.89543 3 5 3H19C20.1046 3 21 3.89543 21 5V15C21 16.1046 20.1046 17 19 17H7.96125C7.35368 17 6.77906 17.2762 6.39951 17.7506L4.06852 20.6643C3.71421 21.1072 3 20.8567 3 20.2895Z" stroke="#ffffff" stroke-width="1.5"></path></svg>
        ),
    },
];

export default function SidebarTabNav() {

    const {
        activeSidebarTab,
        setActiveSidebarTab,
    } = useTaskPageContext();

    return (
        <div
            className="
                flex
                items-center
                rounded-2xl
                border
                border-[#2a2929]
                bg-[#202020]
                justify-around
                px-2
                py-1
                gap-2
                mx-4
            "
        >

            {tabs.map(tab => {

                const isActive =
                    activeSidebarTab === tab.id;

                return (
                    <button
                        key={tab.id}
                        type="button"
                        onClick={() => setActiveSidebarTab(tab.id)}
                        className={`
                            flex
                            items-center
                            gap-1.25
                            rounded-md
                            p-1
                            text-xs
                            transition-colors
                            ${
                                isActive
                                    ? "bg-[#2b2929] text-[#efebeb]"
                                    : "text-[#9b9595] hover:bg-[#282626] hover:text-[#d8d2d2]"
                            }
                        `}
                    >
                        <span className="text-[14px]">
                            {tab.icon}
                        </span>

                        <span>
                            {tab.label}
                        </span>
                    </button>
                );
            })}

        </div>
    );
}