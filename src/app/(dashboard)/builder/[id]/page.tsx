import { notFound } from 'next/navigation';

import { getFormById } from '@/actions/form';
import FormBuilder from '@/components/form-builder';

async function BuilderPage({ params }: { params: { id: string } }) {
  const { id } = params;
  const form = await getFormById(Number(id));
  if (!form) {
    notFound();
  }
  return <FormBuilder form={form} />;
}

export default BuilderPage;
