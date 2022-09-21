import styled  from "@lib/emotion";


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


export const MembersTitle = styled.p`
  color: ${({ theme }) => theme.colors._primary.fade(0.34).string()};
  text-transform: capitalize;
  margin-bottom: 0.5rem;
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
