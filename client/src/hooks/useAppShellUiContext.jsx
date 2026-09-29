import {useContext}  from "react";
import {AppShellUiStateContext} from "../context/AppShellUiContext";

export const useAppShellUiContext = () => {
    return useContext(AppShellUiStateContext)
}