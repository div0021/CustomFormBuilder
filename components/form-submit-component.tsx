"use client"
import { HiCursorClick } from "react-icons/hi";
import { FormElementInstance, FormElements } from "./form-elements";
import { Button } from "./ui/button";
import { useCallback, useRef, useState, useTransition } from "react";
import { toast } from "./ui/use-toast";
import { ImSpinner2 } from "react-icons/im";
import { SubmitForm } from "@/actions/form";
import Link from "next/link";

const FormSubmitComponent = ({formUrl,content}:{
    content:FormElementInstance[],
    formUrl:string
}) => {

    const formValues = useRef<{[key:string]:string}>({});
    const formErrors = useRef<{[key:string]:boolean}>({});

    const [submitted,setSubmitted] = useState<boolean>(false);

    const [pending,startTransition] = useTransition()

    // This trik is used to rerender the component on error.
    const [renderKey,setRenderKey] = useState<number>(new Date().getTime());

    const validateForm:()=>boolean = useCallback(()=>{
        for(let field of content){
            const actualValue = formValues.current[field.id] || "";

            const valid = FormElements[field.type].validate(field,actualValue);

            if(!valid){
                formErrors.current[field.id]=true;
            }
        }

        if(Object.keys(formErrors.current).length>0){
            return false;
        }

        return true;
        
    },[content]);


    const submitValue = (key:string,value:string)=>{
        formValues.current[key]=value;
    }

    const submitForm = async () => {
        formErrors.current = {};
        const validForm = validateForm();

        if(!validForm){
            setRenderKey(new Date().getTime())
            toast({
                title:"Errors",
                description:"Please check the errors in your form before submitting.",
                variant:"destructive"
            });
            return;
        }

        try{
            const JsonContent= JSON.stringify(formValues.current);

            await SubmitForm(formUrl,JsonContent);
            setSubmitted(true);

        }catch(error){
            toast({
                title:"Error!",
                description:"Something went wrong! try again",
                variant:"destructive"
            })
        }
        console.log("Form value",formValues.current);
    }

    if(submitted){
        return (
            <div className="flex justify-center w-full h-full items-center p-8">
                <div className="max-w-[620px] flex flex-col gap-4 flex-grow bg-background w-full p-8 overflow-auto border shadow-xl shadow-blue-700 rounded">
                    <h1 className="font-bold text-3xl">Form Submitted</h1>
                    <p className="text-muted-foreground">
                        Thank you for filling out this form. You can close this form now.
                    </p>

                </div>

            </div>
        )
    }
    return (
        <div className="flex p-8 justify-center w-full h-full items-center">

            <div key={renderKey} className="max-w-[620px] flex flex-col gap-4 flex-grow bg-background w-full p-8 overflow-auto border shadow-xl shadow-blue-700 rounded">
                {
                    content.map(el=>{
                        const FormElement = FormElements[el.type].formComponent;
                        return (
                            <FormElement key={el.id} elementInstance={el} submitValue={submitValue} 
                            isInvalid={formErrors.current[el.id]}
                            defaultValue={
                                formValues.current[el.id]
                            }
                            />
                        )
                    })
                }
                <Button disabled={pending} className="mt-8" onClick={()=>startTransition(submitForm)}>
                    {!pending ? <HiCursorClick className="mr-2" /> : 
                    <ImSpinner2 className="mr-2 animate-spin" />
                    }
                    Submit
                </Button>

            </div>

        </div>
    )
}

export default FormSubmitComponent;