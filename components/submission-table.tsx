import { GetFormWithSubmissions } from "@/actions/form";
import { ElementsType, FormElementInstance } from "./form-elements";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "./ui/table";
import { formatDistance } from "date-fns";
import RowCell from "./row-cell";

type ColumnsType = {
  id: string;
  label: string;
  required: boolean;
  type: ElementsType;
};

type RowType = {
  [key: string]: string;
} & {
  submittedAt: Date;
};

const SubmissionTable = async ({ id }: { id: number }) => {
  const form = await GetFormWithSubmissions(id);
  if (!form) {
    throw new Error("form not found!");
  }

  const formElements = JSON.parse(form.content) as FormElementInstance[];

  const columns: ColumnsType[] = [];

  formElements.forEach((el) => {
    switch (el.type) {
      case "TextField":
      case "CheckboxField":
      case "NumberField":
      case "SelectField":
      case "DateField":
      case "TextAreaField":
        columns.push({
          id: el.id,
          label: el.extraAttributes?.label,
          required: el.extraAttributes?.required,
          type: el.type,
        });
        break;
      default:
        break;
    }
  });

  const rows: RowType[] = [];

  form.formsubmissions.forEach((submission) => {
    const content = JSON.parse(submission.content);
    rows.push({
      ...content,
      submittedAt: submission.createdAt,
    });
  });
  return (
    <>
      <h1 className="text-2xl font-bold my-4">Submissions</h1>
      <div className="rounded-md border">
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
export default SubmissionTable;
