"use client";

import { BsFileEarmarkPlus } from "react-icons/bs";
import { ImSpinner2 } from "react-icons/im";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog";
import { Button } from "./ui/button";
import { useForm } from "react-hook-form";
import { formSchema, formSchemaType } from "@/lib/types";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormControl, FormField, FormItem, FormLabel } from "./ui/form";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import { toast } from "./ui/use-toast";
import { CreateForm } from "@/actions/form";
import { useRouter } from "next/navigation";

const CreateFormBtn = () => {
    const router = useRouter();

  const form = useForm<formSchemaType>({
    resolver: zodResolver(formSchema),
    defaultValues:{
        description:"",
        name:""
    }
  });

  // handle Submission

  const onSubmit = async (values: formSchemaType) => {

    try{
        const formId = await CreateForm(values);
        toast({
            title:"Success",
            description:"Form created successfully",
        });
        router.push(`/builder/${formId}`)
        // console.log(formId);
        form.reset();

    }catch(error){
        toast({
            title:"Error",
            description:"Something went wrong, please try again later",
            variant:"destructive"
        })
    }
  };
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline"
        className="group border border-primary/20 h-[220px] flex items-center justify-center flex-col hover:border-primary hover:cursor-pointer border-dashed gap-4">

        <BsFileEarmarkPlus className="h-8 w-8 text-muted-foreground group-hover:text-primary"/>
        <p className="font-bold text-xl text-muted-foreground group-hover:text-primary">Create form</p>
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Create form</DialogTitle>
          <DialogDescription>
            Create a new form to start collection responses
          </DialogDescription>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-2">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input disabled={form.formState.isSubmitting} {...field} />
                  </FormControl>
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Description</FormLabel>
                  <FormControl>
                    <Textarea disabled={form.formState.isSubmitting} rows={5} {...field}/>
                  </FormControl>
                </FormItem>
              )}
            />
          </form>
        </Form>
        <DialogFooter>
            <Button onClick={
                form.handleSubmit(onSubmit)
            } disabled={form.formState.isSubmitting} className="w-full mt-4">
                {!form.formState.isSubmitting && <span>Save</span>}
                {form.formState.isSubmitting && <ImSpinner2 className="animate-spin"/>}
            </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
export default CreateFormBtn;
