import React, { ReactNode } from 'react';

function FormDetailsLayout({ children }: { children: ReactNode }) {
  return (
    <div className="flex flex-col w-full flex-grow mx-auto">{children}</div>
  );
}

export default FormDetailsLayout;
