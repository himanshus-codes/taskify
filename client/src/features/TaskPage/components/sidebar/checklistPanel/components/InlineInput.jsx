export default function InlineInput({
    value,
    onChange,
    onKeyDown,
    placeholder,
    className = "",
}) {

    return (

        <input
            autoFocus
            value={value}
            onChange={onChange}
            onKeyDown={onKeyDown}
            placeholder={placeholder}
            className={`
                min-w-0
                w-full
                rounded-md
                
                border
                border-[#383434]
                bg-[#1b1a1a]
                px-2
                py-1
                text-xs
                text-[#c8c2c2]
                outline-none
                placeholder:text-[#5f5a5a]
                focus:border-[#514c4c]
                ${className}
            `}
        />

    );
}