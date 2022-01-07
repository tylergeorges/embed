import styled from 'react-emotion'
import * as Modal from '@ui/Modal'

export const Root = styled(Modal.Content)`
  padding: 0;
  user-select: none;
  width: 424px;
  height: 424px;
  right: 0;
  bottom: 50px;
  overflow: scroll;
  border-radius: 8px;
  background: #2f3136;
  box-shadow: rgba(4, 4, 5, 0.15) 0px 0px 0px 1px, rgba(0, 0, 0, 0.24) 0px 8px 16px 0px;
`;

export const Container = styled.div`
  height: 100%;
  position: relative;
`;

export const Sidebar = styled.div`
  height: 100%;
  width: 3rem;
  padding: 0.5rem;
  position: fixed;
  background: #202225;
`;

export const Content = styled.div`
  height: 100%;
  margin-left: 3rem;
  padding: 0 0.5rem 0 0.5rem;
`;

export const EmojiDisplay = styled.span`
  padding: 4px;
  
  &:hover {
    background: #2f3136;
    cursor: pointer;
  }
  
  img {
    width: 32px !important;
    height: 32px !important;
  }
`;
