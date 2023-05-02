import { css, theme } from '@stitches';
import { styled } from '@stitches/react';

export const Hash = styled(
  'div',
  'hash',
  css({
    backgroundPosition: '50%',
    backgroundSize: '20px 20px',
    backgroundRepeat: 'no-repeat',
    backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24' class='icon-1_QxNX'%3E%3Cpath fill='rgba(255,255,255,0.3)' fill-rule='evenodd' clip-rule='evenodd' d='M5.88657 21C5.57547 21 5.3399 20.7189 5.39427 20.4126L6.00001 17H2.59511C2.28449 17 2.04905 16.7198 2.10259 16.4138L2.27759 15.4138C2.31946 15.1746 2.52722 15 2.77011 15H6.35001L7.41001 9H4.00511C3.69449 9 3.45905 8.71977 3.51259 8.41381L3.68759 7.41381C3.72946 7.17456 3.93722 7 4.18011 7H7.76001L8.39677 3.41262C8.43914 3.17391 8.64664 3 8.88907 3H9.87344C10.1845 3 10.4201 3.28107 10.3657 3.58738L9.76001 7H15.76L16.3968 3.41262C16.4391 3.17391 16.6466 3 16.8891 3H17.8734C18.1845 3 18.4201 3.28107 18.3657 3.58738L17.76 7H21.1649C21.4755 7 21.711 7.28023 21.6574 7.58619L21.4824 8.58619C21.4406 8.82544 21.2328 9 20.9899 9H17.41L16.35 15H19.7549C20.0655 15 20.301 15.2802 20.2474 15.5862L20.0724 16.5862C20.0306 16.8254 19.8228 17 19.5799 17H16L15.3632 20.5874C15.3209 20.8261 15.1134 21 14.8709 21H13.8866C13.5755 21 13.3399 20.7189 13.3943 20.4126L14 17H8.00001L7.36325 20.5874C7.32088 20.8261 7.11337 21 6.87094 21H5.88657ZM9.41045 9L8.35045 15H14.3504L15.4104 9H9.41045Z'%3E%3C/path%3E%3C/svg%3E")`,
    width: 20,
    height: 20,
    marginRight: 7
  })
);

export const ThreadHash = styled(
  'div',
  'thread-hash',
  css({
    backgroundPosition: '50%',
    backgroundSize: '20px 20px',
    backgroundRepeat: 'no-repeat',
    backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24' class='icon-1_QxNX'%3E%3Cpath fill='${theme.colors.primaryOpacity60}' d='M14 8C14 7.44772 13.5523 7 13 7H9.76001L10.3657 3.58738C10.4201 3.28107 10.1845 3 9.87344 3H8.88907C8.64664 3 8.43914 3.17391 8.39677 3.41262L7.76001 7H4.18011C3.93722 7 3.72946 7.17456 3.68759 7.41381L3.51259 8.41381C3.45905 8.71977 3.69449 9 4.00511 9H7.41001L6.35001 15H2.77011C2.52722 15 2.31946 15.1746 2.27759 15.4138L2.10259 16.4138C2.04905 16.7198 2.28449 17 2.59511 17H6.00001L5.39427 20.4126C5.3399 20.7189 5.57547 21 5.88657 21H6.87094C7.11337 21 7.32088 20.8261 7.36325 20.5874L8.00001 17H14L13.3943 20.4126C13.3399 20.7189 13.5755 21 13.8866 21H14.8709C15.1134 21 15.3209 20.8261 15.3632 20.5874L16 17H19.5799C19.8228 17 20.0306 16.8254 20.0724 16.5862L20.2474 15.5862C20.301 15.2802 20.0655 15 19.7549 15H16.35L16.6758 13.1558C16.7823 12.5529 16.3186 12 15.7063 12C15.2286 12 14.8199 12.3429 14.7368 12.8133L14.3504 15H8.35045L9.41045 9H13C13.5523 9 14 8.55228 14 8Z'%3E%3C/path%3E%3Cpath fill='${theme.colors.primaryOpacity60}' fill-rule='evenodd' clip-rule='evenodd' d='M19.8914 3.80204L22.2438 8.55654C22.5726 9.22119 22.0891 9.99999 21.3475 10L16.6179 10C15.8745 10 15.391 9.21769 15.7235 8.55279L18.1007 3.79829C18.4701 3.05951 19.5251 3.06172 19.8914 3.80204ZM18.4998 5H19.4999V7.5H18.4999L18.4998 5ZM18.4998 8.49887C18.4998 8.77589 18.7238 9 18.9998 9C19.2759 9 19.4999 8.77589 19.4999 8.49887C19.4999 8.22224 19.2759 7.99773 18.9998 7.99773C18.7238 7.99773 18.4998 8.22224 18.4998 8.49887Z'%3E%3C/path%3E%3C/svg%3E")`
  })
);

