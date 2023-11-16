"use client"
import { LogOut, Moon, Sun } from "lucide-react";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuPortal, DropdownMenuSub, DropdownMenuSubContent, DropdownMenuSubTrigger, DropdownMenuTrigger } from "./ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { signOut } from "next-auth/react";
import { useTheme } from "next-themes";

interface UserButtonProps{
    src:string
}
const UserButton:React.FC<UserButtonProps> = ({src}) => {
    const {setTheme} = useTheme();
    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
            <Avatar className="cursor-pointer">
                <AvatarImage src={src ? src : "placeholder.jpg"} alt="person" />
                 <AvatarFallback>
                  CN
                 </AvatarFallback>
                </Avatar>            
                </DropdownMenuTrigger>
            <DropdownMenuContent className="w-52 space-y-1">
                <DropdownMenuSub>
                <DropdownMenuSubTrigger>
                <Sun className="mr-2 h-4 w-4 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
          <Moon className="mr-2 absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
          <span className="">Toggle theme</span>
          </DropdownMenuSubTrigger>
          <DropdownMenuPortal>
            <DropdownMenuSubContent >
                <DropdownMenuItem onClick={() =>{
                    console.log("Click"); setTheme("dark")}}>

                    {/* Dark mode */}
                    <Moon className="mr-2 w-4 h-4" />
                    <span>Dark</span>
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setTheme("light")}>

                    {/* light mode */}
                    <Sun className="mr-2 w-4 h-4" />
                    <span>Light</span>
                </DropdownMenuItem>
            </DropdownMenuSubContent>
          </DropdownMenuPortal>
          </DropdownMenuSub>
                <DropdownMenuItem onClick={()=>signOut()}>
                    <LogOut className="mr-2 h-4 w-4" />
                    <span>SignOut</span>
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    )
}
export default UserButton;