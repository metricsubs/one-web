import LogoSVG from 'assets/metricsubs.svg';

export interface PageLoaderProps {}

export function PageLoader(_props: PageLoaderProps): React.ReactElement {
  return (
    <div className="page-loader-wrapper">
      <img className="page-loader" src={LogoSVG} />
    </div>
  );
}
