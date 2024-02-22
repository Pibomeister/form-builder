'use client';

import { submitForm } from '@/actions/form';
import { FormElementInstance, FormElements } from '@/components/form-elements';
import { Button } from '@/components/ui/button';
import { toast } from '@/components/ui/use-toast';
import React, { useRef, useState, useTransition } from 'react';
import { FaSpinner } from 'react-icons/fa';
import { HiCursorClick } from 'react-icons/hi';

const FormSubmit = ({
  formUrl,
  content,
}: {
  formUrl: string;
  content: FormElementInstance[];
}) => {
  const formValues = useRef<{ [key: string]: string }>({});
  const formErrors = useRef<{ [key: string]: boolean }>({});
  const [renderKey, setRenderKey] = useState(0);
  const [submitted, setSubmitted] = useState(false);
  const [pending, startTransition] = useTransition();

  const validateForm = () => {
    for (const field of content) {
      const actualValue = formValues.current[field.id];
      const valid = FormElements[field.type].validate(field, actualValue);

      if (!valid) {
        formErrors.current[field.id] = true;
      }
    }
    return Object.keys(formErrors.current).length === 0;
  };

  const submitValue = (key: string, value: string) => {
    formValues.current[key] = value;
  };

  const onSubmitForm = async () => {
    formErrors.current = {};
    const valid = validateForm();
    if (!valid) {
      setRenderKey(() => new Date().getTime());
      toast({
        title: 'Form is not valid',
        description: 'Please make sure all fields are filled correctly.',
        variant: 'destructive',
      });
      return;
    }
    try {
      const jsonContent = JSON.stringify(formValues.current);
      await submitForm(formUrl, jsonContent);
      setSubmitted(true);
    } catch (error) {
      toast({
        title: 'Something went wrong',
        description: 'Please try again later.',
        variant: 'destructive',
      });
    }
  };

  if (submitted) {
    return (
      <div
        className="flex justify-center
       w-full h-full items-center p-8"
      >
        <div
          key={renderKey}
          className="max-w-[620px] flex flex-col gap-4 flex-grow bg-background w-full p-8 overflow-y-auto border shadow-xl dark:shadow-purple-700 rounded-lg"
        >
          <h1 className="text-2xl font-bold">Form submitted</h1>
          <p className="text-muted-foreground">
            Thankyou for submitting the form you can close this page now.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex justify-center w-full h-full items-center p-8">
      <div
        key={renderKey}
        className="max-w-[620px] flex flex-col gap-4 flex-grow bg-background w-full p-8 overflow-y-auto border shadow-xl dark:shadow-purple-700 rounded-lg"
      >
        {content.map((element) => {
          const FormComponent = FormElements[element.type].formComponent;
          return (
            <FormComponent
              key={element.id}
              elementInstance={element}
              submitValue={submitValue}
              isInvalid={formErrors.current[element.id]}
              defaultValue={formValues.current[element.id]}
            />
          );
        })}
        <Button
          className="mt-8"
          onClick={() => {
            startTransition(() => {
              onSubmitForm();
            });
          }}
          disabled={pending}
        >
          {!pending && (
            <>
              <HiCursorClick className="mr-2" />
              Submit
            </>
          )}
          {pending && <FaSpinner className="animate-spin" />}
        </Button>
      </div>
    </div>
  );
};

export default FormSubmit;
