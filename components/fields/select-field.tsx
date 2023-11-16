"use client"
import * as z from "zod"
import { RxDropdownMenu } from "react-icons/rx";
import { ElementsType, FormElement, FormElementInstance, submitFunction } from "../form-elements"
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import { useDesigner } from "../hooks/useDesigner";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "../ui/form";
import { Switch } from "../ui/switch";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";
import { toast } from "../ui/use-toast";
import { Separator } from "../ui/separator";
import { Button } from "../ui/button";
import { AiOutlineClose, AiOutlinePlus } from "react-icons/ai";

const type:ElementsType = "SelectField";

const extraAttributes = {
    label:"Select field",
    helperText:"Helper text",
    required:false,
    placeHolder:"Value here...",
    options:[],
}
 const propertiesSchema = z.object({
    label:z.string().min(2).max(50),
    helperText:z.string().max(200),
    required:z.boolean().default(false),
    placeHolder:z.string().max(50),
    options:z.array(z.string()).default([]),
})

export type porpertiesSchemaType = z.infer<typeof propertiesSchema>

export type CustomInstance = FormElementInstance & {
    extraAttributes:typeof extraAttributes;
}

export const SelectFieldFormElement:FormElement = {
    type,
    construct:(id:string)=> ({
        id,
        type,
        extraAttributes
    }),
    designerBtnElement:{
        icon:RxDropdownMenu,
        label:"Select Field",

    },
    designerComponent:DesignerComponent,
    formComponent:FormComponent,
    propertiesComponent:PropertiesComponent,
    validate:(formElement:FormElementInstance,currentValue:string):boolean=>{
        const element = formElement as CustomInstance;
        if(element.extraAttributes?.required){
            return currentValue.length > 0;
        }

        return true;
    }

}

function DesignerComponent({elementInstance}:{
    elementInstance:FormElementInstance
}) {
    const element = elementInstance as CustomInstance;

    const {label,helperText,placeHolder,required} = element.extraAttributes;
    return (
        <div className="flex flex-col gap-2 w-full">
           <Label>
            {label}
            {required && "*"}
           </Label>
           <Select>
            <SelectTrigger className="w-full">
              <SelectValue placeholder={placeHolder} />

            </SelectTrigger>
           </Select>
           {helperText && <p className="text-muted-foreground text-[0.8rem]">
            {helperText}
            </p>}
        </div>
    )
}

//form component

