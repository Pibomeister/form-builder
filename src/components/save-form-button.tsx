'use client';

import { useTransition } from 'react';
import { FaSpinner } from 'react-icons/fa';
import { HiSaveAs } from 'react-icons/hi';

import { updateFormContent } from '@/actions/form';
import useDesigner from '@/components/hooks/use-designer';
import { Button } from '@/components/ui/button';
import { toast } from '@/components/ui/use-toast';

const SaveFormButton = ({ id }: { id: number }) => {
  const { elements } = useDesigner();
  const [loading, startTransition] = useTransition();

  const onUpdateFormContent = async () => {
    try {
      const stringifiedElements = JSON.stringify(elements);
      await updateFormContent(id, stringifiedElements);
      toast({
        title: 'Sucess',
        description: 'Your form has been saved.',
      });
    } catch (error) {
      toast({
        title: 'Error',
        description: 'There was an error saving your form.',
        variant: 'destructive',
      });
    }
  };
  return (
    <Button
      className="gap-2"
      variant="outline"
      disabled={loading}
      onClick={() => {
        startTransition(() => {
          onUpdateFormContent();
        });
      }}
    >
      <HiSaveAs className="h-4 w-4" />
      Save
      {loading && <FaSpinner className="animate-spin ease-in-out h-4 w-4" />}
    </Button>
  );
};

export default SaveFormButton;
