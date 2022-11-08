import {createStyles, Group, MantineColor, Paper, Text} from '@mantine/core';
import {TablerIcon} from '@tabler/icons';

const useStyles = createStyles(theme => ({
  root: {
    padding: theme.spacing.xl * 1.5,
  },

  value: {
    fontSize: 24,
    fontWeight: 700,
    lineHeight: 1,
  },

  diff: {
    lineHeight: 1,
    display: 'flex',
    alignItems: 'center',
  },

  icon: {
    color:
      theme.colorScheme === 'dark'
        ? theme.colors.dark[3]
        : theme.colors.gray[4],
  },

  title: {
    fontWeight: 700,
    textTransform: 'uppercase',
  },
}));

export interface StatCardProps {
  title: string;
  value: string;
  color?: 'dimmed' | MantineColor;
  total?: string;
  icon?: TablerIcon;
  bottomLabel?: string;
}

export function StatCard(props: StatCardProps) {
  const {title, value, total, icon, color, bottomLabel} = props;

  const {classes} = useStyles();
  const Icon = icon;

  return (
    <Paper withBorder p="md" radius="md" key={title}>
      <Group position="apart">
        <Text size="xs" color="dimmed" className={classes.title}>
          {title}
        </Text>
        {Icon && <Icon className={classes.icon} size={22} stroke={1.5} />}
      </Group>

      <Group align="flex-end" spacing="xs" mt={25}>
        <Text className={classes.value} color={color}>
          {value}
        </Text>
        {total && (
          <Text color="gray" size="sm" weight={500} className={classes.diff}>
            <span>/ {total}</span>
          </Text>
        )}
      </Group>

      {bottomLabel && (
        <Text size="xs" color="dimmed" mt={7}>
          {bottomLabel}
        </Text>
      )}
    </Paper>
  );
}
