function _parseErrorMessage(error: unknown): string {
  if (typeof error === 'string') {
    return error;
  }
  if (error instanceof Error) {
    return error.message;
  }
  if (typeof error === 'object' && error) {
    if ('message' in error) {
      const message = (error as any)['message'];
      if (typeof message === 'string') {
        return message;
      }
    }

    return `Unparsable error: ${JSON.stringify(error)}`;
  }

  return 'Unknown error';
}

export function parseErrorMessage(error: unknown): string {
  let errorMessage = _parseErrorMessage(error);
  errorMessage = errorMessage.replace(/\s+\[(.*?)\]$/, '');
  return errorMessage;
}
