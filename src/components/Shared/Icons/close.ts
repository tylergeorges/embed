import { styled, theme } from '@stitches';

export const Close = styled('button', 'sidebar_close', {
  right: 0,
  height: theme.sizes.iconSizeLarge,
  width: theme.sizes.iconSizeLarge,

  background: `url("data:image/svg+xml;charset=UTF-8,%3csvg xmlns='http://www.w3.org/2000/svg' fill='rgba(255,255,255,0.3)' viewBox='0 0 44 44'%3e%3cpath d='M38.8 0L44 5.2 5.2 44 0 38.8 38.8 0z'/%3e%3cpath d='M5.2 0L44 38.8 38.8 44 0 5.2 5.2 0z'/%3e%3c/svg%3e")`,
  backgroundSize: '50%',
  backgroundPosition: '50% 50%',
  backgroundRepeat: 'no-repeat',

  border: 'none',
  borderRadius: '50%',

  outline: 'none',
  cursor: 'pointer',

  '&:hover, &:focus': {
    backgroundColor: theme.colors.primaryOpacity10
  },

  variants: {
    color: {
      light: {
        right: 0,
        background: `url("data:image/svg+xml;charset=UTF-8,%3csvg xmlns='http://www.w3.org/2000/svg' fill='rgb(181, 186, 193)' viewBox='0 0 44 44'%3e%3cpath d='M38.8 0L44 5.2 5.2 44 0 38.8 38.8 0z'/%3e%3cpath d='M5.2 0L44 38.8 38.8 44 0 5.2 5.2 0z'/%3e%3c/svg%3e")`,
        backgroundSize: '50%',
        backgroundPosition: '50% 50%',
        backgroundRepeat: 'no-repeat',

        height: theme.sizes.iconSizeSmall,
        width: theme.sizes.iconSizeSmall,

        borderRadius: '50%',
        border: 'none',

        outline: 'none',
        cursor: 'pointer'
      }
    }
  }
});
