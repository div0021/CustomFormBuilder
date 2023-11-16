import { UpdateFormContent } from "@/actions/form";
import { useDesigner } from "./hooks/useDesigner";
import { Button } from "./ui/button";
import {HiSaveAs} from "react-icons/hi"
import { toast } from "./ui/use-toast";
import { useTransition } from "react";
import { FaSpinner } from "react-icons/fa";


const SaveFormBtn = ({id}:{id:number}) => {
    const {elements} = useDesigner();
    const [loading,startTransition] = useTransition();

    const updateFormContent = async () => {
        try{

            const JSONElements = JSON.stringify(elements);

            await UpdateFormContent(id,JSONElements);

            toast({
                title: 'Success',
                description: `Your form has been saved`,
                
            })

        }catch(error){
            toast({
                title:"Error",
                description:"Something went Wrong!!",
                variant:"destructive",
            })
            console.log(error);
        }
    }
    return (
        <Button disabled={loading} 
        onClick={()=>startTransition(updateFormContent)}
        variant="outline" className="gap-2">
            <HiSaveAs className="h-4 w-4" />
             Save 
             {loading && <FaSpinner className="animate-spin" />}
        </Button>
    )
}
export default SaveFormBtn;