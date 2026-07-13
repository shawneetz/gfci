import { ReactNode } from "react";

interface AdminPageHeaderProps {
  title: string;
  description?: string;
  action?: ReactNode;
}

export function AdminPageHeader({ title, description, action }: AdminPageHeaderProps) {
  return (
    <div className="mb-8 flex flex-wrap items-start justify-between gap-4">
      <div>
        <h1 className="text-section-title text-ink">{title}</h1>
        {description && (
          <p className="mt-2 max-w-2xl text-body-sm text-ink-secondary">{description}</p>
        )}
      </div>
      {action}
    </div>
  );
}