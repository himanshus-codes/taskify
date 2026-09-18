import { useState } from "react";

export default function ConfirmActionModal({
    title,
    message,
    onCancel,
    onConfirm,
    confirmText = "Delete",
}) {
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState("")

    async function handleConfirm() {
        setError("")
        // Prevent another request if already loading
        if (isLoading) {
            return;
        }

        setIsLoading(true);

        try {
            await onConfirm();

        } catch (e) {
            console.log(e)
            setError(e.message)

          
        } finally{
            // The operation failed.
            // Allow the user to try again.
            setIsLoading(false);
        }
    }

    return (
        <div
            className="
                fixed
                inset-0
                z-70
                flex
                items-center
                justify-center
                bg-black/40
            "
        >

            <div
                className="
                    relative
                    h-fit
                    w-140
                    max-w-[calc(100%-2rem)]
                    rounded-md
                    border
                    border-[#3b3939]
                    bg-[#292828]
                    shadow-xl
                    flex
                    flex-col
                    gap-2
                    p-6
                    group
                "
            >

                {/* Close */}
                <button
                    type="button"
                    aria-label="Close"
                    disabled={isLoading}
                    onClick={onCancel}
                    className="
                        absolute
                        right-1
                        top-1
                        p-1
                        rounded-md
                        hover:bg-white/5
                        group-hover:block
                        hidden
                        disabled:cursor-not-allowed
                        disabled:opacity-50
                    "
                >
                    <svg
                        width="20px"
                        height="20px"
                        viewBox="0 0 24 24"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <path
                            d="M6.75827 17.2426L12.0009 12M17.2435 6.75736L12.0009 12M12.0009 12L6.75827 6.75736M12.0009 12L17.2435 17.2426"
                            stroke="#e3e3e3"
                            strokeWidth="1.2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        />
                    </svg>
                </button>


                {/* Content */}
                <div className="pr-8">

                    <h2
                        className="
                            text-md
                            font-medium
                            text-[#e5e2e2]

                        "
                    >
                        {title}
                    </h2>

                    <p
                        className="
                            mt-7
                            text-sm
                            leading-6
                            text-[#c5c0c0]
                        "
                    >
                        {message}
                    </p>

                </div>

                    {/* Error */}
                    {/* {error && (
                        <div className="text-sm text-red-400">
                            {error}
                        </div>
                    )} */}

                    {/* Error */}
                    <div className="min-h-5 text-sm text-red-400">
                        {error}
                    </div>


                {/* Footer */}
                <div
                    className="
                        
                        flex
                        justify-end
                        gap-2
                        border-[#3b3939]
                     
                    "
                >

                    {/* Cancel */}
                    <button
                        type="button"
                        disabled={isLoading}
                        onClick={onCancel}
                        className="
                            rounded-sm
                            px-4
                            py-2
                            text-sm
                            text-[#d2cbcb]
                            hover:bg-[#353333]
                            hover:text-[#ede9e9]
                            disabled:cursor-not-allowed
                            disabled:opacity-50
                        "
                    >
                        Cancel
                    </button>


                    {/* Confirm */}
                    <button
                        type="button"
                        disabled={isLoading}
                        onClick={handleConfirm}
                        className="
                            min-w-20
                            rounded-sm
                            bg-[#243b78]
                            px-4
                            py-2
                            text-sm
                            text-white
                            hover:bg-[#2d498f]
                            disabled:cursor-not-allowed
                            disabled:opacity-70
                            flex
                            items-center
                            justify-center
                        "
                    >
                        {isLoading ? (
                            <span
                                className="
                                    h-4
                                    w-4
                                    animate-spin
                                    rounded-full
                                    border-2
                                    border-white/30
                                    border-t-white
                                "
                            />
                        ) : (
                            confirmText
                        )}
                    </button>

                </div>

            </div>

        </div>
    );
}