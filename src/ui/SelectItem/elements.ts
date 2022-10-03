import styled from '@lib/emotion'

interface IRoot {
  selected: boolean
}
export const Root = styled('button')<IRoot>`
  position: relative;
  text-decoration: none;
  user-select: none;
  cursor: ${({ selected }) => (selected ? 'default' : 'pointer')};
  display: flex;
  border-radius: 3px;
  flex-direction: row;
  font-size: 16px;
  font-weight: 500;
  height: 32px;
  line-height: 32px;
  width: calc(100% - 16px);
  margin: 2px 8px;
  padding: 0 8px;
  color: ${({ selected, theme }) =>
    selected
      ? `${theme.colors._primary.fade(0.1).string()} !important`
      : theme.colors._primary.fade(0.7).string()};

  @media (max-width: 400px), (max-height: 340px) {
    height: 28px;
    line-height: 28px;
    font-size: 14px;
  }
`
