import { FaSpinner } from "react-icons/fa";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "./ui/alert-dialog";
import { Button } from "./ui/button";
import { MdOutlinePublish } from "react-icons/md";
import { useTransition } from "react";
import { toast } from "./ui/use-toast";
import { publishForm } from "@/actions/form";
import { useRouter } from "next/navigation";


const PublishFormBtn = ({id}:{id:number}) => {

    const [loading,startTransition] = useTransition();
    const router = useRouter();

    async function handlePublishForm() {
        try{
           await publishForm(id);

           toast({
            title:"Success",
            description: 'Your form is now available to public',
          });

          router.refresh();

        }catch(error){
            toast({
                title:"Error",
                description:"Something went wrong!",
                variant:"destructive"
            })
            console.log(error);
        }

    }
    return (
        
        <AlertDialog>
            <AlertDialogTrigger asChild>
            <Button className="gap-2 text-white bg-gradient-to-t from-[#d896ff] to-[#660066]" variant="outline">
            <MdOutlinePublish className="w-4 h-4"/>
            Publish
        </Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
                <AlertDialogHeader>
                <AlertDialogTitle>
                    Are you sure?
                </AlertDialogTitle>
                <AlertDialogDescription>
                    This action can&#39;t be undone. After pusblishing you will not able to edit this form.<br /><br />
                    <span className="font-medium">
                        By publishing this form you will make it available to the public and you will be able to collect submissions.
                    </span>
                </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <AlertDialogCancel>
                        Cancel
                    </AlertDialogCancel>
                    <AlertDialogAction disabled={loading} onClick={(e)=>{
                        e.preventDefault();
                        startTransition(handlePublishForm);
                        }}>
                        Proceed {loading && <FaSpinner className="ml-2 animate-spin" />}
                    </AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>

        
    )
}

export default PublishFormBtn;