function FormComponent ({
    elementInstance,
    submitValue,
    isInvalid,
    defaultValue,
  }: {
    elementInstance: FormElementInstance;
    submitValue?: submitFunction;
    isInvalid?: boolean;
    defaultValue?: string;
  }){
    const element = elementInstance as CustomInstance;
  
    const [value, setValue] = useState<string>(defaultValue ||"");
    const [error, setError] = useState<boolean>(false);
  
    useEffect(() => {
      setError(isInvalid === true);
    }, [isInvalid]);
  
    const { label, helperText, placeHolder, required,options } = element.extraAttributes;
    return (
      <div className="flex flex-col gap-2 w-full">
        <Label className={cn(error && "text-rose-600")}>
          {label}
          {required && "*"}
        </Label>
        <Select defaultValue={value} onValueChange={(value=>{
          setValue(value);
          if(!submitValue) return;

          const valid = SelectFieldFormElement.validate(element,value);
          setError(!valid);
          submitValue(element.id,value);

        })}>
            <SelectTrigger className={cn("w-full",
            error && "border-rose-600"
            )}>
              <SelectValue placeholder={placeHolder} />
            </SelectTrigger>
            <SelectContent>
              {options.map((option)=>(
                <SelectItem key={option} value={option}>
                    {option}
                </SelectItem>
              ))}
            </SelectContent>
           </Select>
  
        {helperText && (
          <p
            className={cn(
              "text-muted-foreground text-[0.8rem]",
              error && "text-rose-600"
            )}
          >
            {helperText}
          </p>
        )}
      </div>
    );
  };

  // properties component

  function PropertiesComponent({
    elementInstance,
  }: {
    elementInstance: FormElementInstance;
  }) {
    const element = elementInstance as CustomInstance;
  
    const { updateElement,setSelectElement } = useDesigner();
  
    const { label, helperText, placeHolder, required,options } = element.extraAttributes;
  
    const form = useForm<porpertiesSchemaType>({
      resolver: zodResolver(propertiesSchema),
      mode: "onSubmit",
      defaultValues: {
        label,
        helperText,
        placeHolder,
        required,
        options
      },
    });
  
    useEffect(() => {
      form.reset(element.extraAttributes);
    }, [element, form]);
  
    const applyChanges = (values: porpertiesSchemaType) => {
      updateElement(element.id, {
        ...element,
        extraAttributes: {
          ...values,
        },
      });

      toast({
        title:"Success",
        description:"Properties saved successfully",
      });

      setSelectElement(null);
    };
  
    return (
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(applyChanges)}
          className="space-y-3"
        >
  
          {/* Label */}
          <FormField
            control={form.control}
            name="label"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Label</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    onKeyDown={(e) => {
                      if (e.key === "Enter") {
                        e.currentTarget.blur();
                      }
                    }}
                  />
                </FormControl>
                <FormDescription>
                  The label of the field. <br />
                  It will be displayed above the field.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
  
          {/* Placeholder */}
  
          <FormField
            control={form.control}
            name="placeHolder"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Placeholder</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    onKeyDown={(e) => {
                      if (e.key === "Enter") {
                        e.currentTarget.blur();
                      }
                    }}
                  />
                </FormControl>
                <FormDescription>The placeholder of the field.</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
  
          {/* helper text */}
  
          <FormField
            control={form.control}
            name="helperText"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Helper text</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    onKeyDown={(e) => {
                      if (e.key === "Enter") {
                        e.currentTarget.blur();
                      }
                    }}
                  />
                </FormControl>
                <FormDescription>
                  The helper text of the field. <br />
                  It will be displayed below the field.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <Separator />

          {/* options */}

          <FormField
            control={form.control}
            name="options"
            render={({ field }) => (
              <FormItem>
                <div className="flex items-center justify-between">
                <FormLabel>Options</FormLabel>
                <Button variant={"outline"} onClick={(e)=>{e.preventDefault();
                form.setValue("options",field.value.concat("New option"));
                }}>
                  <AiOutlinePlus className="mr-2"/>
                  Add
                </Button>
                </div>      

                <div className="flex gap-2 flex-col">
                  
                  {
                    form.watch("options").map((option,index)=>(
                      <div key={index} className="flex items-center justify-between gap-1">
                        <Input placeholder="" 
                        value={option}
                        onChange={(e)=>{
                          field.value[index]=e.target.value;
                          field.onChange(field.value);
                        }}
                        />
                        <Button variant={"ghost"}
                        size={"icon"}
                        onClick={(e)=>{
                          e.preventDefault();
                          const newOptions = [...field.value];
                          newOptions.splice(index,1);
                          field.onChange(newOptions);
                        }}
                        >
                          <AiOutlineClose />
                        </Button>

                      </div>
                    ))
                  }
                  </div>          
                <FormDescription>
                  The helper text of the field. <br />
                  It will be displayed below the field.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />


          <Separator />
  
          {/* Required */}
  
          <FormField 
                  control={form.control}
                  name="required"
                  render={({field})=>(
                      <FormItem className="flex items-center justify-between rounded-lg border p-3 shadow-sm">
  
                          <div className="space-y-0.5">
                          <FormLabel>Required</FormLabel>
                          
                          <FormDescription>
                              The label of the field. <br />It will be displayed above the field.
                          </FormDescription>
                          </div>
                          <FormControl>
                              <Switch 
                              checked={field.value}
                              onCheckedChange={field.onChange}
                              />
                          </FormControl>
                          <FormMessage />
                      </FormItem>
                  )}
                  />

                  <Separator />
                  <Button className="w-full" type="submit">
                      Save
                  </Button>
        </form>
      </Form>
    );
  };