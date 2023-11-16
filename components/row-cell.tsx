import { ReactNode } from "react";
import { ElementsType } from "./form-elements";
import { TableCell } from "./ui/table";
import { Badge } from "./ui/badge";
import { format } from "date-fns";
import { Checkbox } from "./ui/checkbox";

const RowCell = ({type,value}:{type:ElementsType,value:string}) => {

    let node:ReactNode = value;

    switch(type){
        case "DateField":
            if(!value) break;
            const date = new Date(value);
            node = <Badge variant={"outline"}>
                {format(date,"dd/MM/yyyy")}
            </Badge>
            break;
        case "CheckboxField":
            const checked = value === "true" ? true : false;
            node = <Checkbox checked={checked} disabled />
            break;
        default:
            break;
    }
    return (
        <TableCell>{node}</TableCell>
    )

}
export default RowCell;