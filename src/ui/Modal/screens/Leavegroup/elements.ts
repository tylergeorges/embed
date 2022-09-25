import styled from "@lib/emotion";
import * as Modal from "@ui/Modal";
import { Chat } from "@ui/Sidebar/Chats/elements";
import { Field as OriginalField } from '../Upload/elements'

export const Root = styled(Modal.Content)`
  padding: 0;
  text-align: center;
  user-select: none;
  width: 500px;
  max-width: 95%;
  max-height: 95%;
  top: 50%;
  left: 50%;
  -webkit-transform: translate(-50%,-50%);
  transform: translate(-50%,-50%);
  overflow: visible;
`

export const Top = styled.div`
  padding: 10px 10px 5px 20px;
  display: flex;
`

export const Title = styled.h1`
  font-size: 20px;
  font-weight: 600;
  margin: 10px 0;
  display: flex;
  flex-grow: 1;
`

export const Close = styled(Modal.Close)`
  margin: 15px;
`

export const List = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2.5px;
  margin: 0 15px 15px 15px;
  overflow: auto;

  &::-webkit-scrollbar {
    width: 5px;
  }

  &::-webkit-scrollbar-thumb {
    background: ${({ theme }) => theme.colors._background.darken(0.5).string()};
    border-radius: 5px;
  }
`

export const SearchBase = styled.div`
  margin: 0 15px;
`;

export const Field = styled(OriginalField)`
  text-align: left;
  margin-top: 20px;
`

export const UserWrapper = styled.div`
  margin: 0 8px;
  padding-bottom: 2.5px;

  div {
    background: none !important;
  }

  &:not(:last-child) {
    border-bottom: 1px solid ${({theme}) => theme.colors._primary.fade(0.9).string()};
  }
`

export const User = styled(Chat)`
  margin: 3px 0;
  padding: 5px 8px;
`
