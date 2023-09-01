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
  display: 'block',
  boxSizing: 'border-box',
  flexDirection: 'row',
  width: '100%',
  animation: `${zoomIn} ${theme.transitions.longerDuration} ease`,
  fontFamily: 'GgSans',
  justifyItems: 'center'
});

export const InnerMain = styled.withConfig({
  componentId: commonComponentId,
  displayName: 'inner-main'
})('div', {
  width: '100%',
  height: '100%',
  display: 'block'
});
