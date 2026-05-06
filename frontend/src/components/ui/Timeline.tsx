interface TimelineStep {
  label: string;
}

interface TimelineProps {
  steps: TimelineStep[];
  currentStep: number; // 1-based
}

export function Timeline({ steps, currentStep }: TimelineProps) {
  return (
    <div className="flex items-center w-full">
      {steps.map((step, index) => {
        const stepNumber = index + 1;
        const isCompleted = stepNumber < currentStep;
        const isActive = stepNumber === currentStep;

        return (
          <div
            key={index}
            className={`flex flex-col items-center ${index < steps.length - 1 ? 'flex-1' : ''}`}
          >
            {/* Node + connector row */}
            <div className="flex items-center w-full">
              {/* Left connector line */}
              {index > 0 && (
                <div
                  className={`flex-1 h-px ${
                    isCompleted || isActive ? 'bg-[#73ffe3]' : 'bg-[#484847]'
                  }`}
                />
              )}

              {/* Circle node */}
              <div
                className={`w-10 h-10 rounded-full flex items-center justify-center shrink-0 transition-all ${
                  isCompleted
                    ? 'bg-[#73ffe3] border-2 border-[#73ffe3]'
                    : isActive
                    ? 'bg-transparent border-2 border-[#73ffe3]'
                    : 'bg-transparent border-2 border-[#484847]'
                }`}
              >
                {isCompleted ? (
                  <span
                    className="material-symbols-outlined text-[#0e0e0e] text-lg"
                    style={{ fontVariationSettings: "'FILL' 1, 'wght' 700" }}
                  >
                    check
                  </span>
                ) : (
                  <span
                    className={`text-sm font-black ${
                      isActive ? 'text-[#73ffe3]' : 'text-[#484847]'
                    }`}
                  >
                    {stepNumber}
                  </span>
                )}
              </div>

              {/* Right connector line */}
              {index < steps.length - 1 && (
                <div
                  className={`flex-1 h-px ${
                    stepNumber < currentStep ? 'bg-[#73ffe3]' : 'bg-[#484847]'
                  }`}
                />
              )}
            </div>

            {/* Label */}
            <span
              className={`mt-3 text-[10px] font-black uppercase tracking-[0.15em] text-center ${
                isActive ? 'text-[#73ffe3]' : isCompleted ? 'text-[#73ffe3]/70' : 'text-[#484847]'
              }`}
            >
              {step.label}
            </span>
          </div>
        );
      })}
    </div>
  );
}
