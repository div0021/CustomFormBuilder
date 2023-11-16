"use client"

import { LuSeparatorHorizontal } from "react-icons/lu";
import { ElementsType, FormElement, FormElementInstance } from "../form-elements"
import * as z from "zod"
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { useEffect } from "react";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "../ui/form";
import { useDesigner } from "../hooks/useDesigner";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Slider } from "../ui/slider";

const type:ElementsType = "SpacerField";

export const propertiesSchema = z.object({
    height:z.number().min(5).max(200),
})

export type porpertiesSchemaType = z.infer<typeof propertiesSchema>

const extraAttributes = {
   height:20 // in px
}

export type CustomInstance = FormElementInstance & {
    extraAttributes:{
       height:number
    }
}

export const SpacerFieldFormElement:FormElement = {
    type,
    construct:(id:string)=> ({
        id,
        type,
        extraAttributes
    }),
    designerBtnElement:{
        icon:LuSeparatorHorizontal,
        label:"Spacer Field",

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

    const {height} = element.extraAttributes;
    return (
        <div className="flex flex-col items-center gap-2 w-full">
           <Label className="text-muted-foreground">
            Spacer field: {height}px
           </Label>
           <LuSeparatorHorizontal className="h-8 w-8" />
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
  
    const { height } = element.extraAttributes;
    return (
      <div style={{height,width:"100%"}}></div>
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
  
    const { height } = element.extraAttributes;
  
    const form = useForm<porpertiesSchemaType>({
      resolver: zodResolver(propertiesSchema),
      mode: "onBlur",
      defaultValues: {
       height
      },
    });
  
    useEffect(() => {
      form.reset(element.extraAttributes);
    }, [element, form]);
  
    const applyChanges = (values: porpertiesSchemaType) => {
      updateElement(element.id, {
        ...element,
        extraAttributes: {
          height:values.height
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
            name="height"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Height (px):{form.watch("height")}</FormLabel>
                <FormControl>
                  <Slider className="pt-2"  
                     defaultValue={[field.value]}
                     min={5} max={200} step={1}
                     onValueChange={(value)=>{
                      field.onChange(value[0])

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