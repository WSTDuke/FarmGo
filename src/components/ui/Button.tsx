import { cn } from "@/lib/utils";

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: "primary" | "secondary";
};

export function Button({
  className,
  variant = "primary",
  children,
  ...props
}: ButtonProps) {
  return (
    <button
      className={cn(
        "inline-flex items-center justify-center rounded-md px-4 py-2 text-sm font-medium transition-colors",
        variant === "primary" &&
          "bg-emerald-600 text-white hover:bg-emerald-700",
        variant === "secondary" &&
          "border border-emerald-200 bg-white text-emerald-900 hover:bg-emerald-50",
        className,
      )}
      {...props}
    >
      {children}
    </button>
  );
}
