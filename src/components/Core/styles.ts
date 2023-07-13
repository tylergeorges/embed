import { styled, theme, keyframes, commonComponentId } from '@stitches';

const zoomIn = keyframes({
  from: { scale: '0.90', opacity: 0 },
  to: { scale: 'initial', opacity: 1 }
});

export const Main = styled.withConfig({
  componentId: commonComponentId,
  displayName: 'main'
})('main', {
  height: '100%',
  display: 'flex',
  flexDirection: 'row',
  width: '100%',
  backgroundColor: theme.colors.background,
  animation: `${zoomIn} 0.5s ease`,
  justifyItems: 'center'
});

export const InnerMain = styled.withConfig({
  componentId: commonComponentId,
  displayName: 'inner-main'
})('div', {
  width: '100%',
  height: '100%',
  display: 'flex',
  position: 'relative'
});

export const Wrapper = styled.withConfig({
  componentId: commonComponentId,
  displayName: 'wrapper'
})('div', {
  display: 'flex',
  flexDirection: 'column',
  height: '100%',
  width: '100%',
  transition: 'margin 0.3s ease, width 0.3s ease',

  '&::after': {
    content: '',
    height: '100%',
    width: '100%',
    pointerEvents: 'none',
    transition: 'opacity 0.5s ease',
    backgroundColor: 'rgb(0, 0, 0, 0.5)',
    opacity: 0
  }
});
