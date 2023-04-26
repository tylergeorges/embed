import { Burger, Ham } from './elements'

interface Props {
  onClick?: React.MouseEventHandler
  open?: boolean
  thread?: boolean
}

const Hamburger = ({ onClick, open = false, thread = false }: Props) => (
  <Ham
    open={open}
    thread={thread}
    // @ts-ignore
    // eslint-disable-next-line react/jsx-no-bind
    onClick={onClick ? onClick.bind(this) : null}
    className='hamburger'
  >
    <Burger/>
  </Ham>
)

export default Hamburger