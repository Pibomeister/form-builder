import { getFormContentByUrl } from '@/actions/form';
import { FormElementInstance } from '@/components/form-elements';
import FormSubmit from '@/components/form-submit';
import { notFound } from 'next/navigation';
import React from 'react';

async function FormSubmitPage({ params }: { params: { formUrl: string } }) {
  const { formUrl } = params;
  const form = await getFormContentByUrl(formUrl);
  if (!form) {
    return notFound();
  }
  const formContent = JSON.parse(form.content) as FormElementInstance[];

  return <FormSubmit formUrl={formUrl} content={formContent} />;
}

export default FormSubmitPage;
