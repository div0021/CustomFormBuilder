import { FormElement } from "./form-elements";
import { Button } from "./ui/button";
import { cn } from "@/lib/utils";


const SidebarBtnElementDragOverlay = ({formElement}:
    {formElement:FormElement}) => {

        const {label,icon:Icon} = formElement.designerBtnElement;
        

        return(
            <Button variant="outline" className={cn("flex flex-col gap-2 h-[120px] w-[120px] cursor-grab"
            )}
            >
                <Icon className="h-8 w-8 text-primary cursor-grab"/>
                <p className="text-xs">{label}</p>
            </Button>
        )

}
export default SidebarBtnElementDragOverlay;