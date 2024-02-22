'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

import {
  ElementsType,
  FormElement,
  FormElementInstance,
} from '@/components/form-elements';
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
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { LuHeading1, LuHeading2 } from 'react-icons/lu';

const type: ElementsType = 'SubTitleField';

const extraAttributes = {
  subTitle: 'Subtitle field',
};

const propertiesSchema = z.object({
  subTitle: z.string().min(2).max(50),
});

type propertiesSchemaType = z.infer<typeof propertiesSchema>;

export const SubTitleFieldFormElement: FormElement = {
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
    icon: LuHeading2,
    label: 'Subtitle',
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
      subTitle: instance.extraAttributes.subTitle,
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
          name="subTitle"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Subtitle</FormLabel>
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
              <FormDescription>The subtitle</FormDescription>
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
  const { subTitle } = instance.extraAttributes;
  return (
    <div className="flex flex-col gap-2 w-full">
      <Label className="text-muted-foreground">Subtitle field</Label>
      <p className="text-lg">{subTitle}</p>
    </div>
  );
}

function FormComponent({
  elementInstance,
}: {
  elementInstance: FormElementInstance;
}) {
  const instance = elementInstance as CustomInstance;
  const { subTitle } = instance.extraAttributes;

  return <p className="text-lg">{subTitle}</p>;
}
