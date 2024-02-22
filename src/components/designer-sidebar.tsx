'use client';

import FormElementsSideBar from '@/components/form-elements-sidebar';
import useDesigner from '@/components/hooks/use-designer';
import PropertiesFormSidebar from '@/components/properties-form-sidebar';

const DesignerSidebar = () => {
  const { selectedElement } = useDesigner();
  return (
    <aside
      className="w-[400px] max-w-[400px] flex flex-col flex-grow gap-2 border-muted-foreground/20 border-l-2
     p-4 bg-background overflow-y-auto h-full"
    >
      {!selectedElement && <FormElementsSideBar />}
      {selectedElement && <PropertiesFormSidebar />}
    </aside>
  );
};

export default DesignerSidebar;
