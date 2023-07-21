import * as Styles from '@components/Overlays/Loading/styles';
import { useContextMenu } from '@hooks/useContextMenu';

export const Loading = () => {
  const { disableBrowserMenu } = useContextMenu();

  return (
    <Styles.SpinnerWrapper onContextMenu={disableBrowserMenu}>
      <Styles.Spinner />
    </Styles.SpinnerWrapper>
  );
};
