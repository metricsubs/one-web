import {Stack, Text, Button} from '@mantine/core';

import {parseErrorMessage} from 'utils';

export interface ErrorSectionProps {
  error: Error | string;
  onRetry?: () => void;
}

export function ErrorSection(props: ErrorSectionProps) {
  const {error, onRetry} = props;

  return (
    <Stack align="center">
      <Text color="red">{parseErrorMessage(error)}</Text>
      {onRetry && (
        <Button onClick={onRetry} color="yellow">
          Retry
        </Button>
      )}
    </Stack>
  );
}
