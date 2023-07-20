import * as Styles from '@icons/Buttons/IconButtonWrapper/styles';
import { svgUrls } from '@svg-assets';

export const ThreadSpine = () => (
  <Styles.ThreadSpineWrapper>
    <Styles.ThreadSpineSvgWrapper color="dark" viewBox="0 0 12 11">
      <use href={`${svgUrls.IconThreadSpine}#svg`} />
    </Styles.ThreadSpineSvgWrapper>
  </Styles.ThreadSpineWrapper>
);
