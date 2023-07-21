import * as Styles from '@icons/Buttons/IconButtonWrapper/styles';
import { svgUrls } from '@svg-assets';

export const StarsIcon = () => (
  <Styles.StarsIconRoot viewBox="0 0 104 80">
    <use href={`${svgUrls.IconNoThreadsStars}#svg`} />
  </Styles.StarsIconRoot>
);
