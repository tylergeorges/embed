import styled from "react-emotion";

export const Base = styled.div`
  margin-top: 7px;
  margin-bottom: 17px;
  position: relative;
  border-top: 1px solid ${({theme}) => theme.colors._background.lighten(0.2).string()};
`;

export const Date = styled.div`
  position: absolute;
  left: 50%;
  transform: translateX(-50%) translateY(-60%);
  background-color: ${({theme}) => theme.colors.background};
  color: ${({theme}) => theme.colors._primary.darken(0.4).string()};
  padding: 2px 4px;
  font-weight: 600;
  font-size: 12px;
`;
