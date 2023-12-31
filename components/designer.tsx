"use client";

import { cn } from "@/lib/utils";
import DesignerSidebar from "./designer-sidebar";
import { DragEndEvent, useDndMonitor, useDroppable } from "@dnd-kit/core";
import {
  ElementsType,
  FormElementInstance,
  FormElements,
} from "./form-elements";
import { useDesigner } from "./hooks/useDesigner";
import { idGenerator } from "@/lib/idgenerator";
import DesignerElementWrapper from "./designer-element-wrapper";

const Designer = () => {
  const {
    addElement,
    elements,
    selectedElement,
    setSelectElement,
    removeElement,
  } = useDesigner();

  const droppable = useDroppable({
    id: "designer-drop-area",
    data: {
      isDesignerDropArea: true,
    },
  });

  useDndMonitor({
    onDragEnd: (event: DragEndEvent) => {
      const { active, over } = event;
      if (!active || !over) {
        return;
      }
      const isDesignerBtnElement = active.data?.current?.isDesignerBtnElement;


      const isDroppingOverDesignerArea = over.data?.current?.isDesignerDropArea;

      // first case: dropping a sidebar button element over the designer drop area

      if (isDesignerBtnElement && isDroppingOverDesignerArea) {
        const type = active.data?.current?.type;
        const newElement = FormElements[type as ElementsType].construct(
          idGenerator()
        );

        addElement(elements.length, newElement);
      }

      // second case : dropping a sidebar button over a Designer element

      const isDroppingOverDesignerElement =
        over.data?.current?.isTopHalfDesignerElement ||
        over.data?.current?.isBottomHalfDesignerElement;

      if (isDesignerBtnElement && isDroppingOverDesignerElement) {
        const type = active.data?.current?.type;
        const newElement = FormElements[type as ElementsType].construct(
          idGenerator()
        );

        const overId = over.data?.current?.elementId;

        const overElementIndex = elements.findIndex((el) => el.id === overId);

        if (overElementIndex === -1) {
          throw new Error("Element is not found!");
        }

        let newIndex = overElementIndex;

        if (over.data?.current?.isBottomHalfDesignerElement) {
          newIndex = overElementIndex + 1;
        }


        addElement(newIndex, newElement);
      }

      // third case: dragging a designer element over another designer element

      const isDraggingDesignerElement = active.data?.current?.isDesignerElement;


      const draggingDesignerElementOverAnotherDesignerElement =
        isDroppingOverDesignerElement && isDraggingDesignerElement;


      if (draggingDesignerElementOverAnotherDesignerElement) {
        const activeId = active.data?.current?.elementId;
        const overId = over.data?.current?.elementId;

        const activeElementIndex = elements.findIndex(
          (el) => el.id === activeId
        );

        const overElementIndex = elements.findIndex((el) => el.id === overId);

        if (activeElementIndex === -1 || overElementIndex === -1) {
          throw new Error("element not found!!");
        }

        const activeElement = { ...elements[activeElementIndex] };

        removeElement(activeId);

        let newIndex = overElementIndex;


        if (over.data?.current?.isBottomHalfDesignerElement) {
          newIndex = overElementIndex + 1;
        }


        addElement(newIndex, activeElement);
      }
    },
  });
  return (
    <div className="flex w-full h-full">
        
      <div
        className="p-4 w-full"
        onClick={() => {
          if (selectedElement) {
            setSelectElement(null);
          }
        }}
      >
        <div
          ref={droppable.setNodeRef}
          id="overflow"
          className={cn(
            "bg-background max-w-[920px] h-full rounded-xl m-auto flex flex-col flex-grow items-center justify-start flex-1 overflow-y-auto",
            droppable.isOver && "ring-2 ring-primary ring-inset"
          )}
        >
          {!droppable.isOver && elements.length === 0 && (
            <p className="text-3xl text-muted-foreground flex flex-grow items-center font-bold">
              Drop here
            </p>
          )}
          {droppable.isOver && elements.length === 0 && (
            <div className="p-4 w-full">
              <div className="h-[120px] rounded-md bg-primary/20"></div>
            </div>
          )}

          {elements.length > 0 && (
            <div className="flex flex-col w-full gap-2 p-4">
              {elements.map((element) => (
                <DesignerElementWrapper key={element.id} element={element} />
              ))}
            </div>
          )}
        </div>
      </div>
      <DesignerSidebar />
    </div>
  );
};

export default Designer;
