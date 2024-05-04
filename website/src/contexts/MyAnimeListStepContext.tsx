import { createFormContext } from '@mantine/form';

interface IMyAnimeListStepContext {
  step: number;
}

export const [MyAnimeStepperProvider, useStepperFormContext, useStepperForm] =
  createFormContext<IMyAnimeListStepContext>();
