'use client';

import {
  Button,
  Container,
  Divider,
  Group,
  Stack,
  Stepper,
  Text,
  Title,
  useMantineTheme,
} from '@mantine/core';
import { useState } from 'react';
import { STEPS_MY_ANIME_LIST } from '@app/(shell)/myanimelist/constant';
import { IconCheck } from '@tabler/icons-react';

import styles from './styles.module.css';

export default function MyAnimeListPage() {
  const { colors, primaryColor, radius, spacing } = useMantineTheme();
  const [stepperActive, setStepperActive] = useState(0);
  const nextStep = () => setStepperActive((current) => (current < 3 ? current + 1 : current));
  const prevStep = () => setStepperActive((current) => (current > 0 ? current - 1 : current));

  return (
    <Container fluid py={10}>
      <Group>
        <Stack gap={0} style={{ flex: 1 }}>
          <Title order={2} size={'h1'}>
            MyAnimeList
          </Title>
          <Text c={colors.dark[2]}>Adding anime with MyAnimeList database ✨</Text>{' '}
        </Stack>

        {/*step button navigate*/}
        <Group>
          <Button variant={'outline'} onClick={prevStep} disabled={stepperActive === 0}>
            Previous
          </Button>
          <Divider orientation={'vertical'} />
          <Button variant={'gradient'} onClick={nextStep}>
            {stepperActive <= STEPS_MY_ANIME_LIST.length - 1 ? 'Next' : 'Complete'}
          </Button>
        </Group>
      </Group>

      <Stepper
        active={stepperActive}
        className={styles.stepperContainer}
        radius={'sm'}
        completedIcon={<IconCheck />}
      >
        {STEPS_MY_ANIME_LIST.map(({ Page, stepLabel, stepDescription, Icon, isComplete }) =>
          isComplete ? (
            <Stepper.Completed>
              <Title>Complete Add anime flow</Title>
            </Stepper.Completed>
          ) : (
            <Stepper.Step
              label={stepLabel}
              description={stepDescription}
              icon={Icon ? <Icon /> : <IconCheck />}
            ></Stepper.Step>
          )
        )}
      </Stepper>
    </Container>
  );
}