export const NSFW = styled(
  'div',
  'nsfw',
  css({
    backgroundPosition: '50%',
    backgroundSize: '20px 20px',
    backgroundRepeat: 'no-repeat',
    backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' x='0' y='0' class='icon-22AiRD' aria-hidden='true' width='24' height='24' viewBox='0 0 24 24' fill='none'%3E%3Cpath fill='${theme.colors.primaryOpacity60}' d='M5.43309 21C5.35842 21 5.30189 20.9325 5.31494 20.859L5.99991 17H2.14274C2.06819 17 2.01168 16.9327 2.02453 16.8593L2.33253 15.0993C2.34258 15.0419 2.39244 15 2.45074 15H6.34991L7.40991 9H3.55274C3.47819 9 3.42168 8.93274 3.43453 8.85931L3.74253 7.09931C3.75258 7.04189 3.80244 7 3.86074 7H7.75991L8.45234 3.09903C8.46251 3.04174 8.51231 3 8.57049 3H10.3267C10.4014 3 10.4579 3.06746 10.4449 3.14097L9.75991 7H15.7599L16.4523 3.09903C16.4625 3.04174 16.5123 3 16.5705 3H18.3267C18.4014 3 18.4579 3.06746 18.4449 3.14097L17.7599 7H21.6171C21.6916 7 21.7481 7.06725 21.7353 7.14069L21.4273 8.90069C21.4172 8.95811 21.3674 9 21.3091 9H17.4099L17.0495 11.04H15.05L15.4104 9H9.41035L8.35035 15H10.5599V17H7.99991L7.30749 20.901C7.29732 20.9583 7.24752 21 7.18934 21H5.43309Z'%3E%3C/path%3E%3Cpath fill='${theme.colors.primaryOpacity60}' d='M13.4399 12.96C12.9097 12.96 12.4799 13.3898 12.4799 13.92V20.2213C12.4799 20.7515 12.9097 21.1813 13.4399 21.1813H14.3999C14.5325 21.1813 14.6399 21.2887 14.6399 21.4213V23.4597C14.6399 23.6677 14.8865 23.7773 15.0408 23.6378L17.4858 21.4289C17.6622 21.2695 17.8916 21.1813 18.1294 21.1813H22.5599C23.0901 21.1813 23.5199 20.7515 23.5199 20.2213V13.92C23.5199 13.3898 23.0901 12.96 22.5599 12.96H13.4399Z'%3E%3C/path%3E%3C/svg%3E")`
  })
);

export const News = styled(
  'div',
  'news',
  css({
    backgroundPosition: '50%',
    backgroundSize: '20px 20px',
    backgroundRepeat: 'no-repeat',
    backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' name='Megaphone' class='icon-1_QxNX' aria-hidden='false' width='16' height='16' viewBox='0 0 24 24'%3E%3Cpath d='M3.9 8.26H2V15.2941H3.9V8.26Z' fill='${theme.colors.primaryOpacity60}'%3E%3C/path%3E%3Cpath d='M19.1 4V5.12659L4.85 8.26447V18.1176C4.85 18.5496 5.1464 18.9252 5.5701 19.0315L9.3701 19.9727C9.4461 19.9906 9.524 20 9.6 20C9.89545 20 10.1776 19.8635 10.36 19.6235L12.7065 16.5242L19.1 17.9304V19.0588H21V4H19.1ZM9.2181 17.9944L6.75 17.3826V15.2113L10.6706 16.0753L9.2181 17.9944Z' fill='${theme.colors.primaryOpacity60}'%3E%3C/path%3E%3C/svg%3E")`
  })
);

