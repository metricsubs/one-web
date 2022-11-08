import {SimpleGrid, useMantineTheme} from '@mantine/core';
import {useMediaQuery} from '@mantine/hooks';
import {
  IconListCheck,
  IconLanguageHiragana,
  IconAlphabetLatin,
  IconChecks,
} from '@tabler/icons';

import {StatCard} from 'components';

export function StatsGrid() {
  const theme = useMantineTheme();
  const smallScreenMatches = useMediaQuery(
    `(max-width: ${theme.breakpoints.sm}px)`,
  );

  return (
    <SimpleGrid cols={4} breakpoints={[{maxWidth: 'md', cols: 2}]}>
      <StatCard
        title="Total Todo"
        value="40"
        total="50"
        icon={!smallScreenMatches ? IconListCheck : undefined}
        bottomLabel="this month"
      />
      <StatCard
        title="Captionings Todo"
        value="30"
        total="50"
        icon={!smallScreenMatches ? IconAlphabetLatin : undefined}
        bottomLabel="this month"
      />
      <StatCard
        title="Translations Todo"
        value="30"
        total="50"
        icon={!smallScreenMatches ? IconLanguageHiragana : undefined}
        bottomLabel="this month"
      />
      <StatCard
        title="Proofreadings Todo"
        value="30"
        total="50"
        icon={!smallScreenMatches ? IconChecks : undefined}
        bottomLabel="this month"
      />
    </SimpleGrid>
  );
}
