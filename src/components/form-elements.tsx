import { CheckboxFormElement } from '@/components/fields/checkbox-field';
import { DateFieldFormElement } from '@/components/fields/date-field';
import { NumberFieldFormElement } from '@/components/fields/number-field';
import { ParagraphFieldFormElement } from '@/components/fields/paragraph-field';
import { SelectFieldFormElement } from '@/components/fields/select-field';
import { SeparatorFieldFormElement } from '@/components/fields/separator-field';
import { SpacerFieldFormElement } from '@/components/fields/spacer-field';
import { SubTitleFieldFormElement } from '@/components/fields/sub-title-field';
import { TextAreaFormElement } from '@/components/fields/text-area';
import { TextFieldFormElement } from '@/components/fields/text-field';
import { TitleFieldFormElement } from '@/components/fields/title-field';
import { ElementType } from 'react';

export type ElementsType =
  | 'TextField'
  | 'TitleField'
  | 'SubTitleField'
  | 'ParagraphField'
  | 'SeparatorField'
  | 'SpacerField'
  | 'NumberField'
  | 'TextAreaField'
  | 'DateField'
  | 'SelectField'
  | 'CheckboxField';

export type SubmitFunction = (key: string, value: string) => void;

export type FormElement = {
  type: ElementsType;

  construct: (id: string) => FormElementInstance;
  validate: (instance: FormElementInstance, currentValue: string) => boolean;

  designerButtonElement: {
    icon: ElementType;
    label: string;
  };

  designerComponent: React.FC<{
    elementInstance: FormElementInstance;
  }>;

  formComponent: React.FC<{
    elementInstance: FormElementInstance;
    submitValue?: SubmitFunction;
    isInvalid?: boolean;
    defaultValue?: string;
  }>;

  propertiesComponent: React.FC<{
    elementInstance: FormElementInstance;
  }>;
};

export type FormElementInstance = {
  id: string;
  type: ElementsType;
  extraAttributes?: Record<string, any>;
};

type FormElementsType = {
  [key in ElementsType]: FormElement;
};

export const FormElements: FormElementsType = {
  TextField: TextFieldFormElement,
  TitleField: TitleFieldFormElement,
  SubTitleField: SubTitleFieldFormElement,
  ParagraphField: ParagraphFieldFormElement,
  SeparatorField: SeparatorFieldFormElement,
  SpacerField: SpacerFieldFormElement,
  NumberField: NumberFieldFormElement,
  TextAreaField: TextAreaFormElement,
  DateField: DateFieldFormElement,
  SelectField: SelectFieldFormElement,
  CheckboxField: CheckboxFormElement,
};
