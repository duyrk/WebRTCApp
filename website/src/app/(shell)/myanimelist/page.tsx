'use client';

import {
  Button,
  Container,
  Divider,
  Group,
  ScrollArea,
  Stack,
  Stepper,
  Text,
  Title,
  useMantineTheme,
} from '@mantine/core';
import { useCallback } from 'react';
import { STEPS_MY_ANIME_LIST } from '@app/(shell)/myanimelist/constant';
import { IconCheck } from '@tabler/icons-react';
import styles from './styles.module.css';
import { AdjustInformationStep, ChooseAnimeStep, VerifyStep } from 'components/myanimelist/steps';
import { MyAnimeStepperProvider, useStepperForm } from '@contexts/MyAnimeListStepContext';

export default function MyAnimeListPage() {
  const { colors, primaryColor, radius, spacing } = useMantineTheme();
  const formStepper = useStepperForm({
    initialValues: {
      step: 0,
    },
  });

  const nextStep = () =>
    formStepper.setFieldValue(
      'step',
      formStepper.values.step > STEPS_MY_ANIME_LIST.length - 1
        ? formStepper.values.step
        : ++formStepper.values.step
    );

  const prevStep = () =>
    formStepper.setFieldValue(
      'step',
      formStepper.values.step <= 0 ? formStepper.values.step : --formStepper.values.step
    );

  const RenderStepView = useCallback(() => {
    switch (formStepper.values.step) {
      case 0:
        return <ChooseAnimeStep />;
      case 1:
        return <AdjustInformationStep />;
      case 2:
        return <VerifyStep />;
      case 3:
        return <Text>Complete</Text>;
    }
  }, [formStepper.values.step]);

  return (
    <MyAnimeStepperProvider form={formStepper}>
      <Container fluid py={10} className={styles.pageContainer}>
        <Group>
          <Stack gap={0} style={{ flex: 1 }}>
            <Title order={2} size={'h1'}>
              MyAnimeList
            </Title>
            <Text c={colors.dark[2]}>Adding anime with MyAnimeList database ✨</Text>{' '}
          </Stack>

          {/*step button navigate*/}
          <Group>
            <Button variant={'outline'} onClick={prevStep} disabled={formStepper.values.step === 0}>
              Previous
            </Button>
            <Divider orientation={'vertical'} />
            <Button variant={'gradient'} onClick={nextStep}>
              {formStepper.values.step <= STEPS_MY_ANIME_LIST.length - 1 ? 'Next' : 'Complete'}
            </Button>
          </Group>
        </Group>

        {/*stepper*/}
        <Stepper
          radius={'sm'}
          completedIcon={<IconCheck />}
          active={formStepper.values.step}
          className={styles.stepperContainer}
        >
          {STEPS_MY_ANIME_LIST.map(({ stepLabel, stepDescription, Icon, isComplete }, index) =>
            isComplete ? (
              <Stepper.Completed>
                <Title>Complete Add anime flow</Title>
              </Stepper.Completed>
            ) : (
              <Stepper.Step
                label={stepLabel}
                key={`step-${index}`}
                description={stepDescription}
                icon={Icon ? <Icon /> : <IconCheck />}
              ></Stepper.Step>
            )
          )}
        </Stepper>

        <RenderStepView />
        {/*end stepper*/}
      </Container>
    </MyAnimeStepperProvider>
  );
}
