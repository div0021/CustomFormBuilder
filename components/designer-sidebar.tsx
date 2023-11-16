import FormElementSidebar from "./form-element-sidebar";
import { FormElements } from "./form-elements";
import { useDesigner } from "./hooks/useDesigner";
import PropertiesFormSidebar from "./properties-form-sidebar";


const DesignerSidebar = () => {
   const {selectedElement} = useDesigner();
    return (
       <aside className="w-[400px] max-w-[400px] flex flex-col flex-grow gap-2 border-t-2 border-muted p-4 bg-background overflow-y-auto h-full">
          {
            selectedElement ? <PropertiesFormSidebar /> : <FormElementSidebar />
          }
       </aside>
    )
}
export default DesignerSidebar;