
import { FormElementInstance } from "@/components/form-elements";
import * as z from "zod"

export const LoginSchema = z.object({
    email:z.string().email().min(1,{message:"Write something!"}),
    password:z.string().min(8,{
        message:"The password must contain 8-30 characters. In that atleast one character is uppercase, one letter is lowercase, one will be number and also one will be any special symbol like $"
    }).max(30,{
        message:"The password must contain 8-30 characters. In that atleast one character is uppercase, one letter is lowercase, one will be number and also one will be any special symbol like $"
    }).regex(/(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[^A-Za-z0-9])(?=.{8,})/,{message:"The password must contain 8-30 characters. In that atleast one character is uppercase, one letter is lowercase, one will be number and also one will be any special symbol like $"})
});

export type LoginSchemaType = z.infer<typeof LoginSchema>


export const SignupSchema = z.object({
    name:z.string().min(3,{message:"Write something!"}).max(20,{message:"Name is too big!"}),
    email:z.string().email().min(1,{message:"Write something!"}),
    password:z.string().min(8,{
        message:"The password must contain 8-30 characters. In that atleast one character is uppercase, one letter is lowercase, one will be number and also one will be any special symbol like $"
    }).max(30,{
        message:"The password must contain 8-30 characters. In that atleast one character is uppercase, one letter is lowercase, one will be number and also one will be any special symbol like $"
    }).regex(/(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[^A-Za-z0-9])(?=.{8,})/,{message:"The password must contain 8-30 characters. In that atleast one character is uppercase, one letter is lowercase, one will be number and also one will be any special symbol like $"})
});

export type SignupSchemaType = z.infer<typeof SignupSchema>


export const formSchema = z.object({
    name:z.string().min(4),
    description:z.string().optional(),
})

export type formSchemaType = z.infer<typeof formSchema>


// types for form instance

