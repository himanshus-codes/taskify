import { useContext } from "react";
import { AppDataContext } from "../context/AppContext";

export const useAppData = ()=>{
    return useContext(AppDataContext)
}