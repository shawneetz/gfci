export function HoneypotField({ value, onChange }: { value?: string; onChange?: (value: string) => void }) {
  return (
    <div aria-hidden="true" className="absolute -left-[10000px] h-px w-px overflow-hidden">
      <label htmlFor="website">Website</label>
      <input id="website" name="website" value={value} onChange={(event) => onChange?.(event.target.value)} tabIndex={-1} autoComplete="off" />
    </div>
  );
}
