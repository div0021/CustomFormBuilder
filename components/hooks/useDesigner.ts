"use client"

import { useContext } from "react"
import { DesignerContext } from "../context/DesignerContext"

export function useDesigner(){
    const context = useContext(DesignerContext);

    if(!context){
        throw new Error("Use designer hook must be used within a Designer Context");
    }

    return context;
}
