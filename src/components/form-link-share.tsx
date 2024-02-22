'use client';

import { useEffect, useState } from 'react';
import { FaCopy } from 'react-icons/fa';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { toast } from '@/components/ui/use-toast';

const FormLinkShare = ({ shareUrl }: { shareUrl: string }) => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  const shareLink = `${window.location.origin}/submit/${shareUrl}`;

  return (
    <div className="flex flex-grow gap-4 items-center">
      <Input value={shareLink} readOnly />
      <Button
        variant="outline"
        size="icon"
        className="max-w-[250px]"
        onClick={() => {
          navigator.clipboard.writeText(shareLink);
          toast({
            title: 'Link copied',
            description: 'The form link has been copied to your clipboard',
          });
        }}
      >
        <FaCopy />
      </Button>
    </div>
  );
};

export default FormLinkShare;
