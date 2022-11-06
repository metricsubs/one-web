import {Card, Stack, Text} from '@mantine/core';
import type {ProjectsResult} from '@metricsubs/one-server/dist/services/projects/projects.schema';

export interface ProjectCardProps {
  project: ProjectsResult;
}

export function ProjectCard(props: ProjectCardProps): React.ReactElement {
  const {project} = props;

  return (
    <Card shadow="sm" p="md">
      <Stack spacing="md">
        <Text size="xl" weight={500}>
          {project.name}
        </Text>
        <Text size="sm" color="gray">
          {project.description}
        </Text>
      </Stack>
    </Card>
  );
}
