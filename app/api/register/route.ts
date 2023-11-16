import { db } from "@/lib/db";
import { SignupSchema } from "@/lib/types";
import bcrypt from "bcrypt"
import { NextResponse } from "next/server";

export async function POST(req:Request){

    try{
    const body = await req.json();
    const result = SignupSchema.safeParse(body);

    if(!result.success){
        let errorMessage = "";
        
        result.error.issues.forEach((issue)=>{
            errorMessage = errorMessage + issue.path[0] + ": " + issue.message + ". ";
        });

        return NextResponse.json({errorMessage});
    }
    
    const {email,name,password} = result.data;

    const hashedPassword = await bcrypt.hash(password,12);

    const user = await db.user.create({
        data:{
            email,name,hashedPassword
        }
    });
    if(!user){
        return NextResponse.json({errorMessage:"User unable to create. Try again!"});
    }
    return NextResponse.json(user);

}catch(error:any){
    console.log("Error in sign up",error?.meta?.target[0]);
    if(error?.meta?.target[0]){
        return NextResponse.json({errorMessage:`This ${error?.meta?.target[0]} already exists!`})
    }
    return new NextResponse("Server Internal Error",{status:501})
}
}