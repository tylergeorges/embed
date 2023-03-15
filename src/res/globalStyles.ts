import { globalCss } from '@stitches/react';

const globalStyles = globalCss({
  '.rc-tooltip': {
    position: 'absolute',
    zIndex: 1070,
    display: 'block',
    pointerEvents: 'none',

    '&.rc-tooltip-zoom-enter, &.rc-tooltip-zoom-leave': {
      display: 'block'
    }
  },

  '.rc-tooltip-inner, .rc-tooltip-arrow': {
    /* 'marginTop': '-5px'; */
    marginBottom: '-5px'
  },

  '.rc-tooltip-inner': {
    padding: '8px 12px',
    color: '#dcddde',
    backgroundColor: '#18191c',
    borderRadius: '5px',
    boxShadow: '0 2px 10px 0 rgba(0,0,0,.2)',
    fontSize: '14px',
    lineHeight: 1,
    fontWeight: 500,

    '.emoji': {
      width: '15px',
      marginRight: '2px'
    },

    '*': {
      color: 'inherit'
    }
  },

  '.rc-tooltip-zoom-enter, .rc-tooltip-zoom-appear': {
    opacity: 0,
    animationDuration: '0.3s',
    animationFillMode: 'both',
    animationTimingFunction: 'cubic-bezier(0.18, 0.89, 0.32, 1.28)',
    animationPlayState: 'paused',
    '&.rc-tooltip-zoom-enter-active, &.rc-tooltip-zoom-appear-active': {
      animationName: 'rcToolTipZoomIn',
      animationPlayState: 'running'
    }
  },

  '.rc-tooltip-zoom-leave': {
    animationDuration: '0.3s',
    animationFillMode: 'both',
    animationTimingFunction: 'cubic-bezier(0.6, -0.3, 0.74, 0.05)',
    animationPlayState: 'paused',

    '&.rc-tooltip-zoom-leave-active': {
      animationName: 'rcToolTipZoomOut',
      animationPlayState: 'running'
    }
  },

  // @keyframes rcToolTipZoomIn {
  //   0% {
  //     opacity: 0;
  //     transform-origin: 50% 50%;
  //     transform: scale(0, 0);
  //   }

  //   100% {
  //     opacity: 1;
  //     transform-origin: 50% 50%;
  //     transform: scale(1, 1);
  //   }
  // }

  // @keyframes rcToolTipZoomOut {
  //   0% {
  //     opacity: 1;
  //     transform-origin: 50% 50%;
  //     transform: scale(1, 1);
  //   }

  //   100% {
  //     opacity: 0;
  //     transform-origin: 50% 50%;
  //     transform: scale(0, 0);
  //   }
  // }

  '.rc-tooltip-hidden': {
    display: 'none'
  },

  '.rc-tooltip-placement-top, .rc-tooltip-placement-topLeft, .rc-tooltip-placement-topRight': {
    padding: '5px 0 9px 0',
    '.rc-tooltip-arrow': {
      bottom: '4px',
      marginLeft: '-5px',
      borderWidth: '5px 5px 0',
      borderTopColor: '#18191c'
    }
  },

  '.rc-tooltip-placement-right, .rc-tooltip-placement-rightTop, .rc-tooltip-placement-rightBottom': {
      padding: '0 5px 0 9px',
      '.rc-tooltip-arrow': {
        left: '4px',
        marginTop: '-5px',
        borderWidth: '5px 5px 5px 0',
        borderRightColor: '#18191c'
      }
    },

  '.rc-tooltip-placement-bottom, .rc-tooltip-placement-bottomLeft, .rc-tooltip-placement-bottomRight': {
      padding: '9px 0 5px 0',
      '.rc-tooltip-arrow': {
        top: '4px',
        marginLeft: '-5px',
        borderWidth: '0 5px 5px',
        borderBottomColor: '#18191c'
      }
    },

  '.rc-tooltip-placement-left, .rc-tooltip-placement-leftTop, .rc-tooltip-placement-leftBottom': {
    padding: '0 9px 0 5px',
    '.rc-tooltip-arrow': {
      right: '4px',
      marginTop: '-5px',
      borderWidth: '5px 0 5px 5px',
      borderLeftColor: '#18191c'
    }
  },

  '.rc-tooltip-arrow': {
    position: 'absolute',
    width: 0,
    height: 0,
    borderColor: 'transparent',
    borderStyle: 'solid'
  },

  '.rc-tooltip-placement-top .rc-tooltip-arrow': {
    left: '50%'
  },

  '.rc-tooltip-placement-topLeft .rc-tooltip-arrow': {
    left: '15%'
  },

  '.rc-tooltip-placement-topRight .rc-tooltip-arrow': {
    right: '15%'
  },

  '.rc-tooltip-placement-right .rc-tooltip-arrow': {
    top: '50%'
  },

  '.rc-tooltip-placement-rightTop .rc-tooltip-arrow': {
    top: '15%',
    marginTop: 0
  },

  '.rc-tooltip-placement-rightBottom .rc-tooltip-arrow': {
    bottom: '15%'
  },

  '.rc-tooltip-placement-left .rc-tooltip-arrow': {
    top: '50%'
  },

  '.rc-tooltip-placement-leftTop .rc-tooltip-arrow': {
    top: '15%',
    marginTop: 0
  },

  '.rc-tooltip-placement-leftBottom .rc-tooltip-arrow': {
    bottom: '15%'
  },

  '.rc-tooltip-placement-bottom .rc-tooltip-arrow': {
    left: '50%'
  },

  '.rc-tooltip-placement-bottomLeft .rc-tooltip-arrow': {
    left: '15%'
  },

  '.rc-tooltip-placement-bottomRight .rc-tooltip-arrow': {
    right: '15%'
  },

  button: {
    background: 'none',
    border: 'none',
    padding: 0,
    cursor: 'pointer'
  }
});

globalStyles();

export default globalStyles;