export const NSFWNews = styled(
  'div',
  'nsfw-news',
  css({
    backgroundPosition: '50%',
    backgroundSize: '20px 20px',
    backgroundRepeat: 'no-repeat',
    backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='16' height='16' viewBox='0 0 24 24' class='icon-1_QxNX'%3E%3Cpath fill-rule='evenodd' clip-rule='evenodd' fill='${theme.colors.primaryOpacity60}' d='M15.5 6.24963L4.85 8.26448V18.1177C4.85 18.5497 5.1464 18.9252 5.5701 19.0315L9.3701 19.9727C9.4461 19.9906 9.524 20 9.6 20C9.89545 20 10.1776 19.8635 10.36 19.6235L12.7065 16.5242L19.1 17.9304V19.0588H21V11.25H16C14.9801 11.25 14.1386 10.2735 14.0155 9.25434C13.9954 9.08825 14.042 8.92305 14.1221 8.77618L15.5 6.24963ZM6.75 17.3826L9.2181 17.9944L10.6706 16.0753L6.75 15.2113V17.3826Z'%3E%3C/path%3E%3Cpath d='M2 8.26001H3.9V15.2941H2V8.26001Z' fill='${theme.colors.primaryOpacity60}'%3E%3C/path%3E%3Cpath fill='${theme.colors.primaryOpacity60}' fill-rule='evenodd' clip-rule='evenodd' d='M19.9173 3.80204L22.2821 8.55654C22.6126 9.22119 22.1265 9.99999 21.3811 10L16.6265 10C15.8793 10 15.3932 9.21769 15.7274 8.55279L18.1172 3.79829C18.4885 3.05951 19.5491 3.06172 19.9173 3.80204ZM18.5184 5H19.5237V7.5H18.5184L18.5184 5ZM18.5184 8.49887C18.5184 8.77589 18.7436 9 19.021 9C19.2985 9 19.5237 8.77589 19.5237 8.49887C19.5237 8.22224 19.2985 7.99773 19.021 7.99773C18.7436 7.99773 18.5184 8.22224 18.5184 8.49887Z'%3E%3C/path%3E%3C/svg%3E")`
  })
);

export const Store = styled(
  'div',
  'store',
  css({
    backgroundPosition: '50%',
    backgroundSize: '20px 20px',
    backgroundRepeat: 'no-repeat',
    backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' name='StoreTag' class='icon-1_QxNX' aria-hidden='false' width='24' height='24' viewBox='0 0 24 24'%3E%3Cpath fill='${theme.colors.primaryOpacity60}' d='M21.707 13.293l-11-11C10.519 2.105 10.266 2 10 2H3c-.553 0-1 .447-1 1v7c0 .266.105.519.293.707l11 11c.195.195.451.293.707.293s.512-.098.707-.293l7-7c.391-.391.391-1.023 0-1.414zM7 9c-1.106 0-2-.896-2-2 0-1.106.894-2 2-2 1.104 0 2 .894 2 2 0 1.104-.896 2-2 2z'%3E%3C/path%3E%3C/svg%3E")`
  })
);

export const Rules = styled(
  'div',
  'rules',
  css({
    backgroundPosition: '50%',
    backgroundSize: '20px 20px',
    backgroundRepeat: 'no-repeat',
    backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 40 40' fill='none' class='icon-1DeIlz'%3E%3Cpath fill='${theme.colors.primaryOpacity60}' fill-rule='evenodd' clip-rule='evenodd' d='M33 34.5833V7.49998H35V36.6666H9C6.791 36.6666 5 34.801 5 32.5V7.49998C5 5.19894 6.791 3.33331 9 3.33331H31V30.4166H9C7.8955 30.4166 7 31.3485 7 32.5C7 33.6515 7.8955 34.5833 9 34.5833H33ZM23.9718 9.99998L15.8889 17.9915L12.7086 14.8441L10 17.5058L15.8885 23.3333L26.6667 12.6669L23.9718 9.99998Z'%3E%3C/path%3E%3C/svg%3E")`
  })
);

