import styled, { css, Theme } from '@lib/emotion'
import * as Modal from '@ui/Modal'

export const Root = styled(Modal.Content)`
  padding: 0;
  user-select: none;
  width: 450px;
  max-width: 100%;
  height: 424px;
  right: 0;
  bottom: 75px;
  overflow: hidden;
  border-radius: 8px;
  background: ${({ theme }) => theme.colors.background};
  box-shadow: rgba(4, 4, 5, 0.15) 0px 0px 0px 1px, rgba(0, 0, 0, 0.24) 0px 8px 16px 0px;
`;

export const Container = styled.div`
  height: 100%;
  position: relative;
`;

export const Sidebar = styled.div`
  justify-content: center;
  height: 100%;
  width: 40px;
  padding-top: 8px;
  position: absolute;
  background: ${({ theme }) => theme.colors._background.darken(0.5).toString()};
`;

export const Content = styled.div`
  height: 100%;
  margin-left: 40px;
  padding: 0 0.2rem 0 0.5rem;
  background-color: ${({ theme }) => theme.colors._background.darken(0.15).string()};

  & > :first-child > :first-child {
    &::-webkit-scrollbar {
      width: 6px;
    }

    &::-webkit-scrollbar-thumb {
      background: ${({ theme }) => theme.colors._background.darken(0.5).string()};
      border-radius: 10px;
    }
  }
`;

export const RowContainer = styled.div`
  display: flex;
  padding: 4px;
`;

export const NameDisplay = styled.h2`
  display: flex;
  column-gap: 0.5rem;
  align-items: center;
  text-transform: uppercase;
  color: ${({ theme }) => theme.colors._primary.fade(0.3).toString()};
  padding-left: 0.5rem;
  margin: 0.75rem 0 0 -4px;
  font-size: unset;
`;

export const EmojiDisplay = styled.span`
  width: 40px;
  height: 40px;
  padding: 4px;

  &:hover {
    background: ${({ theme }) => theme.colors._primary.fade(0.8).toString()};
    border-radius: 4px;
    cursor: pointer;
  }
  
  img {
    width: 100%;
    height: 100%;
    object-fit: contain;
  }
`;

export const SidebarEmojiDisplay = styled.span`
  width: 28px;
  height: 28px;
  cursor: pointer;
  
  display: block;
  margin: 0.5rem auto 0.5rem auto;

  div:hover {
    background: ${({ theme }) => theme.colors._primary.fade(0.1).toString()};
  }
`;

export interface ServerIconProps {
  sidebar?: boolean
}
export const ServerIcon = styled.img<ServerIconProps>`
  ${({ sidebar }) => css`
    border-radius: ${sidebar ? '50%' : '4px'};
    width: ${sidebar ? 28 : 16}px;
    height: ${sidebar ? 28 : 16}px;
  `}

  &:hover {
    border-radius: 4px;
  }
`

// Category icons
export namespace Icons {
  export interface IconProps {
    sidebar?: boolean;
    theme: Theme
  }

  const iconStyle = (props: IconProps) => css`
    background-color: ${props.theme.colors._primary.fade(0.3).toString()};
    
    width: ${props.sidebar ? 28 : 16}px;
    height: ${props.sidebar ? 28 : 16}px;
  `;

  export const People = styled.div`
    ${iconStyle};
    
    mask-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' aria-hidden='false' viewBox='0 0 24 24'%3E%3Cpath d='M12 2C6.477 2 2 6.477 2 12C2 17.522 6.477 22 12 22C17.523 22 22 17.522 22 12C22 6.477 17.522 2 12 2ZM16.293 6.293L17.707 7.706L16.414 9L17.707 10.293L16.293 11.706L13.586 9L16.293 6.293ZM6.293 7.707L7.707 6.294L10.414 9L7.707 11.707L6.293 10.294L7.586 9L6.293 7.707ZM12 19C9.609 19 7.412 17.868 6 16.043L7.559 14.486C8.555 15.92 10.196 16.831 12 16.831C13.809 16.831 15.447 15.92 16.443 14.481L18 16.04C16.59 17.867 14.396 19 12 19Z' fill='currentColor'%3E%3C/path%3E%3C/svg%3E");
  `;

  export const Nature = styled.div`
    ${iconStyle};
    
    mask-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' aria-hidden='false' viewBox='0 0 24 24'%3E%3Cpath d='M6.814 8.982C4.539 11.674 4.656 15.591 6.931 18.153L4.034 21.579L5.561 22.87L8.463 19.437C9.569 20.127 10.846 20.513 12.161 20.513C14.231 20.513 16.183 19.607 17.516 18.027C20.069 15.01 20.771 6.945 21 3C17.765 3.876 9.032 6.356 6.814 8.982V8.982ZM8.935 17.331C6.826 15.548 6.56 12.382 8.342 10.272C9.592 8.793 14.904 6.845 18.764 5.698L8.935 17.331V17.331Z' fill='currentColor'%3E%3C/path%3E%3C/svg%3E");
  `;


  export const Food = styled.div`
    ${iconStyle};
    
    mask-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' aria-hidden='false' viewBox='0 0 24 24'%3E%3Cpath d='M11 18H13V22H11V18Z' fill='currentColor'%3E%3C/path%3E%3Cpath d='M12 2C8.822 2 7 4.187 7 8V16C7 16.552 7.447 17 8 17H16C16.553 17 17 16.552 17 16V8C17 4.187 15.178 2 12 2ZM11 14.001H10V5.001H11V14.001ZM14 14.001H13V5.001H14V14.001Z' fill='currentColor'%3E%3C/path%3E%3C/svg%3E");
  `;

