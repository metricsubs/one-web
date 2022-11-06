import {Group, Stack, Title} from '@mantine/core';

export interface SectionProps {
  title: NonNullable<React.ReactNode>;
  action?: React.ReactNode;
  children: React.ReactNode | React.ReactNode[];
}

export function Section(props: SectionProps): React.ReactElement {
  const {title, action, children} = props;

  return (
    <Stack>
      <Group position="apart">
        {typeof title === 'string' ? <Title order={3}>{title}</Title> : title}
        {action}
      </Group>
      {children}
    </Stack>
  );
}
