import { styled } from '@stitches/react';
import { css } from '@stitches';
import { Virtuoso } from 'react-virtuoso';

export const VirtualList = styled(
  Virtuoso,
  'virtual-list',
  css({
    height: '100%',
    // height: '100%',
    width: '100%'
  })
);
export const VirtualListContentContainer = styled(
  'div',
  'list-content_container',
  css({
    overflowWrap: 'break-word',
    paddingTop: 2,
    paddingBottom: 2,
    paddingLeft: 72,
    paddingRight: 48,
    marginTop: 17,
    position: 'absolute',

    display: 'flex',
    flexDirection: 'row',
    alignItems: 'flex-start'
  })
);

export const VirtualListContainer = styled(
  'div',
  'list-container',
  css({
    flex: 1,
    width: '100%',
    position: 'relative'
  })
);

export const VirtualListMessageWrapper = styled(
  'div',
  'list-message_container',
  css({
    textAlign: 'left'
    // overflowX: 'hidden'
    // paddingBottom: 6
  })
);
