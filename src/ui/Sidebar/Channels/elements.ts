import styled, { css } from '@lib/emotion'
import { ScrollOverlay } from '@ui/shared/scrollable'
import Button from "@ui/shared/button";

interface Props {
  loggedIn: boolean
}
export const Root = styled(ScrollOverlay)<Props>`
  & > div:first-child {
    & > *:last-child {
      margin-bottom: 20px;
    }

    ${({ theme, loggedIn }) => theme.directEnabled && loggedIn || css`
      padding-top: 20px;
    `}
  }
`;

const RefreshLink = Button.withComponent('a');

export const Refresh = styled(RefreshLink)`
  background: ${({ theme }) => theme.colors._accent.fade(0.6).string()};
  margin-left: 20px;
  padding-top: 0px !important;
  margin-right: auto
`;
