'use client';

import { useEffect, useState } from 'react';

import { Button } from '@/components/ui/button';

const VisitButton = ({ shareUrl }: { shareUrl: string }) => {
  const [mounted, setMounted] = useState(false);
  const shareLink = mounted
    ? `${window.location.origin}/submit/${shareUrl}`
    : '';

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;
  return (
    <Button
      className="w-[200px]"
      onClick={() => {
        window.open(shareLink, '_blank');
      }}
    >
      Visit
    </Button>
  );
};

export default VisitButton;
