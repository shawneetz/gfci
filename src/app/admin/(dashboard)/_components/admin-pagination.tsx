import Link from "next/link";

interface AdminPaginationProps {
  page: number;
  pageCount: number;
  basePath: string;
}

export function AdminPagination({ page, pageCount, basePath }: AdminPaginationProps) {
  if (pageCount <= 1) return null;
  const href = (value: number) => `${basePath}?page=${value}`;
  return (
    <nav aria-label="Pagination" className="mt-6 flex items-center justify-between gap-4">
      {page > 1 ? <Link className="min-h-10 rounded-lg border border-frame px-4 py-2 text-sm font-semibold text-ink" href={href(page - 1)}>Previous</Link> : <span />}
      <span className="text-caption text-ink-muted">Page {page} of {pageCount}</span>
      {page < pageCount ? <Link className="min-h-10 rounded-lg border border-frame px-4 py-2 text-sm font-semibold text-ink" href={href(page + 1)}>Next</Link> : <span />}
    </nav>
  );
}
