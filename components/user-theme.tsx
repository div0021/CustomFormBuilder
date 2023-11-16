"use client"
import { useTheme } from "next-themes"
import { useEffect, useState } from "react"
import { Tabs, TabsList, TabsTrigger } from "./ui/tabs";
import { MoonIcon, SunIcon } from "lucide-react";
import { BiDesktop } from "react-icons/bi";


const UserTheme = () => {
    const {theme,setTheme} = useTheme();
    const [isMounted,setIsMounted] = useState<boolean>(false);

    useEffect(()=>{
        setIsMounted(true);
    },[]);

    if(!isMounted){
        return null;
    }
    
    return (
        <Tabs defaultValue={theme} >
            <TabsList className="border">
                <TabsTrigger value="light" onClick={()=> setTheme("light")}>
                    <SunIcon className="h-[1.2rem] w-[1.2rem]"  />
                </TabsTrigger>
                <TabsTrigger value="dark" onClick={()=> setTheme("dark")}>
                    <MoonIcon className="h-[1.2rem] w-[1.2rem] rotate-90 transition-all dark:rotate-0"  />
                </TabsTrigger>
                <TabsTrigger value="system" onClick={()=> setTheme("system")}>
                    <BiDesktop className="h-[1.2rem] w-[1.2rem]"  />
                </TabsTrigger>
            </TabsList>
        </Tabs>
    )
}
export default UserTheme;