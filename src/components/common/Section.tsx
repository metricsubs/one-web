import {Group, Stack, StackProps, Title} from '@mantine/core';

export interface SectionProps extends Omit<StackProps, 'title'> {
  title: NonNullable<React.ReactNode>;
  action?: React.ReactNode;
  children: React.ReactNode | React.ReactNode[];
}

export function Section(props: SectionProps): React.ReactElement {
  const {title, action, children, ...stackProps} = props;

  return (
    <Stack {...stackProps}>
      <Group position="apart">
        {typeof title === 'string' ? <Title order={3}>{title}</Title> : title}
        {action}
      </Group>
      {children}
    </Stack>
  );
}
