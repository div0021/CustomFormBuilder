"use client"
import { zodResolver } from "@hookform/resolvers/zod";
import Input from "./input";
import {Lock,LogIn,Mail} from "lucide-react"
import { useForm,SubmitHandler } from "react-hook-form";
import {useState,useEffect} from "react"
import { AuthType } from "./auth";
import {signIn} from "next-auth/react"
import { useRouter } from "next/navigation";
import { useToast } from "./ui/use-toast";
import { LoginSchema, LoginSchemaType } from "@/lib/types";


interface LoginProps {
    handleAuth:(id:AuthType) => void
}
const Login:React.FC<LoginProps> = ({handleAuth}) => {
    const {toast} = useToast();
    const form = useForm<LoginSchemaType>({
        resolver:zodResolver(LoginSchema),
        defaultValues:{
            email:'',
            password:""
        }
    });

    const [loading,setLoading] = useState<boolean>(form.formState.isSubmitting);

    useEffect(()=>{

        setLoading(form.formState.isSubmitting);
        return () => setLoading(false);
    },[form.formState.isSubmitting]);

    const router = useRouter();

    //handling onSubmit

    const onSubmit:SubmitHandler<LoginSchemaType> = (values) => {
       signIn('credentials',{
        ...values,
        redirect:false
      }).then((callback)=>{
        if(callback?.ok){
            router.push("/forms");
        }
        if(callback?.error){
            toast({
                title:"Some thing went wrong!!",
                description:callback.error,
                variant:"destructive"
            })
            console.log("Something went wrong!!");
        }
      })
    }

    return (
        <div className="w-full h-full bg-black/90 text-white">
            <div className="w-full h-[100dvh] flex justify-center items-center">
                <div className="overflow-hidden bg-purple-500 rounded-xl p-1 relative before:absolute before:bg-gray-500 before:w-[55rem] before:h-[55rem] before:rounded-full before:top-1/2 before:left-1/2 
                before:bg-gradient-to-r from-[#d896ff] to-[#660066] before:animate-mySpin before:z-10 min-w-[350px] max-w-[530px]">
                    <div className="bg-transparent/80 rounded-lg relative z-20 px-5 py-5 space-y-2">
                    <div className="text-center font-semibold text-3xl tracking-wider pb-2">
                        Welcome Back!!
                    </div>
                    <hr />
                    <div>
                        <form onSubmit={form.handleSubmit(onSubmit)} className="py-3 space-y-3">
                            <Input label="Email" icon={Mail} isPassword={false} placeholder="Enter Your name" type="text" register={form.register} disabled={loading} id="email" authType="login"/>

                            {form.formState.errors.email && (
                                <span className="text-rose-600 font-semibold tracking-wide">
                                {form.formState.errors.email.message}
                                </span>
                            )}

                            <Input label="Password" type="password" isPassword placeholder="Enter your password" icon={Lock} register={form.register} disabled={loading} id="password" authType="login"/>
                            {form.formState.errors.password && (
                                <span className="text-rose-600 font-semibold tracking-wide">
                                {form.formState.errors.password.message}
                                </span>
                            )}

                            <div className="pt-5 w-full flex justify-center items-center">
                                <button className="bg-[#660066]/70 px-20 w-full py-3 rounded-xl border-2 border-transparent  hover:bg-none hover:bg-transparent hover:border-[#660066]  tracking-wider transition-all duration-200 ease-in-out relative group" type="submit">
                                    <LogIn className="w-5 h-5 text-white absolute top-1/3 left-3 group-hover:left-[25%] sm:group-hover:left-[37%]  opacity-0 group-hover:opacity-100 transition-all duration-200 ease-in-out"/>

                                    <span>
                                        Login
                                    </span>
                                </button>
                            </div>
                        </form>
                    </div>

                    <div className="pb-2 relative flex justify-center items-center">
                    <hr className="w-[45%] bg-gradient-to-r h-0.5 rounded-sm border-none from-[#d896ff] to-black" />
                    
                         <span className=" bg-transparent px-3 tracking-wider ">
                            or
                         </span>
                        
                        <hr className="w-3/6 bg-gradient-to-r h-0.5 rounded-sm border-none to-[#d896ff] from-black" />
                    </div>

                    <div className="mt-5 w-full flex justify-center items-center">
                                <button className="bg-[#660066] px-20 w-full py-3 rounded-xl border-2 border-transparent hover:bg-transparent hover:border-[#660066] tracking-wider transition-all duration-200 ease-in-out">
                                    Login with Google
                                </button>
                            </div>

                            <div>
                                <p className="text-center text-sm">Don&apos;t have an <span className="underline text-[#d896ff] cursor-pointer" onClick={() => handleAuth("signup")}>account</span> ?</p>
                            </div>
                    </div>
                </div>
            </div>
        </div>
    )

}

export default Login;