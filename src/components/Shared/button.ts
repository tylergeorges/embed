import { styled, theme } from '@stitches';

const darken = `inset 0 0 0 99999px rgba(0, 0, 0, 0.1)`;
const lighten = `inset 0 0 0 99999px rgba(255, 255, 255, 0.1)`;

const Button = styled('button', 'button', {
  position: 'relative',
  overflow: 'hidden',
  backgroundColor: theme.colors.accent,
  transition: 'box-shadow 0.3s ease',
  textAlign: 'center',
  border: 'none',
  textDecoration: 'none',
  cursor: 'pointer',
  fontWeight: '$medium',
  outline: 'none',
  // userSelect: 'none',

  '&:hover, &:focus': {
    boxShadow: `${darken}, 0px 1px 5px 0px rgba(0, 0, 0, 0.2), 0px 2px 2px 0px rgba(0, 0, 0, 0.14), 0px 3px 1px -2px rgba(0, 0, 0, 0.12)`,

    '&::before': {
      transform: 'rotate(35deg) translate(500%, -50px)'
    }
  },

  '&:active': {
    boxShadow: `${lighten}, 0px 5px 5px -3px rgba(0, 0, 0, 0.2), 0px 8px 10px 1px rgba(0, 0, 0, 0.14), 0px 3px 14px 2px rgba(0, 0, 0, 0.12)`
  },

  variants: {
    size: {
      large: {
        borderRadius: 3,
        fontSize: 16,
        height: 44,
        lineHeight: 44,
        minWidth: 130,
        padding: '0 20px',
        '&::after': {
          display: 'none'
        },
        '&::before': {
          background: '#fff',
          content: '',
          height: 500,
          opacity: 0.2,
          position: 'absolute',
          left: 0,
          top: 0,
          transform: 'rotate(35deg) translate(-215px, -215px)',
          transition: 'transform 0.5s ease',
          width: 20,
          pointerEvents: 'none',
          boxShadow: '0 0 40px 24px #fff'
        }
      },
      small: {
        '&, &::after': {
          borderRadius: 20
        },
        fontSize: 15,
        height: 28,
        lineHeight: 28,
        minWidth: 75,
        padding: '0 15px'
      },
      mini: {
        '&, &::after': {
          borderRadius: 20
        },
        fontSize: 14,
        height: 24,
        lineHeight: 24,
        minWidth: 60,
        padding: '0 10px'
      }
    }
  }
});

export default Button;
