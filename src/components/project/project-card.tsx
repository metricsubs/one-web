import {Card, Stack, Text} from '@mantine/core';

export interface ProjectCardProps {
  project: any;
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
