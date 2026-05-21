import { cn } from "@/lib/utils";
import type { LucideIcon } from "lucide-react";

type IconBoxProps = {
  icon: LucideIcon;
  size?: "sm" | "md" | "lg";
  className?: string;
};

const sizeMap = {
  sm: { box: "h-10 w-10", icon: "h-5 w-5" },
  md: { box: "h-12 w-12", icon: "h-6 w-6" },
  lg: { box: "h-14 w-14", icon: "h-7 w-7" },
};

export function IconBox({ icon: Icon, size = "md", className }: IconBoxProps) {
  const s = sizeMap[size];

  return (
    <span
      className={cn(
        "inline-flex shrink-0 items-center justify-center rounded-xl bg-emerald-100 text-emerald-700",
        s.box,
        className,
      )}
    >
      <Icon
        className={s.icon}
        strokeWidth={2}
        stroke="currentColor"
        fill="none"
        aria-hidden
      />
    </span>
  );
}
