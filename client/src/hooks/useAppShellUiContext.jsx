import {useContext}  from "react";
import {AppShellUiStateContext} from "../context/Ui/AppShellUiContext";

export const useAppShellUiContext = () => {
    return useContext(AppShellUiStateContext)
}