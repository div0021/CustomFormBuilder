"use client"
import * as z from "zod"
import { MdTextFields } from "react-icons/md";
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

const type:ElementsType = "TextField";

const extraAttributes = {
    label:"Text field",
    helperText:"Helper text",
    required:false,
    placeHolder:"Value here..."
}
 const propertiesSchema = z.object({
    label:z.string().min(2).max(50),
    helperText:z.string().max(200),
    required:z.boolean().default(false),
    placeHolder:z.string().max(50),
})

export type porpertiesSchemaType = z.infer<typeof propertiesSchema>

export type CustomInstance = FormElementInstance & {
    extraAttributes:{
        label:string,
        helperText:string,
        required:boolean,
        placeHolder:string,
    }
}

export const TextFieldFormElement:FormElement = {
    type,
    construct:(id:string)=> ({
        id,
        type,
        extraAttributes
    }),
    designerBtnElement:{
        icon:MdTextFields,
        label:"Text Field",

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
           <Input readOnly disabled placeholder={placeHolder} />
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
  
    const { label, helperText, placeHolder, required } = element.extraAttributes;
    return (
      <div className="flex flex-col gap-2 w-full">
        <Label className={cn(error && "text-rose-600")}>
          {label}
          {required && "*"}
        </Label>
        <Input
          onChange={(e) => {
            setValue(e.target.value);
  
            //check validation
            const valid = TextFieldFormElement.validate(element, e.target.value);
            setError(!valid);
          }}
          placeholder={placeHolder}
          onBlur={(e) => {
            if (!submitValue) {
              return;
            }
            // validate the user input
            const valid = TextFieldFormElement.validate(element, e.target.value);
            setError(!valid);
  
            if (!valid) return;
  
            submitValue(element.id, e.target.value);
          }}
          value={value}
          className={cn(error && "border-rose-600")}
        />
  
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
  
    const { updateElement } = useDesigner();
  
    const { label, helperText, placeHolder, required } = element.extraAttributes;
  
    const form = useForm<porpertiesSchemaType>({
      resolver: zodResolver(propertiesSchema),
      mode: "onBlur",
      defaultValues: {
        label,
        helperText,
        placeHolder,
        required,
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
                          
                      </FormItem>
                  )}
                  />
        </form>
      </Form>
    );
  };