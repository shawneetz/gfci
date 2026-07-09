import { FieldLabel } from "@/components/ui/field-label";
import { TextField } from "@/components/ui/text-field";

interface OptionalContactFieldsProps {
  socialMedia: string;
  onSocialMediaChange: (value: string) => void;
  additionalContact: string;
  onAdditionalContactChange: (value: string) => void;
  additionalContactPlaceholder?: string;
}

// Shared "Optional" block used by both the Youth and Adults forms, so the
// two fields (and their styling) only need to be maintained in one place.
export function OptionalContactFields({
  socialMedia,
  onSocialMediaChange,
  additionalContact,
  onAdditionalContactChange,
  additionalContactPlaceholder = "Phone number, alternate email, etc.",
}: OptionalContactFieldsProps) {
  return (
    <div className="mt-6 border-t border-border pt-6">
      <p className="text-label text-ink-muted">Optional</p>

      <div className="mt-4 grid gap-5 sm:grid-cols-2">
        <div>
          <FieldLabel>Social Media Handle</FieldLabel>
          <TextField
            name="socialMedia"
            placeholder="@yourhandle"
            value={socialMedia}
            onChange={(e) => onSocialMediaChange(e.target.value)}
          />
        </div>
        <div>
          <FieldLabel>Additional Contact Info</FieldLabel>
          <TextField
            name="additionalContact"
            placeholder={additionalContactPlaceholder}
            value={additionalContact}
            onChange={(e) => onAdditionalContactChange(e.target.value)}
          />
        </div>
      </div>
    </div>
  );
}