import styled from '@lib/emotion'

export const Root = styled('header')`
  overflow: hidden;
  display: flex;
  flex-shrink: 0;
  height: 47px;
  line-height: 28px;
  padding: 10px 11px;
  border-right: 1px solid rgba(0, 0, 0, 0.2);
  box-shadow: 0 1px 0 rgba(0, 0, 0, 0.2), 0 2px 0 rgba(0, 0, 0, 0.06);
`

interface Props {
  backgroundImage: string
}
export const BannerRoot = styled(Root)<Props>`
  ${({theme}) => theme.singleChannel ? null : 'height: 112px'};
  background-image: url(${({ backgroundImage }) => backgroundImage});
  background-size: cover;
  background-position: center;
`

export const Icon = styled('img')`
  height: 26px;
  width: 26px;
  flex-shrink: 0;
  border-radius: 50%;
  transition: border-radius 0.6s ease;

  &:hover {
    border-radius: 30%;
  }
`


export const Acronym = styled.span`
  height: 26px;
  width: 26px;
  border-radius: 50%;
  transition: border-radius 0.6s ease;
  background-color: rgba(255,255,255,.1);
  font-size: .95em;
  text-align: center;

  &:hover {
    border-radius: 30%;
  }
`

export const Name = styled('h1')`
  font-family: var(--font-display);
  font-size: 15px;
  font-weight: 600;
  margin: 0 15px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  flex-grow: 1;
`

export const BannerName = styled(Name)`
  filter: drop-shadow(0 1px 1px rgba(0,0,0,.8))
`

export const Count = styled('div')`
  flex-shrink: 0;
  font-size: 10px;
  background: ${({ theme }) => theme.colors._accent.fade(0.6).string()};
  margin: 4px 0;
  line-height: 20px;
  padding: 0 6px;
  border-radius: 50px;
  font-weight: 500;
  user-select: none;
  min-width: 25px;
  text-align: center;
  height: 19px
`
