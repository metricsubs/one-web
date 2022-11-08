import {
  ActionIcon,
  Badge,
  Button,
  Card,
  createStyles,
  Group,
  Image,
  Progress,
  Stack,
  Text,
} from '@mantine/core';
import {IconBell, IconEdit} from '@tabler/icons';

const useStyles = createStyles(theme => ({
  card: {
    backgroundColor:
      theme.colorScheme === 'dark' ? theme.colors.dark[7] : theme.white,
    position: 'relative',
  },

  control: {
    position: 'absolute',
    top: theme.spacing.xs,
    right: theme.spacing.xs + 2,
  },

  section: {
    borderBottom: `1px solid ${
      theme.colorScheme === 'dark' ? theme.colors.dark[4] : theme.colors.gray[3]
    }`,
    paddingLeft: theme.spacing.md,
    paddingRight: theme.spacing.md,
    paddingBottom: theme.spacing.md,
  },

  like: {
    color: theme.colors.red[6],
  },

  label: {
    textTransform: 'uppercase',
    fontSize: theme.fontSizes.xs,
    fontWeight: 700,
  },
}));

export interface ProjectCardProps {
  project: any;
}

export function ProjectCard(props: ProjectCardProps): React.ReactElement {
  const {project} = props;

  const {classes} = useStyles();

  return (
    <Card withBorder radius="md" p="md" className={classes.card}>
      <Card.Section>
        <Image src={project.thumbnailURL} alt={project.name} height={180} />
      </Card.Section>

      <Stack className={classes.control}>
        <ActionIcon variant="default" radius="md" size={30}>
          <IconEdit size={16} />
        </ActionIcon>
      </Stack>

      <Card.Section className={classes.section} mt="md">
        <Group position="apart">
          <Text size="lg" weight={500}>
            {project.name}
          </Text>
          {project.tag && <Badge size="sm">{project.tag}</Badge>}
        </Group>
        <Text size="sm" mt="xs">
          {project.description}
        </Text>
      </Card.Section>

      <Card.Section className={classes.section} mt="md">
        <Text color="dimmed" size="sm">
          Tasks completed:{' '}
          <Text
            span
            weight={500}
            sx={theme => ({
              color: theme.colorScheme === 'dark' ? theme.white : theme.black,
            })}
          >
            23/36
          </Text>
        </Text>
        <Progress value={(23 / 36) * 100} mt={5} />
      </Card.Section>

      <Group mt="xs">
        <Button radius="md" style={{flex: 1}}>
          View project
        </Button>
        <ActionIcon variant="default" radius="md" size={36}>
          <IconBell size={18} className={classes.like} stroke={1.5} />
        </ActionIcon>
      </Group>
    </Card>
  );
}
