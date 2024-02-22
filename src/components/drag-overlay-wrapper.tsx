import { ElementsType, FormElements } from '@/components/form-elements';
import useDesigner from '@/components/hooks/use-designer';
import { SidebarButtonElementDragOverlay } from '@/components/sidebar-button-element';
import { Active, DragOverlay, useDndMonitor } from '@dnd-kit/core';
import React, { useState } from 'react';

const DragOverlayWrapper = () => {
  const { elements } = useDesigner();
  const [draggedItem, setDraggedItem] = useState<Active | null>(null);
  useDndMonitor({
    onDragStart: (event) => {
      setDraggedItem(event.active);
    },
    onDragCancel: () => {
      setDraggedItem(null);
    },
    onDragEnd: () => {
      setDraggedItem(null);
    },
  });

  if (!draggedItem) return null;
  let node = <div>No drag overlay</div>;
  const isSidebarBtnElement = draggedItem?.data.current?.isDesignerBtnElement;

  if (isSidebarBtnElement) {
    const type = draggedItem?.data?.current?.type as ElementsType;
    node = <SidebarButtonElementDragOverlay formElement={FormElements[type]} />;
  }
  const isDesignerLement = draggedItem?.data.current?.isDesignerElement;
  if (isDesignerLement) {
    const elementId = draggedItem?.data.current?.elementId;
    const element = elements.find((el) => el.id === elementId);
    if (!element) node = <div>No element found</div>;
    else {
      const DesignerElementComponent =
        FormElements[element.type].designerComponent;
      node = (
        <div className="flex bg-accent border rounded-lg h-[120px] w-full  py-2 px-4 opacity-60 pointer pointer-events-none">
          <DesignerElementComponent elementInstance={element} />
        </div>
      );
    }
  }

  return <DragOverlay>{node}</DragOverlay>;
};

export default DragOverlayWrapper;
