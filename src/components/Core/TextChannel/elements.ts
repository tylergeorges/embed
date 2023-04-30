import { styled } from '@stitches/react';
import { css } from '@stitches';

export const Root = styled(
  'div',
  'text-channel_root',
  css({
    display: 'flex',
    flexDirection: 'column',
    transition: 'margin 0.3s ease 0s, width 0.3s ease 0s',
    width: 'calc(100% - 250px)',
    // ! drop shadow, hide it using opacity for animation and only show for mobile users
    marginLeft: 250,

    '&::after': {
      content: '',
      top: 0,
      left: 0,
      position: 'absolute',
      height: '100%',
      width: '100%',
      pointerEvents: 'none',
      opacity: 0,

      transition: 'opacity 0.5s ease 0s',
      willChange: 'opacity',
      backgroundColor: 'rgba(0, 0, 0, 0.5)'
    },

    // ! show drop shadow
    '@md_screen': {
      transition: 'margin 0.3s ease 0s, width 0.3s ease 0s',
      // ! assuming the members side bar is still open
      marginLeft: '0px !important',
      width: '100% !important',
      height: '100%',
      '&::after': {
        transition: 'opacity 0.5s ease 0s',
        content: '',
        opacity: 1
      }
    },

    variants: {
      // ! assuming the members sidebar is still open
      channelsListOpen: {
        false: {
          width: '100% !important',
          marginLeft: '0px !important'
        }
      },
      membersListOpen: {
        // false: {
        //   width: '100%',
        //   marginRight: 0
        // },
        true: {
          marginRight: 250
          // width: 'calc(100% - 250px)',
        }
      }
    }
  })
);

export const TextChannelWrapper = styled(Root, 'textchannel-wrapper', {});
export const MessageWrapper = styled(
  'div',
  'messagewrapper',
  css({
    width: '100%',
    height: '100%',
    paddingLeft: 72,
    paddingRight: 72,
    textAlign: 'center',
    alignItems: 'center',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-end',

    '#channel-welcome_header_con': {
      width: '100%',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      textAlign: 'center'
    },
    '#channel-welcome_header': {
      fontWeight: 700,
      fontSize: '32px',
      marginBottom: 0,
      alignSelf: 'center',
      textAlign: 'center'
    },
    '#channel-welcome_subheader': {
      margin: 0,
      fontSize: '14px',
      color: 'rgba(255, 255, 255, 0.5)',
      textAlign: 'center'
    }
  })
);

export const TextInputWrapper = styled(
  'div',
  'user-text_input_con',
  css({
    marginLeft: 15,
    marginRight: 15,
    height: '7%',
    display: 'flex',
    alignItems: 'center',
    minHeight: 66,
    marginBottom: 15
  })
);
export const TextInput = styled(
  'input',
  'user-text_input',
  css({
    // padding: '10px 16px 10px 0px',
    width: '100%',
    height: '100%',
    backgroundColor: 'rgba(255, 255, 255, 0.07)',
    border: 'none',
    borderRadius: 8,
    outline: 'none',
    fontSize: 16,
    padding: 10,
    maxHeight: 60,
    minHeight: 40,
    fontWeight: 400
  })
);
