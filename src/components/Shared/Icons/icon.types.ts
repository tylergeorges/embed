import { CSS } from '@stitches/react/types/css-util';

export interface IconProps {
  onClick?: () => void;
  isActive?: boolean;
  customSize?: number;
  css?: CSS<{}, {}, {}, {}>;
  size?:
    | 'large'
    | 'regular'
    | ({
        '@initial'?: 'large' | 'regular' | undefined;
      } & {
        [x: string]: 'large' | 'regular' | undefined;
      })
    | undefined;
}
