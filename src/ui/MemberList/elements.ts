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
  padding: 0.3rem 0;
  align-items: center;
`;

export const Avatar = styled.img`
  border-radius: 50%;
  margin-right: 12px;
`