  export const Activity = styled.div`
    ${iconStyle};
    
    mask-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' aria-hidden='false' viewBox='0 0 24 24'%3E%3Cpath d='M5.66487 5H18.3351C19.9078 5 21.2136 6.21463 21.3272 7.78329L21.9931 16.9774C22.0684 18.0165 21.287 18.9198 20.248 18.9951C20.2026 18.9984 20.1572 19 20.1117 19C18.919 19 17.8785 18.1904 17.5855 17.0342L17.0698 15H6.93015L6.41449 17.0342C6.12142 18.1904 5.08094 19 3.88826 19C2.84645 19 2.00189 18.1554 2.00189 17.1136C2.00189 17.0682 2.00354 17.0227 2.00682 16.9774L2.67271 7.78329C2.78632 6.21463 4.0921 5 5.66487 5ZM14.5 10C15.3284 10 16 9.32843 16 8.5C16 7.67157 15.3284 7 14.5 7C13.6716 7 13 7.67157 13 8.5C13 9.32843 13.6716 10 14.5 10ZM18.5 13C19.3284 13 20 12.3284 20 11.5C20 10.6716 19.3284 10 18.5 10C17.6716 10 17 10.6716 17 11.5C17 12.3284 17.6716 13 18.5 13ZM6.00001 9H4.00001V11H6.00001V13H8.00001V11H10V9H8.00001V7H6.00001V9Z' fill='currentColor'%3E%3C/path%3E%3C/svg%3E");
  `;

  export const Travel = styled.div`
    ${iconStyle};
    
    mask-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' aria-hidden='false' viewBox='0 0 24 24'%3E%3Cpath d='M22 17H19.725C19.892 16.529 20 16.029 20 15.5C20 13.015 17.985 11 15.5 11H13.5L12.276 8.553C12.107 8.214 11.761 8 11.382 8H7C6.448 8 6 8.447 6 9V11.051C3.753 11.302 2 13.186 2 15.5C2 17.986 4.015 20 6.5 20H15.5C16.563 20 17.527 19.616 18.297 19H22V17ZM6.5 16.75C5.81 16.75 5.25 16.19 5.25 15.5C5.25 14.81 5.81 14.25 6.5 14.25C7.19 14.25 7.75 14.81 7.75 15.5C7.75 16.19 7.19 16.75 6.5 16.75ZM11.5 16.75C10.81 16.75 10.25 16.19 10.25 15.5C10.25 14.81 10.81 14.25 11.5 14.25C12.19 14.25 12.75 14.81 12.75 15.5C12.75 16.19 12.19 16.75 11.5 16.75ZM16.5 16.75C15.81 16.75 15.25 16.19 15.25 15.5C15.25 14.81 15.81 14.25 16.5 14.25C17.19 14.25 17.75 14.81 17.75 15.5C17.75 16.19 17.19 16.75 16.5 16.75Z' fill='currentColor'%3E%3C/path%3E%3Cpath d='M8 7H10C10 5.346 8.654 4 7 4H6V6H7C7.551 6 8 6.449 8 7Z' fill='currentColor'%3E%3C/path%3E%3C/svg%3E");
  `;

  export const Objects = styled.div`
    ${iconStyle};
    
    mask-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' aria-hidden='false' viewBox='0 0 24 24'%3E%3Cpath d='M18 5.999H17V4.999C17 4.448 16.553 3.999 16 3.999H4C3.447 3.999 3 4.448 3 4.999V12.999C3 14.488 3.47 15.865 4.265 16.999H15.722C16.335 16.122 16.761 15.105 16.92 13.999H18C20.205 13.999 22 12.205 22 9.999C22 7.794 20.205 5.999 18 5.999V5.999ZM18 12H17V8H18C19.104 8 20 8.897 20 10C20 11.102 19.104 12 18 12Z' fill='currentColor'%3E%3C/path%3E%3Cpath d='M2 18H18V20H2V18Z' fill='currentColor'%3E%3C/path%3E%3C/svg%3E");
  `;

  export const Symbols = styled.div`
    ${iconStyle};
    
    mask-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' aria-hidden='false' viewBox='0 0 24 24'%3E%3Cpath d='M16 4.001C14.406 4.001 12.93 4.838 12 6.081C11.07 4.838 9.594 4.001 8 4.001C5.243 4.001 3 6.244 3 9.001C3 14.492 11.124 19.633 11.471 19.849C11.633 19.95 11.817 20.001 12 20.001C12.183 20.001 12.367 19.95 12.529 19.849C12.876 19.633 21 14.492 21 9.001C21 6.244 18.757 4.001 16 4.001V4.001Z' fill='currentColor'%3E%3C/path%3E%3C/svg%3E");
  `;

  export const Flags = styled.div`
    ${iconStyle};
    
    mask-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' aria-hidden='false' viewBox='0 0 24 24'%3E%3Cpath d='M20 6.002H14V3.002C14 2.45 13.553 2.002 13 2.002H4C3.447 2.002 3 2.45 3 3.002V22.002H5V14.002H10.586L8.293 16.295C8.007 16.581 7.922 17.011 8.076 17.385C8.23 17.759 8.596 18.002 9 18.002H20C20.553 18.002 21 17.554 21 17.002V7.002C21 6.45 20.553 6.002 20 6.002Z' fill='currentColor'%3E%3C/path%3E%3C/svg%3E");
  `;

  export const mapped = {
    people: People,
    nature: Nature,
    food: Food,
    activity: Activity,
    travel: Travel,
    objects: Objects,
    symbols: Symbols,
    flags: Flags,
  }
}
