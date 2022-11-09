import {Button, SimpleGrid} from '@mantine/core';
import {IconPlus} from '@tabler/icons';
import {useState} from 'react';

import {NewProjectModal} from './@new-project-modal';

import {ProjectCard, Section} from 'components';

export function ProjectSection() {
  const [newProjectModalOpened, setNewProjectModalOpened] = useState(false);

  const onNewProjectModalClose = (refresh: boolean) => {
    setNewProjectModalOpened(false);
  };

  return (
    <>
      <NewProjectModal
        opened={newProjectModalOpened}
        onClose={onNewProjectModalClose}
      />
      <Section
        title="Projects"
        mt="md"
        action={
          <Button
            leftIcon={<IconPlus />}
            onClick={() => setNewProjectModalOpened(true)}
          >
            Add new project
          </Button>
        }
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
    </>
  );
}
