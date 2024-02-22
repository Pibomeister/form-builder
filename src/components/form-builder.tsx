'use client';

import Designer from '@/components/designer';
import DragOverlayWrapper from '@/components/drag-overlay-wrapper';
import useDesigner from '@/components/hooks/use-designer';
import PreviewDialogButton from '@/components/preview-dialog-button';
import PublishFormButton from '@/components/publish-form-button';
import SaveFormButton from '@/components/save-form-button';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { toast } from '@/components/ui/use-toast';
import {
  DndContext,
  MouseSensor,
  TouchSensor,
  useSensor,
  useSensors,
} from '@dnd-kit/core';
import { Form } from '@prisma/client';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import { BsArrowLeft, BsArrowRight } from 'react-icons/bs';
import { FaCopy } from 'react-icons/fa';
import { ImSpinner2 } from 'react-icons/im';
import Confetti from 'react-confetti';

const FormBuilder = ({ form }: { form: Form }) => {
  const { setElements, setSelectedElement } = useDesigner();
  const [isReady, setIsReady] = useState(false);
  const mouseSensor = useSensor(MouseSensor, {
    activationConstraint: {
      distance: 10,
    },
  });

  const touchSensor = useSensor(TouchSensor, {
    activationConstraint: {
      delay: 300,
      tolerance: 5,
    },
  });
  const sensors = useSensors(mouseSensor, touchSensor);

  useEffect(() => {
    if (isReady) return;
    const elements = JSON.parse(form.content);
    setElements(elements);
    setSelectedElement(null);
    const readyTimeout = setTimeout(() => {
      setIsReady(true);
    }, 500);
    return () => clearTimeout(readyTimeout);
  }, [form, setElements, isReady, setSelectedElement]);

  if (!isReady) {
    return (
      <div className="flex flex-col items-center justify-center w-full h-full">
        <ImSpinner2 className="animate-spin ease-in-out h-12 w-12" />
      </div>
    );
  }

  const shareUrl = `${window.location.origin}/submit/${form.shareUrl}`;

  if (form.published) {
    return (
      <>
        <Confetti
          width={window.innerWidth}
          height={window.innerHeight}
          recycle={false}
          numberOfPieces={1000}
        />
        <div className="flex flex-col items-center justify-center w-full h-full">
          <div className="max-w-md">
            <h1 className="text-center text-4xl font-bold text-primary border-b pb-6 mb-10">
              Form published
            </h1>
            <h2 className="text-2xl">Share this form</h2>
            <h3 className="text-xl text-muted-foreground border-b pb-10">
              Anyone witth the link can view and submit the form
            </h3>
            <div className="my-4 flex flex-row gap-2 items-center w-full border-b pb-4">
              <Input className="flex-1" value={shareUrl} readOnly />
              <Button
                size="icon"
                variant="outline"
                onClick={() => {
                  navigator.clipboard.writeText(shareUrl);
                  toast({
                    title: 'Link copied',
                    description:
                      'The form link has been copied to your clipboard',
                  });
                }}
              >
                <FaCopy />
              </Button>
            </div>
            <div className="flex justify-between">
              <Button variant="link" asChild>
                <Link href="/" className="gap-2 dark:text-white">
                  <BsArrowLeft /> Go back home
                </Link>
              </Button>
              <Button variant="link" asChild>
                <Link
                  href={`/forms/${form.id}`}
                  className="gap-2 dark:text-white"
                >
                  Form Details
                  <BsArrowRight />
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </>
    );
  }

  return (
    <DndContext sensors={sensors}>
      <main className="flex flex-col w-full">
        <nav className="flex justify-between border-muted-foreground/20  border-b  p-4 gap-3 items-center">
          <h2 className="trucate font-medium">
            <span className="text-muted-foreground mr-2">Form:</span>
            {form.name}
          </h2>
          <div className="flex items-center gap-2">
            <PreviewDialogButton />
            {!form.published && (
              <>
                <SaveFormButton id={form.id} />
                <PublishFormButton id={form.id} />
              </>
            )}
          </div>
        </nav>
        <div className="flex w-full flex-grow items-center justify-center relative overflow-y-auto h-[200px] bg-accent bg-[url(/paper.svg)] dark:bg-[url(/paper-dark.svg)]">
          <Designer />
        </div>
      </main>
      <DragOverlayWrapper />
    </DndContext>
  );
};

export default FormBuilder;
