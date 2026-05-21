import { Input } from "@/components/ui/Input";
import type { LucideIcon } from "lucide-react";

type AuthFieldProps = {
  id: string;
  name?: string;
  label: string;
  type?: React.HTMLInputTypeAttribute;
  placeholder?: string;
  icon: LucideIcon;
  autoComplete?: string;
  required?: boolean;
  inputClassName?: string;
  defaultValue?: string;
};

export function AuthField({
  id,
  name,
  label,
  type = "text",
  placeholder,
  icon: Icon,
  autoComplete,
  required = true,
  inputClassName,
  defaultValue,
}: AuthFieldProps) {
  return (
    <div>
      <label
        htmlFor={id}
        className="mb-2 block text-base font-medium text-emerald-900"
      >
        {label}
      </label>
      <div className="relative">
        <Icon
          className="pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-emerald-500"
          strokeWidth={2}
          aria-hidden
        />
        <Input
          id={id}
          name={name ?? id}
          type={type}
          placeholder={placeholder}
          className={`rounded-xl border-emerald-200 py-3.5 pl-12 text-base ${inputClassName ?? ""}`}
          autoComplete={autoComplete}
          required={required}
          defaultValue={defaultValue}
        />
      </div>
    </div>
  );
}
