import { notFound } from 'next/navigation';

import { getFormById } from '@/actions/form';
import VisitButton from '@/components/visit-button';
import FormLinkShare from '@/components/form-link-share';
import { StatsCard } from '@/app/(dashboard)/page';
import loading from '@/app/(dashboard)/builder/[id]/loading';
import { FaWpforms } from 'react-icons/fa';
import { HiCursorClick } from 'react-icons/hi';
import { LuView } from 'react-icons/lu';
import { TbArrowBounce } from 'react-icons/tb';
import SubmissionsTable from '@/components/submissions-table';

async function FormDetailPage({ params }: { params: { id: string } }) {
  const { id } = params;
  const form = await getFormById(Number(id));
  if (!form) {
    notFound();
  }
  const { visits, submissions } = form;

  const submissionRate = visits > 0 ? (submissions / visits) * 100 : 0;
  const bounceRate = visits === 0 ? 0 : 100 - submissionRate;
  return (
    <>
      <div className="py-10 border-b border-muted">
        <div className="flex justify-between container">
          <h1 className="text-4xl font-bold truncate">{form.name}</h1>
          <VisitButton shareUrl={form.shareUrl} />
        </div>
        <div className="py-4">
          <div className="container flex gap-2 items-center justify-between">
            <FormLinkShare shareUrl={form.shareUrl} />
          </div>
        </div>
      </div>
      <div className="w-full pt-8 gap-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 container">
        <StatsCard
          title="Total visits"
          icon={<LuView className="text-cyan-600 !mt-0" />}
          helperText="All time form visits"
          value={visits.toLocaleString() || ''}
          loading={false}
          className="border border-cyan-600 dark:border-none shadow-sm dark:shadow-[0px_4px_10px_0px_rgba(0,255,255,0.4)]"
        />
        <StatsCard
          title="Total submissions"
          icon={<FaWpforms className="text-yellow-600 !mt-0" />}
          helperText="All time form submissions"
          value={submissions.toLocaleString() || ''}
          loading={false}
          className="border border-yellow-600 dark:border-none shadow-sm  dark:shadow-[0px_4px_10px_0px_rgba(255,242,5,0.4)]"
        />
        <StatsCard
          title="Submission rate"
          icon={<HiCursorClick className="text-green-600 !mt-0" />}
          helperText="Visits that resulted in a submission"
          value={submissionRate.toLocaleString() + '%' || ''}
          loading={false}
          className="border border-green-600 dark:border-none shadow-sm  dark:shadow-[0px_4px_10px_0px_rgba(124,244,1,0.4)]"
        />
        <StatsCard
          title="Bounce rate"
          icon={<TbArrowBounce className="text-pink-600 !mt-0" />}
          helperText="Visits that leave without interacting"
          value={bounceRate.toLocaleString() + '%' || ''}
          loading={false}
          className="border border-pink-600 dark:border-none shadow-sm  dark:shadow-[0px_4px_10px_0px_rgba(255,17,120,0.4)]"
        />
      </div>
      <div className="container pt-10">
        <SubmissionsTable id={form.id} />
      </div>
    </>
  );
}

export default FormDetailPage;
