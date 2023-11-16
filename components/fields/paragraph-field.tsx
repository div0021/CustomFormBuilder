"use client"

import { ElementsType, FormElement, FormElementInstance } from "../form-elements"
import * as z from "zod"
import { Label } from "../ui/label";
import { useEffect } from "react";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "../ui/form";
import { useDesigner } from "../hooks/useDesigner";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { BsTextParagraph } from "react-icons/bs";
import { Textarea } from "../ui/textarea";

const type:ElementsType = "ParagraphField";

export const propertiesSchema = z.object({
    text:z.string().min(2).max(500),
})

export type porpertiesSchemaType = z.infer<typeof propertiesSchema>

const extraAttributes = {
    text:"Text field",
}

export type CustomInstance = FormElementInstance & {
    extraAttributes:{
       text:"Text here"
    }
}

export const ParagraphFieldFormElement:FormElement = {
    type,
    construct:(id:string)=> ({
        id,
        type,
        extraAttributes
    }),
    designerBtnElement:{
        icon:BsTextParagraph,
        label:"Paragraph Field",

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

    const {text} = element.extraAttributes;
    return (
        <div className="flex flex-col gap-2 w-full">
           <Label className="text-muted-foreground">
            Paragraph field
           </Label>
           <p>{text}</p>
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
  
    const { text } = element.extraAttributes;
    return (
      <p>{text}</p>
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
  
    const { text } = element.extraAttributes;
  
    const form = useForm<porpertiesSchemaType>({
      resolver: zodResolver(propertiesSchema),
      mode: "onBlur",
      defaultValues: {
       text
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
  
          {/* text */}
          <FormField
            control={form.control}
            name="text"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Text</FormLabel>
                <FormControl>
                  <Textarea
                  rows={5}
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