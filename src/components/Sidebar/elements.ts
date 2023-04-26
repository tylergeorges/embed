import { styled, css, theme } from '@/../stitches.config';

export const Root = styled(
  'div',
  'sidebar-root',
  css({
    position: 'absolute',
    zIndex: 9,
    backgroundColor: theme.colors.backgroundOpacity10,
    width: 200,
    height: '100%',
    flexShrink: 0,
    transition: 'transform 0.3s ease',
    display: 'flex',
    flexDirection: 'column',
    willChange: 'transform',
    overflow: 'hidden',

    '& > div > div:nth-child(1)': {
      paddingBottom: 10
    },

    '@media (max-width: 400px), (max-height: 340px)': {
      width: 180
    },

    '@media (max-width: 210px)': {
      width: 150
    },

    '@media (max-width: 170px)': {
      width: 150
    },

    variants: {
      visible: {
        true: {
          [`& ${!theme.singleChannel.enable}`]: {
            '@media (max-width: 520px)': {
              boxShadow:
                '0px 8px 10px -5px rgba(0, 0, 0, 0.2), 0px 16px 24px 2px rgba(0, 0, 0, 0.14), 0px 6px 30px 5px rgba(0, 0, 0, 0.12)'
            },
            '@media screen and (max-width: 520px)': {
              boxShadow:
                '0px 8px 10px -5px rgba(0, 0, 0, 0.2), 0px 16px 24px 2px rgba(0, 0, 0, 0.14), 0px 6px 30px 5px rgba(0, 0, 0, 0.12)'
            }
          }
        },
        false: {
          display: theme.singleChannel.enable ? 'none' : 'translateX(-250px)'
        }
      }
    }
  })
);

export const Close = styled(
  'button',
  'sidebar-close',
  css({
    '@media screen and (max-width: 520px)': {
      position: 'absolute',
      right: 0,
      height: 30,
      width: 30,
      margin: 'auto 4px',

      background: `url("data:image/svg+xml;charset=UTF-8,%3csvg xmlns='http://www.w3.org/2000/svg' fill='${encodeURIComponent(
        theme.colors.primary.toString()
      )}' viewBox='0 0 44 44'%3e%3cpath d='M38.8 0L44 5.2 5.2 44 0 38.8 38.8 0z'/%3e%3cpath d='M5.2 0L44 38.8 38.8 44 0 5.2 5.2 0z'/%3e%3c/svg%3e")`,
      backgroundSize: '40%',
      backgroundPosition: '50% 50%',
      backgroundRepeat: 'no-repeat',
      opacity: 0.5,

      border: 'none',
      outline: 'none',
      cursor: 'pointer',
      transition: 'background-color 0.1s ease',

      [`& ${theme.singleChannel.enable}`]: {
        display: 'none'
      },

      '&:hover, &:focus': {
        backgroundColor: theme.colors.primaryOpacity80
      },

      '&, &::after': {
        borderRadius: '50%'
      }
    }
  })
);
