import {Carousel} from '@mantine/carousel';
import {
  Alert,
  Anchor,
  Button,
  Checkbox,
  Container,
  Grid,
  Image,
  Input,
  MediaQuery,
  Stack,
  Text,
  Tooltip,
  useMantineTheme,
} from '@mantine/core';
import {useForm} from '@mantine/form';
import {IconAlertCircle} from '@tabler/icons';
import Autoplay from 'embla-carousel-autoplay';
import {useAtom} from 'jotai';
import {useRef, useState} from 'react';
import {useNavigate, useSearchParams} from 'react-router-dom';

import LoginIllustration1Image from 'assets/login_illustration_1.svg';
import LoginIllustration2Image from 'assets/login_illustration_2.svg';
import LoginIllustration3Image from 'assets/login_illustration_3.svg';
import LogoSVG from 'assets/metricsubs.svg';
import {userLogin} from 'core/services';
import {userAtom} from 'states';
import {parseErrorMessage} from 'utils';

const PageCarouselSection = () => {
  const autoplay = useRef(Autoplay({delay: 5000}));

  return (
    <Carousel
      mx="auto"
      withIndicators
      height="100vh"
      plugins={[autoplay.current]}
      onMouseEnter={autoplay.current.stop}
      onMouseLeave={autoplay.current.reset}
      loop
    >
      <Carousel.Slide>
        <Stack align="center" justify="center" h="100%" p={100}>
          <Image src={LoginIllustration1Image} height="35vh" fit="contain" />
          <Text size="xl" weight="bold" mt="lg">
            Built by Translators for Translators
          </Text>
          <Text align="center">
            Brought to you by the team behind the popular tech channel on
            Bilibili. We use our own products to translate videos every day.
          </Text>
        </Stack>
      </Carousel.Slide>
      <Carousel.Slide>
        <Stack align="center" justify="center" h="100%" p={100}>
          <Image src={LoginIllustration2Image} height="35vh" fit="contain" />
          <Text size="xl" weight="bold" mt="lg">
            Open Source & Free
          </Text>
          <Text align="center">
            We believe in open source and free software. We are committed to
            bring efficient and high quality tools to the community.
          </Text>
        </Stack>
      </Carousel.Slide>
      <Carousel.Slide>
        <Stack align="center" justify="center" h="100%" p={100}>
          <Image src={LoginIllustration3Image} height="35vh" fit="contain" />
          <Text size="xl" weight="bold" mt="lg">
            Modernization in Action
          </Text>
          <Text align="center">
            We are building a new generation of video translation tools. Video
            translation should be fun and easy.
          </Text>
        </Stack>
      </Carousel.Slide>
    </Carousel>
  );
};

export function LoginPage() {
  const theme = useMantineTheme();
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const redirectURL = searchParams.get('redirect') || '/';

  const [_, setUser] = useAtom(userAtom);
  const [errorMessage, setErrorMessage] = useState('');
  const [loginLoading, setLoginLoading] = useState(false);

  const form = useForm({
    initialValues: {
      email: '',
      password: '',
      termsOfService: false,
    },

    validate: {
      email: value => (/^\S+@\S+$/.test(value) ? null : 'Invalid email'),
      password: value => (value.length >= 8 ? null : 'Password is too short'),
    },
  });

  const onLoginFormSubmit = (values: typeof form.values) => {
    setLoginLoading(true);
    setErrorMessage('');

    const {email, password} = values;

    const login = async () => {
      const userModel = await userLogin(email, password);
      setUser(userModel);
      navigate(redirectURL);
    };

    login()
      .catch(error => {
        setErrorMessage(parseErrorMessage(error));
      })
      .finally(() => {
        setLoginLoading(false);
      });
  };

  return (
    <Grid gutter={0} mih="100vh">
      <MediaQuery
        query={`(max-width: ${theme.breakpoints.lg}px)`}
        styles={{display: 'none'}}
      >
        <Grid.Col
          lg={7}
          sx={{
            backgroundColor:
              theme.colorScheme === 'light'
                ? theme.colors.gray[0]
                : theme.colors.gray[9],
          }}
        >
          <PageCarouselSection />
        </Grid.Col>
      </MediaQuery>
      <Grid.Col lg={5} md={12}>
        <Container p={60} size="sm" h="100%" maw="600px">
          <form
            style={{
              width: '100%',
              height: '100%',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
            }}
            onSubmit={form.onSubmit(
              values => onLoginFormSubmit(values),
              errors => {
                const errorMessage = Object.values(errors).at(0) as
                  | string
                  | undefined;
                if (!errorMessage) {
                  return;
                }
                setErrorMessage(errorMessage);
              },
            )}
          >
            {errorMessage ? (
              <Alert
                icon={<IconAlertCircle size={16} />}
                title="Error"
                color="red"
                mb={12}
                withCloseButton
                onClose={() => setErrorMessage('')}
              >
                {errorMessage}
              </Alert>
            ) : undefined}
            <Image
              src={LogoSVG}
              height={42}
              fit="contain"
              alt="MetricSubs"
              mb={12}
              mt={10}
            />
            <Input.Wrapper id="input-email" label="Email" mb={12} size="md">
              <Input
                id="input-email"
                placeholder="Your email"
                size="md"
                {...form.getInputProps('email')}
              />
            </Input.Wrapper>
            <Input.Wrapper
              id="input-password"
              label="Password"
              mb={14}
              size="md"
            >
              <Input
                id="input-password"
                placeholder="Your password"
                type="password"
                size="md"
                mt={6}
                {...form.getInputProps('password')}
              />
            </Input.Wrapper>
            <Checkbox
              label="I agree to sell my soul"
              mb={14}
              {...form.getInputProps('termsOfService', {type: 'checkbox'})}
            />
            <Button
              fullWidth
              size="md"
              mb={6}
              loading={loginLoading}
              disabled={!form.values.termsOfService}
              type="submit"
            >
              Login
            </Button>
            <Tooltip
              multiline
              width={220}
              withArrow
              transition="fade"
              transitionDuration={200}
              label="Contact Gliiiiiitchy(529189858) in the QQ group chat for help."
            >
              <Anchor align="center" href="#" size="sm" mt={4}>
                Can&apos;t log in?
              </Anchor>
            </Tooltip>
          </form>
        </Container>
      </Grid.Col>
    </Grid>
  );
}
