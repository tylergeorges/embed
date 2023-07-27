import { commonComponentId, theme, styled } from '@stitches';
import { Virtuoso } from 'react-virtuoso';

export const VirtualList = styled.withConfig({
  componentId: commonComponentId,
  displayName: 'virtual-list'
})(Virtuoso, {
  overflowX: 'hidden',
  height: '100%'
});

export const VirtualListContentContainer = styled.withConfig({
  componentId: commonComponentId,
  displayName: 'list-content_container'
})('div', {
  position: 'absolute',
  display: 'flex',
  flexDirection: 'row',
  alignItems: 'flex-start',

  overflowWrap: 'break-word',

  marginTop: theme.space.lg,

  paddingTop: theme.space.xxs,
  paddingBottom: theme.space.xxs,
  paddingLeft: 72,
  paddingRight: 48
});

export const VirtualListContainer = styled.withConfig({
  componentId: commonComponentId,
  displayName: 'list-container'
})('div', {
  position: 'relative',
  width: '100%',
  height: '100%',
  boxSizing: 'content-box'
});

export const VirtualListMessageWrapper = styled.withConfig({
  componentId: commonComponentId,
  displayName: 'list-message_container'
})('div', {
  textAlign: 'left',
  marginTop: '1.0625rem'
});
