import { styled } from '@stitches/react';
import { css } from '@stitches';

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
    height: '100%'
  })
);

export const VirtualListMessageWrapper = styled(
  'div',
  'list-message_container',
  css({
    // marginTop: 17,
    // paddingRight: 48,
    // paddingLeft: 72,
    // paddingTop: 2,
    // paddingBottom: 2
  })
);
