"use client"

import { Dispatch, SetStateAction, createContext, useState } from "react";
import { FormElementInstance } from "../form-elements"

type DesignerContextType = {
    elements:FormElementInstance[],
    addElement:(index:number,element:FormElementInstance)=>void;
    removeElement:(id:string)=>void;
    setElements:Dispatch<SetStateAction<FormElementInstance[]>>

    // select element

    selectedElement:FormElementInstance|null;
    setSelectElement:Dispatch<SetStateAction<FormElementInstance | null >>

    // update element
    updateElement:(id:string,element:FormElementInstance) => void;
}

export const DesignerContext = createContext<DesignerContextType|null>(null);

export default function DesignerContextProvider({children}:{children:React.ReactNode}){

   const [elements,setElements] = useState<FormElementInstance[]>([]);

   const [selectedElement,setSelectElement] = useState<FormElementInstance|null>(null);

   const addElement = (index:number,element:FormElementInstance) => {
    setElements(pre=>{
        const newElements = [...pre];
        newElements.splice(index,0,element);
        return newElements;
    
    });


   }

   const removeElement = (id:string) =>{
    setElements((prev)=> prev.filter(element => element.id !==id));
   }

   const updateElement = (id:string,element:FormElementInstance)=>{
    setElements(pre=>{
        const newElements = [...pre];
        const index = newElements.findIndex(el => el.id===id);
        newElements[index] = element;
        return newElements;
    })
   }



    return (
        <DesignerContext.Provider value={{addElement,elements,removeElement,setSelectElement,selectedElement,updateElement,setElements}}>
            {children}

        </DesignerContext.Provider>
    )
}