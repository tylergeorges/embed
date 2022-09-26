import * as React from 'react'

import { Burger, Ham } from './elements'

interface Props {
  onClick?: React.MouseEventHandler
  open?: boolean
  thread?: boolean
  pointRight?: boolean
}

const Hamburger = ({ onClick, open = false, thread = false, pointRight = false }: Props) => (
  <Ham
    open={open}
    thread={thread}
    pointRight={pointRight}
    onClick={onClick ? onClick.bind(this) : null}
    className="hamburger"
  >
    <Burger />
  </Ham>
)

export default Hamburger
