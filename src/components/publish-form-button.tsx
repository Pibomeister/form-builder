'use client';

import { useTransition } from 'react';
import { MdOutlinePublish } from 'react-icons/md';

import { publishForm } from '@/actions/form';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';
import { Button } from '@/components/ui/button';
import { toast } from '@/components/ui/use-toast';
import { useRouter } from 'next/navigation';
import { ImSpinner2 } from 'react-icons/im';

const PublishFormButton = ({ id }: { id: number }) => {
  const [loading, startTransition] = useTransition();
  const router = useRouter();
  const onPublishForm = async () => {
    try {
      await publishForm(id);
      toast({
        title: 'Sucess',
        description: 'Your form has been published.',
      });
      router.refresh();
    } catch (error) {
      toast({
        title: 'Error',
        description: 'There was an error publishing your form.',
        variant: 'destructive',
      });
    }
  };
  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button
          variant="outline"
          className="gap-2 text-white bg-gradient-to-r from-indigo-400 to-cyan-400 hover:from-indigo-500 hover:to-cyan-500 hover:text-white"
        >
          <MdOutlinePublish className="h-4 w-4" />
          Publish
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. After publishing you will not be able
            to edit this form. <br /> <br />
            <span className="font-medium">
              By publishing this form you will make it available to the public
              and you will be able to collect submissions.
            </span>
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction
            className="text-white bg-gradient-to-r from-indigo-400 to-cyan-400 hover:from-indigo-500 hover:to-cyan-500 hover:text-white"
            disabled={loading}
            onClick={(e) => {
              e.preventDefault();
              startTransition(onPublishForm);
            }}
          >
            Publish{' '}
            {loading && (
              <ImSpinner2 className="animate-spin ease-in-out h-4 w-4" />
            )}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default PublishFormButton;
