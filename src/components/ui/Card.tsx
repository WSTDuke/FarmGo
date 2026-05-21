import { cn } from "@/lib/utils";

type CardProps = {
  title: string;
  description?: string;
  children?: React.ReactNode;
  className?: string;
};

export function Card({ title, description, children, className }: CardProps) {
  return (
    <div
      className={cn(
        "rounded-lg border border-zinc-200 bg-white p-4 shadow-sm",
        className,
      )}
    >
      <h3 className="font-medium text-zinc-900">{title}</h3>
      {description && (
        <p className="mt-1 text-sm text-zinc-600">{description}</p>
      )}
      {children && <div className="mt-3">{children}</div>}
    </div>
  );
}
