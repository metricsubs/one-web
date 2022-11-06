import {AppShell} from '@mantine/core';
import {Route, Routes} from 'react-router-dom';

import {Header, ErrorPage} from 'components';
import {HomePage} from 'pages/home';

export function AuthenticatedApp(): React.ReactElement {
  return (
    <AppShell
      padding="md"
      header={<Header />}
      styles={theme => ({
        main: {
          backgroundColor:
            theme.colorScheme === 'dark'
              ? theme.colors.dark[8]
              : theme.colors.gray[0],
        },
      })}
    >
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="ok" element={<div>ok</div>} />
        <Route
          path="*"
          element={
            <ErrorPage
              statusCode={404}
              message="Unfortunately, this is only a 404 page. You may have mistyped the address, or the page has been moved to another URL."
            />
          }
        />
      </Routes>
    </AppShell>
  );
}
