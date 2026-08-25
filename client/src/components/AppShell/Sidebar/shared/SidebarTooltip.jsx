export default function SidebarTooltip({ children }) {
    return (
        <div
            className="
                absolute
                left-full
                top-1/2
                -translate-y-1/2
                ml-3
                px-2.5
                py-1.5
                rounded-md
                bg-[#292828]
                border
                border-[#3a3838]
                text-[#e5e5e5]
                text-sm
                whitespace-nowrap
                shadow-lg
                z-50
                pointer-events-none
            "
        >
            {children}
        </div>
    );
}