import Link from "next/link";
import { Pencil } from "lucide-react";
import { DeleteButton } from "./delete-button";
import type { MutationResult } from "@/server/mutations/types";

interface AdminRowActionsProps {
  editHref: string;
  deleteLabel: string;
  onDelete: () => Promise<MutationResult>;
}

export function AdminRowActions({ editHref, deleteLabel, onDelete }: AdminRowActionsProps) {
  return (
    <div className="flex items-center gap-3">
      <Link
        href={editHref}
        aria-label={`Edit ${deleteLabel}`}
        className="text-ink-muted transition-colors hover:text-ink"
      >
        <Pencil size={16} />
      </Link>
      <DeleteButton label={deleteLabel} onDelete={onDelete} />
    </div>
  );
}