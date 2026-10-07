export default function ProgressCircle({
    progress,
    size = "h-4 w-4",
}) {

    const circumference = 94.2;


    return (

        <div
            className={`
                shrink-0
                ${size}
            `}
        >

            <svg
                viewBox="0 0 36 36"
                className="
                    h-full
                    w-full
                    -rotate-90
                "
            >

                {/* Background circle */}
                <circle
                    cx="18"
                    cy="18"
                    r="15"
                    fill="none"
                    stroke="#2b2929"
                    strokeWidth="3"
                />


                {/* Progress circle */}
                <circle
                    cx="18"
                    cy="18"
                    r="15"
                    fill="none"
                    stroke="#777171"
                    strokeWidth="3"
                    strokeLinecap="round"
                    strokeDasharray={circumference}
                    strokeDashoffset={
                        circumference -
                        (circumference * progress) / 100
                    }
                />

            </svg>

        </div>
    );
}