'use client';

import { RiSeparator } from 'react-icons/ri';

import {
  ElementsType,
  FormElement,
  FormElementInstance,
} from '@/components/form-elements';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';

const type: ElementsType = 'SeparatorField';

const extraAttributes = {};

export const SeparatorFieldFormElement: FormElement = {
  type,
  construct: (id: string) => ({
    id,
    type,
    extraAttributes,
  }),
  validate() {
    return true;
  },
  designerButtonElement: {
    icon: RiSeparator,
    label: 'Separator',
  },
  designerComponent: DesignerComponent,
  formComponent: FormComponent,
  propertiesComponent: PropertiesComponent,
};

function PropertiesComponent({}: { elementInstance: FormElementInstance }) {
  return <p>No properties for this element.</p>;
}

function DesignerComponent({}: { elementInstance: FormElementInstance }) {
  return (
    <div className="flex flex-col gap-2 w-full">
      <Label className="text-muted-foreground">Separator field</Label>
      <Separator />
    </div>
  );
}

function FormComponent({}: { elementInstance: FormElementInstance }) {
  return <Separator />;
}
