'use client';

import { MdTextFields } from 'react-icons/md';
import { z } from 'zod';
import { useEffect, useState } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';

import {
  ElementsType,
  FormElement,
  FormElementInstance,
  SubmitFunction,
} from '@/components/form-elements';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { formSchemaType } from '@/schemas/form';
import useDesigner from '@/components/hooks/use-designer';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Switch } from '@/components/ui/switch';
import { cn } from '@/lib/utils';
import { BsTextareaResize } from 'react-icons/bs';
import { Textarea } from '@/components/ui/textarea';
import { Slider } from '@/components/ui/slider';

const type: ElementsType = 'TextAreaField';

const extraAttributes = {
  label: 'Text area',
  helperText: 'Helper text',
  required: false,
  placeholder: 'Placeholder',
  rows: 3,
};

const propertiesSchema = z.object({
  label: z.string().min(2).max(50),
  helperText: z.string().max(200),
  required: z.boolean().default(false),
  placeholder: z.string().max(50),
  rows: z.number().min(1).max(10),
});

type propertiesSchemaType = z.infer<typeof propertiesSchema>;

export const TextAreaFormElement: FormElement = {
  type,
  construct: (id: string) => ({
    id,
    type,
    extraAttributes,
  }),
  validate(instance, currentValue) {
    const element = instance as CustomInstance;
    if (element.extraAttributes.required) {
      return currentValue?.length > 0;
    }
    return true;
  },
  designerButtonElement: {
    icon: BsTextareaResize,
    label: 'Text Area',
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
      placeholder: instance.extraAttributes.placeholder,
      rows: instance.extraAttributes.rows,
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
        rows: +values.rows,
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
          name="placeholder"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Placeholder</FormLabel>
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
              <FormDescription>The placeholder of the field.</FormDescription>
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
          name="rows"
          render={({ field }) => (
            <FormItem className="!mb-8">
              <FormLabel>Rows: {form.watch('rows')}</FormLabel>
              <FormControl>
                <Slider
                  defaultValue={[field.value]}
                  min={1}
                  max={10}
                  step={1}
                  onValueChange={(value) => field.onChange(value[0])}
                />
              </FormControl>
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
                  The helper text of the field. <br />
                  It will be displayed below the field.
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
  const { label, required, placeholder, helperText, rows } =
    instance.extraAttributes;
  return (
    <div className="flex flex-col gap-2 w-full">
      <Label>
        {label}: (rows: {rows})
        {required && <span className="text-destructive">*</span>}
      </Label>
      <Textarea
        className="!min-h-[60px]"
        rows={1}
        readOnly
        disabled
        placeholder={placeholder}
      />
      {helperText && (
        <p className="text-muted-foreground text-sm">{helperText}</p>
      )}
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
  const { label, required, placeholder, helperText, rows } =
    instance.extraAttributes;
  const [value, setValue] = useState(defaultValue || '');
  const [error, setError] = useState(false);

  useEffect(() => {
    setError(isInvalid === true);
  }, [isInvalid]);
  return (
    <div className="flex flex-col gap-2 w-full">
      <Label className={cn(error && 'text-red-500')}>
        {label}
        {required && <span className="text-destructive">*</span>}
      </Label>
      <Textarea
        placeholder={placeholder}
        className={cn(error && 'border-red-500')}
        onChange={(e) => setValue(e.target.value)}
        rows={rows}
        onBlur={(e) => {
          if (!submitValue) return;
          const valid = TextAreaFormElement.validate(instance, e.target.value);
          setError(!valid);
          if (!valid) return;
          submitValue(instance.id, e.target.value);
        }}
        value={value}
      />
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
  );
}
