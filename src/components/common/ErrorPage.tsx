import {
  createStyles,
  Title,
  Text,
  Button,
  Container,
  Group,
} from '@mantine/core';
import {NavLink} from 'react-router-dom';

const useStyles = createStyles(theme => ({
  root: {
    paddingTop: 80,
    paddingBottom: 80,
  },

  label: {
    textAlign: 'center',
    fontWeight: 900,
    fontSize: 220,
    lineHeight: 1,
    marginBottom: theme.spacing.xl * 1.5,
    color:
      theme.colorScheme === 'dark'
        ? theme.colors.dark[4]
        : theme.colors.gray[2],

    [theme.fn.smallerThan('sm')]: {
      fontSize: 120,
    },
  },

  title: {
    fontFamily: `Greycliff CF, ${theme.fontFamily}`,
    textAlign: 'center',
    fontWeight: 900,
    fontSize: 38,

    [theme.fn.smallerThan('sm')]: {
      fontSize: 32,
    },
  },

  description: {
    maxWidth: 500,
    margin: 'auto',
    marginTop: theme.spacing.xl,
    marginBottom: theme.spacing.xl * 1.5,
  },
}));

export interface ErrorPageProps {
  title?: string;
  message: string;
  statusCode: number;
}

export function ErrorPage(props: ErrorPageProps) {
  const {classes} = useStyles();

  const title = props.title || getTitleFromStatusCode(props.statusCode);

  return (
    <Container className={classes.root}>
      <div className={classes.label}>{props.statusCode}</div>
      <Title className={classes.title}>{title}</Title>
      <Text
        color="dimmed"
        size="lg"
        align="center"
        className={classes.description}
      >
        {props.message}
      </Text>
      <Group position="center">
        <NavLink to="/">
          <Button variant="subtle" size="md">
            Take me back to home page
          </Button>
        </NavLink>
      </Group>
    </Container>
  );
}

function getTitleFromStatusCode(statusCode: number): string {
  switch (statusCode) {
    case 400:
      return 'Request was invalid.';
    case 401:
      return 'Unauthorized access.';
    case 403:
      return 'Forbidden access.';
    case 404:
      return 'You have found a secret place.';
    case 500:
      return 'Oh no! Something went wrong.';
    default:
      return 'Unknown error';
  }
}
