import Contest from "../features/models/contest.model";

export const getStep = (steps: Contest["steps"], participants: number) => {
  let actualStepNumber = 0;

  const sortedSteps = [...steps].sort((a, b) => a.threshold - b.threshold);

  for (const step of sortedSteps) {
    if (participants < step.threshold) break;
    actualStepNumber++;
  }

  if (actualStepNumber >= sortedSteps.length) {
    actualStepNumber = sortedSteps.length - 1;
  }

  return { stepNumber: actualStepNumber + 1, step: sortedSteps[actualStepNumber] };
};
