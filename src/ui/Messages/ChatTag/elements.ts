import styled from "../ThemeContext";

export const VerifiedBot = styled.svg`
  vertical-align: top;
  width: 15px;
  height: 15px;
  margin-left: -.25rem;
`;

export const Tag = styled.span`
  margin-left: 6px;
  line-height: normal;
  font-size: 10px;
  font-weight: 500;
  text-transform: uppercase;
  height: fit-content;
  border-radius: 3px;
  padding: 1px 4px;
  align-self: center;
  white-space: nowrap;
  display: flex;
  align-items: center;

  background-color: ${({ theme }) => theme.colors.accent};
`;
