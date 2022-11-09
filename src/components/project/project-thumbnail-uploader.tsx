import {Box, BoxProps, createStyles, Image} from '@mantine/core';
import {IconUpload} from '@tabler/icons';

const useStyles = createStyles(theme => ({
  container: {
    position: 'relative',
    borderRadius: 5,
    overflow: 'hidden',
  },
  overlay: {
    backgroundColor:
      theme.colorScheme === 'dark'
        ? 'rgba(255, 255, 255, 0.4)'
        : 'rgba(0, 0, 0, 0.4)',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    zIndex: 1,
    opacity: 0,
    cursor: 'pointer',
    color: theme.colorScheme === 'dark' ? '#000' : '#fff',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    transition: '.2s',
    '&:hover': {
      opacity: 1,
    },
  },
}));

export interface ProjectThumbnailUploaderProps extends BoxProps {
  width: number;
  height: number;
}

export function ProjectThumbnailUploader(props: ProjectThumbnailUploaderProps) {
  const {width, height, ...boxProps} = props;

  const {classes} = useStyles();

  return (
    <Box className={classes.container} sx={{height}} {...boxProps}>
      <Box className={classes.overlay}>
        <IconUpload strokeWidth={2.1} />
      </Box>
      <Image
        withPlaceholder
        width={width}
        height={height}
        fit="cover"
        src=""
        alt="Random unsplash image"
      />
    </Box>
  );
}
