'use  client';

import { useContext } from 'react';

import { DesignerContext } from '@/components/context/designer-context';

const useDesigner = () => {
  const context = useContext(DesignerContext);
  if (context === null) {
    throw new Error(
      'useDesigner must be used within a DesignerContextProvider'
    );
  }

  return context;
};

export default useDesigner;
