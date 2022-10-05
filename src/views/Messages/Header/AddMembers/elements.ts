import styled from '@lib/emotion'

interface AddMemberButtonProps {
    open: boolean
}
export const AddMemberButton = styled.svg<AddMemberButtonProps>`
    min-width: 24px;
    margin: auto 8px;
    cursor: pointer;

    path {
        color: ${({theme, open}) => theme.colors._primary.fade(open ? 0 : 0.335).string()};
    }

    &:hover path {
        color: ${({theme}) => theme.colors._primary.fade(0.17).string()};
    }
`

interface DisplayProps {
    right: number
}
export const Display = styled.div<DisplayProps>`
    background-color: ${({ theme }) => theme.colors.background};
    position: absolute;
    top: 40px;
    right: ${({right}) => right}px;
    width: 420px;
    overflow-y: auto;
    max-height: calc(100% - 80px);
    border-radius: 4px;
    display: flex;
    flex-direction: column;
    box-shadow: 0 0 0 1px rgba(4,4,5,0.15), 0 8px 16px rgba(0,0,0,0.24);
    max-width: 100%;

    @media (max-width: 800px) {
        right: 0;
    }
`

export const Title = styled.div`
    background-color: ${({ theme }) => theme.colors._background.darken(0.41).string()};
    padding: 16px;
    font-family: var(--font-display);
    font-weight: 600;
    box-shadow: 0 1px 0 rgba(4,4,5,0.2), 0 1.5px 0 rgba(6,6,7,0.05), 0 2px 0 rgba(4,4,5,0.05);
`

export const ListBase = styled.div`
  position: relative;

  display: flex;
  flex-direction: column;
  overflow: auto;
`

export const List = styled.div`
  flex-grow: 1;
  overflow: auto;
  gap: 2.5px;
  margin: 0 15px 0 15px;
  max-height: 75%;

  &::-webkit-scrollbar {
    width: 5px;
  }

  &::-webkit-scrollbar-thumb {
    background: ${({ theme }) => theme.colors._background.darken(0.5).string()};
    border-radius: 5px;
  }
`;

export const ActionsBase = styled.div`
  margin: 0 15px 15px 15px;
    
  button {
    width: 100%;    
  }
`;

export const Member = styled.div`
    display: flex;
    align-items: center;
    cursor: pointer;
    border-radius: 4px;
    padding: 8px;
`

export const NoMembers = styled.div`
    margin: 8px 0 16px 0;
    display: flex;
    flex-direction: column;
    align-items: center;

    span {
        margin-top: 20px;
        text-align: center;
    }
`;

export const SearchBase = styled.div`
  margin-bottom: 15px;
`;
