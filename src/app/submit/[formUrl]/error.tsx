'use client';

import { Button } from '@/components/ui/button';
import Link from 'next/link';
import React, { useEffect } from 'react';
import { HiOutlineExclamationTriangle } from 'react-icons/hi2';

function ErrorPage({ error }: { error: Error }) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="flex w-full h-full flex-col items-center justify-center gap-4">
      <HiOutlineExclamationTriangle className="text-destructive text-6xl" />
      <h2 className="font-semibold text-4xl mb-2">Something went wrong!</h2>
      <p className="font-light text-center mb-2">
        We are working on it. Sometimes these things happen. <br /> Please try
        again later.
      </p>
      <Button asChild variant="outline">
        <Link href="/">Go back to home</Link>
      </Button>
    </div>
  );
}

export default ErrorPage;
