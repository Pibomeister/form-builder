import { FormElement } from '@/components/form-elements';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { useDraggable } from '@dnd-kit/core';
import React from 'react';

const SidebarButtonElement = ({
  formElement,
}: {
  formElement: FormElement;
}) => {
  const { label, icon: Icon } = formElement.designerButtonElement;
  const draggable = useDraggable({
    id: `designer-btn-${formElement.type}`,
    data: {
      type: formElement.type,
      isDesignerBtnElement: true,
    },
  });
  return (
    <Button
      ref={draggable.setNodeRef}
      className={cn(
        'flex flex-col gaap-2 h-[120px] w-[120px] cursor-grab',
        draggable.isDragging && 'ring-2 ring-primary'
      )}
      variant="outline"
      {...draggable.listeners}
      {...draggable.attributes}
    >
      <Icon className="h-8 w-8 text-primary cursor-grab" />
      <p className="text-xs mt-2">{label} </p>
    </Button>
  );
};

export const SidebarButtonElementDragOverlay = ({
  formElement,
}: {
  formElement: FormElement;
}) => {
  const { label, icon: Icon } = formElement.designerButtonElement;

  return (
    <Button
      className="flex flex-col gaap-2 h-[120px] w-[120px] cursor-grab opacity-80"
      variant="outline"
    >
      <Icon className="h-8 w-8 text-primary cursor-grab" />
      <p className="text-xs mt-2">{label} </p>
    </Button>
  );
};

export default SidebarButtonElement;
