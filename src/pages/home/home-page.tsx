import {Button} from '@mantine/core';
import {IconPlus} from '@tabler/icons';

import {StatsGrid} from './@stats-grid';

import {Section} from 'components';

export function HomePage() {
  return (
    <div>
      <StatsGrid />
      <Section
        title="Projects"
        mt="md"
        action={<Button leftIcon={<IconPlus />}>Add new project</Button>}
      >
        <div>Projects</div>
      </Section>
    </div>
  );
}
