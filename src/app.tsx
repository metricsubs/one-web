import {ColorScheme, ColorSchemeProvider, MantineProvider} from '@mantine/core';
import {useColorScheme} from '@mantine/hooks';
import {NotificationsProvider, showNotification} from '@mantine/notifications';
import {useAtom} from 'jotai';
import {init as initLeancloudStorage} from 'leancloud-storage';
import {useEffect, useState} from 'react';
import {Navigate, Route, Routes} from 'react-router-dom';

import {AuthenticatedApp} from 'authenticated-app';
import {ErrorPage, PageLoader} from 'components';
import {recoverUserSession} from 'core/services';
import {LoginPage} from 'pages/user';
import {userAtom} from 'states';
import {parseErrorMessage} from 'utils';

initLeancloudStorage({
  serverURLs: import.meta.env.ONE_LEANCLOUD_API_ENDPOINT,
  appId: import.meta.env.ONE_LEANCLOUD_APP_ID,
  appKey: import.meta.env.ONE_LEANCLOUD_APP_KEY,
});

export function App() {
  const preferredColorScheme = useColorScheme();
  const [colorScheme, setColorScheme] =
    useState<ColorScheme>(preferredColorScheme);
  const toggleColorScheme = (value?: ColorScheme) =>
    setColorScheme(value || (colorScheme === 'dark' ? 'light' : 'dark'));

  const [loading, setLoading] = useState(true);
  const [user, setUser] = useAtom(userAtom);

  useEffect(() => {
    setColorScheme(preferredColorScheme);
  }, [preferredColorScheme]);

  useEffect(() => {
    const init = async () => {
      const userModel = await recoverUserSession();
      if (userModel) {
        setUser(userModel);
      }
    };

    init()
      .catch(error => {
        showNotification({
          color: 'red',
          title: 'Session Error',
          message: parseErrorMessage(error),
        });
      })
      .finally(() => {
        setLoading(false);
      });
  }, [setUser]);

  return (
    <ColorSchemeProvider
      colorScheme={colorScheme}
      toggleColorScheme={toggleColorScheme}
    >
      <MantineProvider theme={{colorScheme}} withGlobalStyles withNormalizeCSS>
        <NotificationsProvider>
          {loading ? (
            <PageLoader />
          ) : (
            <Routes>
              <Route
                path="/"
                element={
                  user ? <Navigate to="/app" /> : <Navigate to="/login" />
                }
              />
              <Route path="login" element={<LoginPage />} />
              <Route
                path="app/*"
                element={
                  user ? (
                    <AuthenticatedApp />
                  ) : (
                    <Navigate to={`/login?redirect=${location.pathname}`} />
                  )
                }
              />
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
          )}
        </NotificationsProvider>
      </MantineProvider>
    </ColorSchemeProvider>
  );
}
