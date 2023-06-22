import { CSS } from '@stitches/react/types/css-util';

export interface IconProps {
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
  color?:
    | 'dark'
    | 'light'
    | ({
        '@initial'?: 'dark' | 'light' | undefined;
      } & {
        [x: string]: 'dark' | 'light' | undefined;
      })
    | undefined;
}
