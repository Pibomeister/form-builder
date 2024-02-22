'use client';

import { MdPreview } from 'react-icons/md';

import { Button } from '@/components/ui/button';
import useDesigner from '@/components/hooks/use-designer';
import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog';
import { FormElements } from '@/components/form-elements';
import { useEffect, useState } from 'react';

const PreviewDialogButton = () => {
  const { elements } = useDesigner();
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="gap-2" variant="outline">
          <MdPreview className="h-4 w-4" />
          Preview
        </Button>
      </DialogTrigger>
      <DialogContent className="w-screen h-screen max-h-screen max-w-full flex flex-col flex-grow p-0 gap-0">
        <div className="px-4 py-2 border-b">
          <p className="text-xl font-bold">Form preview</p>
          <p className="text-sm text-muted-foreground">
            This is how your form will look to your users.
          </p>
        </div>
        <div className="bg-accent bg-[url(/paper.svg)] dark:bg-[url(/paper-dark.svg)] flex flex-col flex-grow items-center justify-center p-4 overflow-y-auto">
          <div className="max-w-[620px] flex flex-col gap-4 flex-grow bg-background h-full w-full rounded-2xl p-8 overflow-y-auto">
            {elements.length > 0 &&
              elements.map((element) => {
                const FormComponent = FormElements[element.type].formComponent;
                return (
                  <FormComponent key={element.id} elementInstance={element} />
                );
              })}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default PreviewDialogButton;
