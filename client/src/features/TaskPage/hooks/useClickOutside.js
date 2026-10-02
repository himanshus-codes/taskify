import { useEffect } from "react";


export default function useClickOutside(
    ref,
    onOutsideClick,
    enabled = true
) {

    useEffect(() => {

        if (!enabled) {
            return;
        }


        function handleOutsideClick(event) {

            if (
                ref.current &&
                ref.current.contains(
                    event.target
                )
            ) {
                return;
            }


            onOutsideClick();
        }


        document.addEventListener(
            "mousedown",
            handleOutsideClick
        );


        return () => {

            document.removeEventListener(
                "mousedown",
                handleOutsideClick
            );
        };

    }, [
        ref,
        onOutsideClick,
        enabled
    ]);
}