import {createStyles, Image, Loader} from '@mantine/core';
import {IconArrowBarUp} from '@tabler/icons';
import classNames from 'classnames';
import {useCallback, useRef, useState} from 'react';

interface ThumbnailUploaderStylesParams {
  forceOverlayShow: boolean;
}

const useStyles = createStyles(
  (_theme, {forceOverlayShow}: ThumbnailUploaderStylesParams) => ({
    thumbnailWrapper: {
      display: 'flex',
      position: 'relative',
      alignItems: 'center',
      justifyContent: 'center',
      cursor: 'pointer',
    },
    thumbnailOverlay: {
      position: 'absolute',
      top: 0,
      left: 0,
      width: '100%',
      height: '100%',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      borderRadius: '50%',
      backgroundColor: 'rgba(0, 0, 0, 0.5)',
      transition: 'opacity 0.2s',
      opacity: forceOverlayShow ? 1 : 0,
      '&:hover': {
        opacity: 1,
      },
    },
    thumbnailInput: {
      display: 'none',
    },
  }),
);

export interface ThumbnailUploaderProps {
  className?: string;
  style?: React.CSSProperties;
  type: 'project' | 'task';
  id: string;
  onError: (errorMessage: string) => void;
}

export function ThumbnailUploader(props: ThumbnailUploaderProps) {
  const {className, style, type, id, onError} = props;
  const [uploadLoading, setUploadLoading] = useState(false);

  const {classes} = useStyles({forceOverlayShow: uploadLoading});
  const [thumbnailTimestamp, setThumbnailTimestamp] = useState<number>(
    Date.now(),
  );

  const inputRef = useRef<HTMLInputElement>(null);

  const refreshThumbnail = useCallback(() => {
    setThumbnailTimestamp(Date.now());
  }, []);

  const onThumbnailWrapperClick = useCallback(() => {
    inputRef.current?.click();
  }, []);

  const onAvatarInputChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0];
      if (!file) {
        return;
      }
      setUploadLoading(true);

      e.target.value = '';
    },
    [],
  );

  // TODO: Add a way to remove the thumbnail
  const thumbnailURL = getThumbnailURL('', type, id);

  return (
    <div
      className={classNames(classes.thumbnailWrapper, className)}
      onClick={onThumbnailWrapperClick}
      style={style}
    >
      <Image src={`${thumbnailURL}?timestamp=${thumbnailTimestamp}`} />
      <input
        className={classes.thumbnailInput}
        type="file"
        accept="image/jpg, image/jpeg, image/png, image/gif, image/bmp, image/webp"
        ref={inputRef}
        value={undefined}
        onChange={onAvatarInputChange}
      />
      <div className={classes.thumbnailOverlay}>
        {uploadLoading ? <Loader /> : <IconArrowBarUp color="white" />}
      </div>
    </div>
  );
}

export function getThumbnailURL(
  s3PublicURL: string,
  type: 'project' | 'task',
  id: string,
) {
  return `${s3PublicURL}/thumbnails/${type}/${id}`;
}
