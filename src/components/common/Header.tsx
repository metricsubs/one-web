import {
  ActionIcon,
  Avatar,
  Group,
  Header as MantineHeader,
  Image,
  Menu,
  Text,
  useMantineColorScheme,
} from '@mantine/core';
import {showNotification} from '@mantine/notifications';
import {
  IconSun,
  IconMoon,
  IconLogout,
  IconUser,
  IconShieldLock,
} from '@tabler/icons';
import {useAtomValue} from 'jotai';
import {User} from 'leancloud-storage';
import {useCallback} from 'react';
import {useNavigate} from 'react-router-dom';

import LogoSVG from 'assets/metricsubs.svg';
import {userAtom} from 'states';
import {nullThrows} from 'utils';

export function Header() {
  const {colorScheme, toggleColorScheme} = useMantineColorScheme();
  const dark = colorScheme === 'dark';
  const navigate = useNavigate();
  const user = nullThrows(useAtomValue(userAtom));

  const onLogoutButtonClick = useCallback(() => {
    User.logOut().then(() => {
      showNotification({
        title: 'Success',
        message: 'Logged out successfully, redirecting to login page...',
      });
      navigate('/login');
    });
  }, [navigate]);

  return (
    <MantineHeader height={60} px="md">
      <Group position="apart" sx={{height: '100%'}}>
        <Group position="left" spacing="xs" noWrap>
          <Image
            src={LogoSVG}
            height={28}
            width={28}
            fit="contain"
            alt="MetricSubs"
          />
          <Text weight="bold" size="md">
            MetricSubs
          </Text>
        </Group>
        <Group position="right" spacing="xs">
          <Menu shadow="md" width={200} trigger="hover">
            <Menu.Target>
              <Avatar color="cyan" radius="xl">
                {user.username[0]}
              </Avatar>
            </Menu.Target>
            <Menu.Dropdown>
              <Menu.Label>Account</Menu.Label>
              <Menu.Item icon={<IconUser size={14} />}>Profile</Menu.Item>
              <Menu.Item icon={<IconShieldLock size={14} />}>
                Security
              </Menu.Item>
              <Menu.Divider />
              <Menu.Item
                color="red"
                icon={<IconLogout size={14} />}
                onClick={onLogoutButtonClick}
              >
                Logout
              </Menu.Item>
            </Menu.Dropdown>
          </Menu>
          <ActionIcon
            variant="default"
            size="lg"
            onClick={() => toggleColorScheme()}
            title="Toggle color scheme"
            radius="md"
          >
            {dark ? <IconSun size={18} /> : <IconMoon size={18} />}
          </ActionIcon>
        </Group>
      </Group>
    </MantineHeader>
  );
}
