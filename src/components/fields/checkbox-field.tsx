'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { IoMdCheckbox } from 'react-icons/io';
import { z } from 'zod';

import {
  ElementsType,
  FormElement,
  FormElementInstance,
  SubmitFunction,
} from '@/components/form-elements';
import useDesigner from '@/components/hooks/use-designer';
import { Checkbox } from '@/components/ui/checkbox';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { cn } from '@/lib/utils';

const type: ElementsType = 'CheckboxField';

const extraAttributes = {
  label: 'Checkbox field',
  helperText: 'Helper text',
  required: false,
};

const propertiesSchema = z.object({
  label: z.string().min(2).max(50),
  helperText: z.string().max(200),
  required: z.boolean().default(false),
});

type propertiesSchemaType = z.infer<typeof propertiesSchema>;

export const CheckboxFormElement: FormElement = {
  type,
  construct: (id: string) => ({
    id,
    type,
    extraAttributes,
  }),
  validate(instance, currentValue) {
    const element = instance as CustomInstance;
    if (element.extraAttributes.required) {
      return currentValue === 'true';
    }
    return true;
  },
  designerButtonElement: {
    icon: IoMdCheckbox,
    label: 'Checkbox Field',
  },
  designerComponent: DesignerComponent,
  formComponent: FormComponent,
  propertiesComponent: PropertiesComponent,
};

type CustomInstance = FormElementInstance & {
  extraAttributes: typeof extraAttributes;
};

function PropertiesComponent({
  elementInstance,
}: {
  elementInstance: FormElementInstance;
}) {
  const { updateElement } = useDesigner();
  const instance = elementInstance as CustomInstance;
  const form = useForm<propertiesSchemaType>({
    resolver: zodResolver(propertiesSchema),
    mode: 'onBlur',
    defaultValues: {
      label: instance.extraAttributes.label,
      helperText: instance.extraAttributes.helperText,
      required: instance.extraAttributes.required,
    },
  });
  useEffect(() => {
    form.reset(instance.extraAttributes);
  }, [instance, form]);

  const applyChanges = (values: propertiesSchemaType) => {
    updateElement(instance.id, {
      ...instance,
      extraAttributes: {
        ...values,
      },
    });
  };
  return (
    <Form {...form}>
      <form
        className="space-y-3"
        onBlur={form.handleSubmit(applyChanges)}
        onSubmit={(e) => {
          e.preventDefault();
        }}
      >
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
                    if (e.key === 'Enter') {
                      e.currentTarget.blur();
                    }
                  }}
                />
              </FormControl>
              <FormDescription>
                The label of the field
                <br />
                It will be displayed above the field
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
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
                    if (e.key === 'Enter') {
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
        <FormField
          control={form.control}
          name="required"
          render={({ field }) => (
            <FormItem className="flex items-center justify-between rounded-lg border p-3 shadow-sm">
              <div className="space-y-0.5">
                <FormLabel>Required</FormLabel>
                <FormDescription>
                  Whether the field is required or not.
                </FormDescription>
              </div>
              <FormControl>
                <Switch
                  checked={field.value}
                  onCheckedChange={field.onChange}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </form>
    </Form>
  );
}

function DesignerComponent({
  elementInstance,
}: {
  elementInstance: FormElementInstance;
}) {
  const instance = elementInstance as CustomInstance;
  const { label, required, helperText } = instance.extraAttributes;
  const id = `checkbox-${instance.id}`;
  return (
    <div className="flex items-top space-x-4">
      <Checkbox id={id} />
      <div className="grid gap-1.5 leading-none">
        <Label htmlFor={id}>
          {label}
          {required && <span className="text-destructive">*</span>}
        </Label>
        {helperText && (
          <p className="text-muted-foreground text-sm">{helperText}</p>
        )}
      </div>
    </div>
  );
}

function FormComponent({
  elementInstance,
  submitValue,
  isInvalid,
  defaultValue,
}: {
  elementInstance: FormElementInstance;
  submitValue?: SubmitFunction;
  isInvalid?: boolean;
  defaultValue?: string;
}) {
  const instance = elementInstance as CustomInstance;
  const { label, required, helperText } = instance.extraAttributes;
  const [value, setValue] = useState<boolean>(defaultValue === 'true' || false);
  const [error, setError] = useState(false);
  const id = `checkbox-${instance.id}`;

  useEffect(() => {
    setError(isInvalid === true);
  }, [isInvalid]);
  return (
    <div className="flex items-top space-x-4">
      <Checkbox
        id={id}
        checked={value}
        className={cn(error && 'border-red-500')}
        onCheckedChange={(e) => {
          const val = e === true ? true : false;
          setValue(val);
          if (!submitValue) return;
          const result = e ? 'true' : 'false';
          const valid = CheckboxFormElement.validate(instance, result);
          setError(!valid);
          submitValue(instance.id, result);
        }}
      />
      <div className="grid gap-1.5 leading-none">
        <Label htmlFor={id}>
          {label}
          {required && <span className="text-destructive">*</span>}
        </Label>
        {helperText && (
          <p
            className={cn(
              'text-muted-foreground text-sm',
              error && 'text-red-500'
            )}
          >
            {helperText}
          </p>
        )}
      </div>
    </div>
  );
}
