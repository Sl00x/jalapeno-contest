import Contest from "../features/models/contest.model";

export const getStep = (steps: Contest["steps"], participants: number) => {
  let actualStepNumber = 1;
  let actualStep = steps[0];

  for (const step of steps) {
    if (participants < step.threshold) break;
    actualStep = step;
    actualStepNumber++;
  }

  return { stepNumber: actualStepNumber, step: actualStep };
};
