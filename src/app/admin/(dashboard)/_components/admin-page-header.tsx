interface AdminPageHeaderProps {
  title: string;
  description?: string;
}

export function AdminPageHeader({ title, description }: AdminPageHeaderProps) {
  return (
    <div className="mb-8">
      <h1 className="text-section-title text-ink">{title}</h1>
      {description && (
        <p className="mt-2 max-w-2xl text-body-sm text-ink-secondary">{description}</p>
      )}
    </div>
  );
}