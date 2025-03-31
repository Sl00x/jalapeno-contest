"use client";

import * as ProgressPrimitive from "@radix-ui/react-progress";
import * as React from "react";

import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { cn } from "@/lib/utils";

type Props = React.ComponentProps<typeof ProgressPrimitive.Root> & {
  value: number;
  showValue?: boolean;
  showMaxValue?: boolean;
  steps?: {
    value: number;
    prize: string;
  }[];
};

function Progress({
  className,
  value,
  showValue = false,
  showMaxValue = false,
  steps = [],
  max = 100,
  ...props
}: Props) {
  const percentValue = (value * 100) / max;

  return (
    <div className="w-full flex space-x-2">
      <div className="w-full">
        <ProgressPrimitive.Root
          data-slot="progress"
          className={cn(
            "bg-primary/20 relative h-2 w-full overflow-hidden rounded-full",
            className
          )}
          {...props}
        >
          <ProgressPrimitive.Indicator
            data-slot="progress-indicator"
            className="bg-primary h-full w-full flex-1 transition-all"
            style={{ transform: `translateX(-${100 - percentValue}%)` }}
          >
            {showValue && (
              <span className="text-xs absolute text-white right-1">
                {value}
              </span>
            )}
          </ProgressPrimitive.Indicator>
          {steps.map((step, index) => (
            <TooltipProvider key={index}>
              <Tooltip>
                <TooltipTrigger asChild>
                  <div
                    className="top-0 absolute w-[2px] h-full bg-red-600"
                    style={{
                      left: `${(step.value * 100) / max}%`,
                    }}
                  />
                </TooltipTrigger>
                <TooltipContent>
                  <span>{step.prize}</span>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          ))}
        </ProgressPrimitive.Root>
        <div className="w-full h-4 relative">
          {steps.map((step, index) => (
            <span
              className="absolute top-0 text-sm"
              key={index}
              style={{
                left: `${(step.value * 100) / max}%`,
                transform: "translateX(-50%)",
              }}
            >
              {step.value}
            </span>
          ))}
        </div>
      </div>
      {showMaxValue && <span className="text-xs">{max}</span>}
    </div>
  );
}

export { Progress };
