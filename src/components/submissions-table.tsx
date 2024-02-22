import { format, formatDistance } from 'date-fns';
import { notFound } from 'next/navigation';
import { ReactNode } from 'react';
import { ImCheckboxChecked, ImCheckboxUnchecked } from 'react-icons/im';

import { getFormWithSubmissions } from '@/actions/form';
import { ElementsType, FormElementInstance } from '@/components/form-elements';
import { Badge } from '@/components/ui/badge';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';

type Row = {
  [key: string]: string;
} & { submittedAt: Date };

const SubmissionsTable = async ({ id }: { id: number }) => {
  const form = await getFormWithSubmissions(id);
  if (!form) {
    return notFound();
  }
  const formElements = JSON.parse(form.content) as FormElementInstance[];

  const columns: {
    id: string;
    label: string;
    required: boolean;
    type: ElementsType;
  }[] = [];

  formElements.forEach((element) => {
    switch (element.type) {
      case 'TextAreaField':
      case 'CheckboxField':
      case 'NumberField':
      case 'SelectField':
      case 'TextField':
      case 'DateField':
        columns.push({
          id: element.id,
          label: element.extraAttributes?.label,
          required: element.extraAttributes?.required,
          type: element.type,
        });
        break;
      default:
        break;
    }
  });

  const rows: Row[] = [];
  form.formSubmissions.forEach((submission) => {
    const content = JSON.parse(submission.content) as { [key: string]: string };
    const row: Row = {
      ...content,
      submittedAt: submission.createdAt as any,
    };
    rows.push(row);
  });

  return (
    <>
      <h1 className="text-2xl font-bold my-4">Submissions</h1>
      <div className="rounded-lg border">
        <Table>
          <TableHeader>
            <TableRow>
              {columns.map((column) => (
                <TableHead key={column.id} className="uppercase">
                  {column.label}
                </TableHead>
              ))}
              <TableHead className="text-muted-foreground text-right uppercase">
                Submitted at
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {rows.map((row, index) => (
              <TableRow key={index}>
                {columns.map((column) => (
                  <RowCell
                    key={column.id}
                    type={column.type}
                    value={row[column.id]}
                  />
                ))}
                <TableCell className="text-muted-foreground text-right">
                  {formatDistance(row.submittedAt, new Date(), {
                    addSuffix: true,
                  })}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </>
  );
};

const RowCell = ({ type, value }: { type: ElementsType; value: string }) => {
  let node: ReactNode = value;

  switch (type) {
    case 'CheckboxField':
      const checked = value === 'true';
      node = (
        <div className="text-primary">
          {checked ? <ImCheckboxChecked /> : <ImCheckboxUnchecked />}
        </div>
      );
      break;
    case 'DateField':
      if (!value) break;
      const date = new Date(value);
      node = <Badge>{format(date, 'dd/MM/yyyy')}</Badge>;
      break;
    default:
      break;
  }
  return <TableCell>{node}</TableCell>;
};

export default SubmissionsTable;
