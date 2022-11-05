import {ColorScheme, ColorSchemeProvider, MantineProvider} from '@mantine/core';
import {useColorScheme} from '@mantine/hooks';
import {useState} from 'react';

export default function App() {
  const preferredColorScheme = useColorScheme();
  const [colorScheme, setColorScheme] =
    useState<ColorScheme>(preferredColorScheme);
  const toggleColorScheme = (value?: ColorScheme) =>
    setColorScheme(value || (colorScheme === 'dark' ? 'light' : 'dark'));

  return (
    <ColorSchemeProvider
      colorScheme={colorScheme}
      toggleColorScheme={toggleColorScheme}
    >
      <MantineProvider theme={{colorScheme}} withGlobalStyles withNormalizeCSS>
        <div>hello</div>
      </MantineProvider>
    </ColorSchemeProvider>
  );
}
