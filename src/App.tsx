import {ColorScheme, ColorSchemeProvider, MantineProvider} from '@mantine/core';
import {useColorScheme} from '@mantine/hooks';
import {useState} from 'react';

import {Entrances} from '@entrances';
import {EntrancesContext} from 'hooks';

const entrances = new Entrances();

export function App() {
  const preferredColorScheme = useColorScheme();
  const [colorScheme, setColorScheme] =
    useState<ColorScheme>(preferredColorScheme);
  const toggleColorScheme = (value?: ColorScheme) =>
    setColorScheme(value || (colorScheme === 'dark' ? 'light' : 'dark'));

  return (
    <EntrancesContext.Provider value={entrances}>
      <ColorSchemeProvider
        colorScheme={colorScheme}
        toggleColorScheme={toggleColorScheme}
      >
        <MantineProvider
          theme={{colorScheme}}
          withGlobalStyles
          withNormalizeCSS
        >
          <div>hello</div>
        </MantineProvider>
      </ColorSchemeProvider>
    </EntrancesContext.Provider>
  );
}
