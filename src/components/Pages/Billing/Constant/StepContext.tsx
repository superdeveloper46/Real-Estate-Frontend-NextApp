import { createContext } from 'react';

import BillingStep from './BillingStep';

type StepContextProps = {
  selectedStep: BillingStep;
  changeStep: (step: number) => void;
};

export const StepContext = createContext<StepContextProps>({
  selectedStep: BillingStep.Plan,
  changeStep: () => {},
});
