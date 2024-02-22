import { Form } from '@prisma/client';
import { formatDistance } from 'date-fns';
import Link from 'next/link';
import { ReactNode, Suspense } from 'react';
import { BiRightArrowAlt } from 'react-icons/bi';
import { FaWpforms } from 'react-icons/fa';
import { HiCursorClick } from 'react-icons/hi';
import { LuView } from 'react-icons/lu';
import { TbArrowBounce } from 'react-icons/tb';
import { FaEdit } from 'react-icons/fa';

import { getFormStats, getForms } from '@/actions/form';
import CreateFormButton from '@/components/create-form-button';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Skeleton } from '@/components/ui/skeleton';

export default function Home() {
  return (
    <div className="container pt-4">
      <Suspense fallback={<StatsCards loading={true} />}>
        <CardStatsWrapper />
      </Suspense>
      <Separator className="my-6" />
      <h2 className="text-4xl font-bold col-span-2">Your Forms</h2>
      <Separator className="my-6" />
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <CreateFormButton />
        <Suspense
          fallback={[1, 2, 3, 4].map((el) => (
            <FormCardSkeleton key={el} />
          ))}
        >
          <FormCards />
        </Suspense>
      </div>
    </div>
  );
}

const CardStatsWrapper = async () => {
  const stats = await getFormStats();
  return <StatsCards loading={false} data={stats} />;
};

interface StatsCardsProps {
  loading: boolean;
  data?: Awaited<ReturnType<typeof getFormStats>>;
}

const StatsCards = ({ loading, data }: StatsCardsProps) => {
  return (
    <div className="w-full pt-8 gap-4 lg:gap-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4">
      <StatsCard
        title="Total visits"
        icon={<LuView className="text-cyan-600 !mt-0" />}
        helperText="All time form visits"
        value={data?.visits.toLocaleString() || ''}
        loading={loading}
        className="border border-cyan-600 dark:border-none shadow-sm dark:shadow-[0px_4px_10px_0px_rgba(0,255,255,0.4)]"
      />
      <StatsCard
        title="Total submissions"
        icon={<FaWpforms className="text-yellow-600 !mt-0" />}
        helperText="All time form submissions"
        value={data?.submissions.toLocaleString() || ''}
        loading={loading}
        className="border border-yellow-600 dark:border-none shadow-sm  dark:shadow-[0px_4px_10px_0px_rgba(255,242,5,0.4)]"
      />
      <StatsCard
        title="Submission rate"
        icon={<HiCursorClick className="text-green-600 !mt-0" />}
        helperText="Visits that resulted in a submission"
        value={data?.submissionRate.toLocaleString() + '%' || ''}
        loading={loading}
        className="border border-green-600 dark:border-none shadow-sm  dark:shadow-[0px_4px_10px_0px_rgba(124,244,1,0.4)]"
      />
      <StatsCard
        title="Bounce rate"
        icon={<TbArrowBounce className="text-pink-600 !mt-0" />}
        helperText="Visits that leave without interacting"
        value={data?.bounceRate.toLocaleString() + '%' || ''}
        loading={loading}
        className="border border-pink-600 dark:border-none shadow-sm  dark:shadow-[0px_4px_10px_0px_rgba(255,17,120,0.4)]"
      />
    </div>
  );
};

interface StatsCardProps {
  title: string;
  icon: ReactNode;
  helperText: string;
  value: string;
  loading: boolean;
  className?: string;
}

export const StatsCard = ({
  title,
  icon,
  helperText,
  value,
  loading,
  className,
}: StatsCardProps) => {
  return (
    <Card className={className}>
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-sm font-medium text-muted-foreground">
          {title}
        </CardTitle>
        {icon}
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">
          {loading ? (
            <Skeleton>
              <span className="opacity-0">0</span>
            </Skeleton>
          ) : (
            value
          )}
        </div>
        <p className="text-xs text-muted-foreground pt-2">{helperText}</p>
      </CardContent>
    </Card>
  );
};

const FormCardSkeleton = () => {
  return <Skeleton className="border-2 border-primary/30 h-[190px] w-full" />;
};

const FormCards = async () => {
  const forms = await getForms();
  return (
    <>
      {forms.map((form) => (
        <FormCard key={form.id} form={form} />
      ))}
    </>
  );
};

const FormCard = ({ form }: { form: Form }) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2 justify-between">
          <span className="truncate font-bold">{form.name}</span>
          {form.published && <Badge>Published</Badge>}
          {!form.published && <Badge variant="destructive">Draft</Badge>}
        </CardTitle>
        <CardDescription className="flex items-center justify-between text-muted-foreground text-sm">
          {formatDistance(form.createdAt, new Date(), {
            addSuffix: true,
          }) || ''}
          {!form.published && (
            <span className="flex items-center gap-2">
              <LuView className="text-muted-foreground" />
              <span className="text-muted-foreground">
                {form.visits.toLocaleString()}
              </span>
              <FaWpforms className="text-muted-foreground" />
              <span className="text-muted-foreground">
                {form.submissions.toLocaleString()}
              </span>
            </span>
          )}
        </CardDescription>
      </CardHeader>
      <CardContent>{form.description || 'No description'}</CardContent>
      <CardFooter>
        {form.published && (
          <Button asChild className="w-full text-md gap-4">
            <Link href={`/forms/${form.id}`}>
              View submissions <BiRightArrowAlt />
            </Link>
          </Button>
        )}
        {!form.published && (
          <Button asChild variant="secondary" className="w-full  text-md gap-4">
            <Link href={`/builder/${form.id}`}>
              Edit form <FaEdit />
            </Link>
          </Button>
        )}
      </CardFooter>
    </Card>
  );
};
