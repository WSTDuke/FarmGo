import { cn } from "@/lib/utils";

type AuthStepIndicatorProps = {
  currentStep: number;
  totalSteps: number;
  labels: readonly { title: string; description: string }[];
};

export function AuthStepIndicator({
  currentStep,
  totalSteps,
  labels,
}: AuthStepIndicatorProps) {
  const currentLabel = labels[currentStep - 1];

  return (
    <div className="mb-8 shrink-0">
      <div className="flex h-10 items-center justify-between gap-2">
        {Array.from({ length: totalSteps }, (_, i) => {
          const step = i + 1;
          const active = step === currentStep;
          const done = step < currentStep;

          return (
            <div key={step} className="flex flex-1 items-center gap-2">
              <span
                className={cn(
                  "flex h-10 w-10 shrink-0 items-center justify-center rounded-full text-sm font-semibold transition-colors duration-300",
                  active &&
                    "bg-emerald-600 text-white ring-4 ring-emerald-600/20",
                  done && "bg-emerald-100 text-emerald-700",
                  !active && !done && "bg-emerald-50 text-emerald-400",
                )}
              >
                {done ? (
                  <span className="text-xs font-bold">OK</span>
                ) : (
                  step
                )}
              </span>
              {i < totalSteps - 1 && (
                <div className="h-1 flex-1 overflow-hidden rounded-full bg-emerald-100">
                  <div
                    className={cn(
                      "h-full rounded-full bg-emerald-400 transition-[width] duration-500 ease-out",
                      done ? "w-full" : "w-0",
                    )}
                  />
                </div>
              )}
            </div>
          );
        })}
      </div>

      <div className="mt-4 min-h-[3.75rem]">
        <p className="text-sm font-medium leading-5 text-emerald-600">
          Bước {currentStep}/{totalSteps}
        </p>
        <p className="mt-1 text-lg font-semibold leading-7 text-emerald-950 transition-opacity duration-300">
          {currentLabel?.title}
        </p>
      </div>
    </div>
  );
}
