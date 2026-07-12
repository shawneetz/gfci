import { ReactNode } from "react";
import { cn } from "@/lib/utils";

export interface AdminTableColumn<T> {
  header: string;
  cell: (row: T) => ReactNode;
  className?: string;
}

interface AdminTableProps<T> {
  columns: AdminTableColumn<T>[];
  rows: T[];
  getRowKey: (row: T) => string;
  emptyMessage?: string;
}

export function AdminTable<T>({
  columns,
  rows,
  getRowKey,
  emptyMessage = "Nothing here yet.",
}: AdminTableProps<T>) {
  if (rows.length === 0) {
    return (
      <div className="border-2 border-frame bg-surface p-10 text-center text-body-sm text-ink-muted">
        {emptyMessage}
      </div>
    );
  }

  return (
    <div className="overflow-x-auto border-2 border-frame bg-surface">
      <table className="w-full min-w-[640px] border-collapse text-left text-body-sm">
        <thead>
          <tr className="border-b-2 border-frame bg-surface-alt">
            {columns.map((column) => (
              <th
                key={column.header}
                className={cn("px-4 py-3 text-label text-ink-muted", column.className)}
              >
                {column.header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row) => (
            <tr key={getRowKey(row)} className="border-b border-border last:border-b-0">
              {columns.map((column) => (
                <td key={column.header} className={cn("px-4 py-3 text-ink", column.className)}>
                  {column.cell(row)}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}