export const Voice = styled(
  'div',
  'voice',
  css({
    backgroundPosition: '50%',
    backgroundSize: '20px 20px',
    backgroundRepeat: 'no-repeat',
    backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24'%3E%3Cpath fill='${theme.colors.primaryOpacity60}' fill-rule='evenodd' clip-rule='evenodd' d='M11.383 3.07904C11.009 2.92504 10.579 3.01004 10.293 3.29604L6 8.00204H3C2.45 8.00204 2 8.45304 2 9.00204V15.002C2 15.552 2.45 16.002 3 16.002H6L10.293 20.71C10.579 20.996 11.009 21.082 11.383 20.927C11.757 20.772 12 20.407 12 20.002V4.00204C12 3.59904 11.757 3.23204 11.383 3.07904ZM14 5.00195V7.00195C16.757 7.00195 19 9.24595 19 12.002C19 14.759 16.757 17.002 14 17.002V19.002C17.86 19.002 21 15.863 21 12.002C21 8.14295 17.86 5.00195 14 5.00195ZM14 9.00195C15.654 9.00195 17 10.349 17 12.002C17 13.657 15.654 15.002 14 15.002V13.002C14.551 13.002 15 12.553 15 12.002C15 11.451 14.551 11.002 14 11.002V9.00195Z'%3E%3C/path%3E%3C/svg%3E")`
  })
);

export const NSFWVoice = styled(
  'div',
  'nsfw-voice',
  css({
    backgroundPosition: '50%',
    backgroundSize: '20px 20px',
    backgroundRepeat: 'no-repeat',
    backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24'%3E%3Cpath fill='${theme.colors.primaryOpacity60}' fill-rule='evenodd' clip-rule='evenodd' d='M15 12C15 12.0007 15 12.0013 15 12.002C15 12.553 14.551 13.002 14 13.002V15.002C15.654 15.002 17 13.657 17 12.002C17 12.0013 17 12.0007 17 12H15ZM19 12C19 12.0007 19 12.0013 19 12.002C19 14.759 16.757 17.002 14 17.002V19.002C17.86 19.002 21 15.863 21 12.002C21 12.0013 21 12.0007 21 12H19ZM10.293 3.29604C10.579 3.01004 11.009 2.92504 11.383 3.07904C11.757 3.23204 12 3.59904 12 4.00204V20.002C12 20.407 11.757 20.772 11.383 20.927C11.009 21.082 10.579 20.996 10.293 20.71L6 16.002H3C2.45 16.002 2 15.552 2 15.002V9.00204C2 8.45304 2.45 8.00204 3 8.00204H6L10.293 3.29604Z'%3E%3C/path%3E%3Cpath fill='${theme.colors.primaryOpacity60}' fill-rule='evenodd' clip-rule='evenodd' d='M19.8916 3.80204L22.2439 8.55654C22.5728 9.22119 22.0892 9.99999 21.3476 10L16.618 10C15.8746 10 15.3912 9.21769 15.7236 8.55279L18.1008 3.79829C18.4702 3.05951 19.5253 3.06172 19.8916 3.80204ZM18.4999 5H19.5V7.5H18.5L18.4999 5ZM18.4999 8.49887C18.4999 8.77589 18.724 9 19 9C19.276 9 19.5 8.77589 19.5 8.49887C19.5 8.22224 19.276 7.99773 19 7.99773C18.724 7.99773 18.4999 8.22224 18.4999 8.49887Z'%3E%3C/path%3E%3C/svg%3E")`
  })
);

export const IconButtonRoot = styled(
  'svg',
  'button-icons',
  css({
    width: 24,
    height: 24,
    // viewBox: '0 0 24 24',
    path: {
      fill: 'rgb(181,186,193)'
    },
    '&:hover': {
      path: {
        fill: theme.colors.primaryOpacity60
        // fill: theme.colors.primaryOpacity60,
      }
    }
    // className="text-channel_members_icon text-channel_header_icons"
    // onClick={() => setMembersListOpen(!isMembersListOpen)}
  })
);

export const MembersIconRoot = styled(
  IconButtonRoot,
  'text-channel_members_icon',
  css({
    justifySelf: 'flex-end'
  })
);
