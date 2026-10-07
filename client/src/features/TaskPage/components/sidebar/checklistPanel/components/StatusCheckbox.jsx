export default function StatusCheckbox({
    checked,
    onClick,
    disabled = false
}) {

    return (
        <button
            type="button"
            disabled={disabled}
            onClick={onClick}
            className="
                flex
                h-4
                w-4
                shrink-0
                items-center
                justify-center
                rounded-[4px]
                border
                border-[#403d3d]
                text-[10px]
                leading-none
                text-[#aaa4a4]
                hover:border-[#5b5757]
                hover:bg-[#211f1f]
                disabled:cursor-default
                disabled:opacity-50
            "
        >
            {checked && "✓"}
        </button>
    );
}