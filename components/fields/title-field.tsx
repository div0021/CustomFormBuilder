"use client"

import { LuHeading1 } from "react-icons/lu";
import { ElementsType, FormElement, FormElementInstance } from "../form-elements"
import * as z from "zod"
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { useEffect } from "react";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "../ui/form";
import { useDesigner } from "../hooks/useDesigner";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

const type:ElementsType = "TitleField";

export const propertiesSchema = z.object({
    title:z.string().min(2).max(50),
})

export type porpertiesSchemaType = z.infer<typeof propertiesSchema>

const extraAttributes = {
    title:"Title field",
}

export type CustomInstance = FormElementInstance & {
    extraAttributes:{
       title:string
    }
}

export const TitleFieldFormElement:FormElement = {
    type,
    construct:(id:string)=> ({
        id,
        type,
        extraAttributes
    }),
    designerBtnElement:{
        icon:LuHeading1,
        label:"Title Field",

    },
    designerComponent:DesignerComponent,
    formComponent:FormComponent,
    propertiesComponent:PropertiesComponent,
    validate:()=>true,

}

function DesignerComponent({elementInstance}:{
    elementInstance:FormElementInstance
}) {
    const element = elementInstance as CustomInstance;

    const {title} = element.extraAttributes;
    return (
        <div className="flex flex-col gap-2 w-full">
           <Label className="text-muted-foreground">
            Title field
           </Label>
           <p className="text-xl">{title}</p>
        </div>
    )
}

// form component

function FormComponent({
    elementInstance,
  }: {
    elementInstance: FormElementInstance;
  }) {
    const element = elementInstance as CustomInstance;
  
    const { title } = element.extraAttributes;
    return (
      <p className="text-xl">{title}</p>
    );
  };

  // properties component

  function PropertiesComponent({
    elementInstance,
  }: {
    elementInstance: FormElementInstance;
  }){
    const element = elementInstance as CustomInstance;
  
    const { updateElement } = useDesigner();
  
    const { title } = element.extraAttributes;
  
    const form = useForm<porpertiesSchemaType>({
      resolver: zodResolver(propertiesSchema),
      mode: "onBlur",
      defaultValues: {
       title
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
    };
  
    return (
      <Form {...form}>
        <form
          onBlur={form.handleSubmit(applyChanges)}
          onSubmit={(e) => {
            e.preventDefault();
          }}
          className="space-y-3"
        >
  
          {/* title */}
          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Title</FormLabel>
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
                <FormMessage />
              </FormItem>
            )}
          />
        </form>
      </Form>
    );
  };