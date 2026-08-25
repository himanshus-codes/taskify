import { useContext } from "react";
import { BoardDisplayContext } from "../BoardDisplayContext";

export const useBoardDisplayContext = () => {
    return useContext(BoardDisplayContext)
}