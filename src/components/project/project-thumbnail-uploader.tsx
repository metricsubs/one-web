import {Box, BoxProps, createStyles, Image} from '@mantine/core';
import {IconUpload} from '@tabler/icons';
import {useRef, useState} from 'react';

const useStyles = createStyles(theme => ({
  container: {
    position: 'relative',
    borderRadius: 5,
    overflow: 'hidden',
    backgroundColor:
      theme.colorScheme === 'dark'
        ? theme.colors.dark[5]
        : theme.colors.gray[1],
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
  fileInput: {
    display: 'none',
  },
}));

export interface ProjectThumbnailUploaderProps extends BoxProps {
  width: number;
  height: number;
  value: File | undefined;
  onChange: (file: File) => void;
}

export function ProjectThumbnailUploader(props: ProjectThumbnailUploaderProps) {
  const {width, height, onChange, ...boxProps} = props;

  const {classes} = useStyles();
  const inputRef = useRef<HTMLInputElement>(null);
  const [imageSrc, setImageSrc] = useState<string | undefined>(undefined);

  const onFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) {
      return;
    }

    onChange(file);
    const reader = new FileReader();
    reader.onload = function () {
      setImageSrc(reader.result as string);
    };
    reader.readAsDataURL(file);
    console.log(file);

    e.target.value = '';
  };

  return (
    <Box
      className={classes.container}
      sx={{height}}
      {...boxProps}
      onClick={() => inputRef.current?.click()}
    >
      <Box className={classes.overlay}>
        <IconUpload strokeWidth={2.1} />
      </Box>
      <input
        className={classes.fileInput}
        type="file"
        accept="image/jpg, image/jpeg, image/png, image/gif, image/bmp, image/webp"
        ref={inputRef}
        value={undefined}
        onChange={onFileInputChange}
      />
      <Image
        withPlaceholder
        width={width}
        height={height}
        fit="cover"
        src={imageSrc}
        alt="Random unsplash image"
      />
    </Box>
  );
}
