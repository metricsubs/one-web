import {Grid, MediaQuery, useMantineTheme} from '@mantine/core';

export function LoginPage() {
  const theme = useMantineTheme();

  return (
    <Grid gutter={0} mih="100vh">
      <MediaQuery
        query={`(max-width: ${theme.breakpoints.lg}px)`}
        styles={{display: 'none'}}
      >
        <Grid.Col lg={8} sx={{backgroundColor: theme.colors.gray[0]}}>
          1
        </Grid.Col>
      </MediaQuery>
      <Grid.Col lg={4} md={12}>
        3
      </Grid.Col>
    </Grid>
  );
}
