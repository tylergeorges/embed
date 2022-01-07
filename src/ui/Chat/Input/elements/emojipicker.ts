import styled from 'react-emotion'
import * as Modal from '@ui/Modal'

export const Root = styled(Modal.Content)`
  padding: 0;
  text-align: center;
  user-select: none;
  width: 424px;
  height: 424px;
  right: 0;
  bottom: 50px;
  overflow: visible;
  border-radius: 8px;
  background: #2f3136;
  box-shadow: rgba(4, 4, 5, 0.15) 0px 0px 0px 1px, rgba(0, 0, 0, 0.24) 0px 8px 16px 0px;
`

export const Container = styled.div`
  position: relative;
  overflow: hidden;
`;

export const Sidebar = styled.div`
  height: inherit;
  width: 3rem;
  padding: 0.5rem;
  position: fixed;
  background: #202225;
`;
