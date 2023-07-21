import { styled, theme, keyframes } from '@stitches';

const zoomIn = keyframes({
  from: { transform: 'scale(0.90)', opacity: 0 },
  to: { transform: 'initial', opacity: 1 }
});

export const Main = styled('main', 'main', {
  height: '100%',
  display: 'flex',
  flexDirection: 'row',
  width: '100%',
  backgroundColor: theme.colors.background,
  animation: `${zoomIn} 0.5s ease`,
  justifyItems: 'center'
});

export const InnerMain = styled('div', 'inner-main', {
  flexDirection: 'row',
  width: '100%',
  height: '100%',
  display: 'flex'
});
