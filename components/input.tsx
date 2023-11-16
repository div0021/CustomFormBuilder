"use client"
import { Eye, LucideIcon,EyeOff } from "lucide-react";
import {useState} from "react"
import {UseFormRegister} from "react-hook-form"
import { LoginSchemaType, SignupSchemaType } from "@/lib/types";

type SignupType = "email" | "name" | "password"

type InputProps =  {
  icon: LucideIcon;
  isPassword: boolean;
  type?: string;
  placeholder: string;
  label: string;
  disabled:boolean
  id:SignupType
} & ({
  authType:"signup",
  register:UseFormRegister<SignupSchemaType>

} | {
  authType:"login",
  register:UseFormRegister<LoginSchemaType>

})

const Input: React.FC<InputProps> = ({
  icon: Icon,
  isPassword,
  type = "text",
  placeholder = "",
  label,
  disabled,
  register,
  id
}) => {
    const [focus,setFocus]=useState<boolean>(false);
    const [visible,setVisible]=useState<boolean>(false);
    let inputType=type;
    if(type==="password"){
       visible ? inputType="text":inputType="password"
    }
  return (
    <div className="space-y-1">
      <label className={`${focus ? "font-semibold":"font-normal"}`} htmlFor="">
        {label}
      </label>
      <div className="w-80 sm:w-[30rem] flex bg-zinc-400 h-12 justify-between items-center rounded-xl px-3 outline-red-500 border-2 border-[#660066] focus:outline-lime-600 ring-2 ring-transparent hover:ring-offset-2 focus-within:ring-offset-2 relative">
        <div className="flex gap-1 items-center">
          <Icon className="w-5 h-5 text-black" />
          <input
            className="outline-none text-black w-56 sm:w-96 tracking-wider bg-transparent focus-within:bg-transparent placeholder:text-black" onFocus={()=>setFocus(true)} 
            type={inputType }
            placeholder={placeholder} autoComplete="false"
            //@ts-ignore
            {...register(id,{
              onBlur:() => setFocus(false),
              disabled
            }
            )}
          />
        </div>
        {isPassword && (visible ? <EyeOff className="w-5 h-5 text-black cursor-pointer" onClick={()=>setVisible(false)}/> : <Eye className="w-5 h-5 text-black cursor-pointer" onClick={()=>setVisible(true)}/>)}
      </div>

    </div>
  );
};

export default Input;
