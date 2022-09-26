import styled  from "@lib/emotion";
import focusable from "@ui/shared/focusable";


export const Root = styled('div')`
  position: absolute;
  z-index: 9;
  background-color: ${({ theme }) => theme.colors._background.darken(0.15).string()};
  width: 200px;
  height: 100%;
  flex-shrink: 0;
  transition: transform 0.3s ease;
  display: flex;
  flex-direction: column;
  will-change: transform;
  overflow: hidden;
  top: 0;
  right: 0;

  padding: 0.5rem 1rem;

  @media (max-width: 400px), (max-height: 340px) {
    width: 180px;
  }

  @media (max-width: 210px) {
    width: 150px;
  }

  @media (max-width: 170px) {
    width: 150px;
  }
`;

export const Close = styled('button')`
    @media screen and (max-width: 520px) {
        position: absolute;
        top: 20px;
        left: 0;
        height: 30px;
        width: 30px;
      
        background: ${({ theme }) =>
`url("data:image/svg+xml;charset=UTF-8,%3csvg xmlns='http://www.w3.org/2000/svg' fill='${encodeURIComponent(
  theme.colors.primary
)}' viewBox='0 0 44 44'%3e%3cpath d='M38.8 0L44 5.2 5.2 44 0 38.8 38.8 0z'/%3e%3cpath d='M5.2 0L44 38.8 38.8 44 0 5.2 5.2 0z'/%3e%3c/svg%3e")`};
        background-size: 40%;
        background-position: 50% 50%;
        background-repeat: no-repeat;
        opacity: 0.5;
      
        border: none;
        outline: none;
        cursor: pointer;
        transition: background-color 0.1s ease;

        &:hover,
        &:focus {
          background-color: ${({ theme }) =>
theme.colors._primary.fade(0.8).string()};
        }
      
        &,
        &::after {
          border-radius: 50%;
        }
      
        ${focusable};
    }
`;

export const MembersTitle = styled.p`
  color: ${({ theme }) => theme.colors._primary.fade(0.34).string()};
  text-transform: capitalize;
  margin-bottom: 0.5rem;

  @media screen and (max-width: 520px) {
    margin-left: 15px;
  }
`;

export const MemberCardBase = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  cursor: pointer;
`;

export const MemberBase = styled.div`
  display: flex;
  padding: 0.3rem 0;
  align-items: center;
`;

export const Avatar = styled.img`
  border-radius: 50%;
  margin-right: 12px;
`

interface RemoveButtonProps {
  pressed: boolean;
}

export const RemoveButtonBase = styled.svg<RemoveButtonProps>`
  cursor: pointer;
  
  path {
    color: ${({ pressed, theme }) => pressed ? `rgba(237, 66, 39, .9)` : theme.colors._primary.fade(.3).string()};
  }

  &:hover {
    path {
      color: ${({ pressed, theme }) => pressed ? `rgba(237, 66, 39, .6)` : theme.colors._primary.fade(.6).string()};
    }
  }
`
