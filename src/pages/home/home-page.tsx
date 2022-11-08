import {Button, SimpleGrid} from '@mantine/core';
import {IconPlus} from '@tabler/icons';

import {StatsGrid} from './@stats-grid';

import {ProjectCard, Section} from 'components';

export function HomePage() {
  return (
    <div>
      <StatsGrid />
      <Section
        title="Projects"
        mt="md"
        action={<Button leftIcon={<IconPlus />}>Add new project</Button>}
      >
        <SimpleGrid
          cols={4}
          breakpoints={[
            {maxWidth: 'md', cols: 2},
            {maxWidth: 'sm', cols: 1},
          ]}
        >
          <ProjectCard
            project={{
              name: 'TechLinked',
              tag: 'YouTube',
              description: 'Please give me my tech news!',
              thumbnailURL: 'https://picsum.photos/seed/picsum/200/300',
            }}
          />
        </SimpleGrid>
      </Section>
    </div>
  );
}
