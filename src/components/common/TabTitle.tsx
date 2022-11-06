import {useEffect} from 'react';

interface TabTitleProps {
  children: string;
  hideAppendix?: boolean;
}

export function TabTitle(props: TabTitleProps) {
  useEffect(() => {
    const originalTitle = document.title;
    const title =
      props.children + (props.hideAppendix ? '' : ' - Metricsubs One');
    document.title = title;
    return () => {
      document.title = originalTitle;
    };
  }, [props.children, props.hideAppendix]);

  return <></>;
}
