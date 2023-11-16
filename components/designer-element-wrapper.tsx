import { useDraggable, useDroppable } from "@dnd-kit/core";
import { FormElementInstance, FormElements } from "./form-elements";
import { useState } from "react";
import { Button } from "./ui/button";
import { BiSolidTrash } from "react-icons/bi";
import { useDesigner } from "./hooks/useDesigner";
import { cn } from "@/lib/utils";

function DesignerElementWrapper({ element }: { element: FormElementInstance }) {
  const draggable = useDraggable({
    id: element.id + "-drag-handler",
    data: {
      type: element.type,
      elementId: element.id,
      isDesignerElement: true,
    },
  });

  const { removeElement,selectedElement,setSelectElement} = useDesigner();
  const [mouseHover, setMouseHover] = useState<boolean>(false);

  const DesignerElement = FormElements[element.type].designerComponent;

  const topHalf = useDroppable({
    id: element.id + "-top",
    data: {
      type: element.type,
      elementId: element.id,
      isTopHalfDesignerElement: true,
    },
  });

  const bottomHalf = useDroppable({
    id: element.id + "-bottom",
    data: {
      type: element.type,
      elementId: element.id,
      isBottomHalfDesignerElement: true,
    },
  });

  if (draggable.isDragging) {
    return null;
  }

  return (
    <>
      <div
        className="relative h-[120px] flex flex-col text-foreground hover:cursor-pointer rounded-md ring-1 ring-accent ring-inset"
        {...draggable.listeners}
        {...draggable.attributes}
        ref={draggable.setNodeRef}
        onMouseEnter={() => {
          setMouseHover(true);
        }}
        onMouseLeave={() => {
          setMouseHover(false);
        }}
        onClick={(e)=>{
            e.preventDefault();
            e.stopPropagation();
            setSelectElement(element);
        }}
      >
        <div
          ref={topHalf.setNodeRef}
          className="absolute w-full h-1/2 rounded-t-md"
        ></div>
        <div
          ref={bottomHalf.setNodeRef}
          className="absolute bottom-0 w-full h-1/2 rounded-b-md"
        ></div>

        {/* When mouse is hovered */}
        {mouseHover && (
          <>
            <div className="absolute right-0 h-full z-10">
              <Button
                className="flex justify-center items-center h-full border rounded-md rounded-l-none bg-rose-500"
                variant={"outline"}
                onClick={(e) => {
                    e.stopPropagation();
                  removeElement(element.id);
                }}
              >
                <BiSolidTrash className="h-6 w-6" />
              </Button>
            </div>
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 animate-pulse">
              <p className="text-muted-foreground text-sm">
                Click for properties or drag to move
              </p>
            </div>
          </>
        )}

        {
            topHalf.isOver && (
                <div className="bg-primary top-0 absolute w-full rounded-md h-1.5 rounded-b-none"/>
            )
        }

        <div
          className={cn(
            "w-full h-[120px] flex items-center rounded-md bg-accent/40 px-4 py-2 pointer-events-none opacity-100",
            mouseHover && "opacity-30",
          )}
        >
          <DesignerElement elementInstance={element} />
        </div>

        {
            bottomHalf.isOver && (
                <div className="bg-primary bottom-0 w-full h-1.5 rounded-md rounded-t-none" />
            )
        }
      </div>
    </>
  );
}

export default DesignerElementWrapper;
