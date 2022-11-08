import {Loader as MantineLoader, Stack, Text} from '@mantine/core';

export interface LoaderProps {
  title?: string;
}

export function Loader(props: LoaderProps) {
  const {title = 'Loading...'} = props;

  return (
    <Stack align="center">
      <MantineLoader />
      <Text color="dimmed">{title}</Text>
    </Stack>
  );
}
