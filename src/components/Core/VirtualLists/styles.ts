import { theme } from '@stitches';
import { styled } from '@stitches/react';
import { Virtuoso } from 'react-virtuoso';

export const VirtualList = styled(Virtuoso, 'virtual-list', {
  overflowX: 'hidden',
  height: '100%'
});

export const VirtualListContentContainer = styled('div', 'list-content_container', {
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

export const VirtualListContainer = styled('div', 'list-container', {
  position: 'relative',
  width: '100%',
  height: '100%',
  boxSizing: 'content-box'
});

export const VirtualListMessageWrapper = styled('div', 'list-message_container', {
  textAlign: 'left'
});
