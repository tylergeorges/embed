import { store } from '@models';
import { observer } from 'mobx-react';
import { useState } from 'react'
import { EmojiButton } from './elements'

export default observer(() => {
  const [pos, setPos] = useState(null)
  const [hover, setHover] = useState(false)

  return (
    <EmojiButton
      style={{ backgroundPosition: pos }}
      onMouseEnter={() => {
        const x = Math.floor(Math.random() * 11)
        const y = Math.floor(Math.random() * (x <= 5 ? 5 : 4))
        setPos(`-${x * 22}px -${y * 22}px`)
        setHover(true)
      }}
      onMouseLeave={() => setHover(false)}
      onClick={() => store.modal.openEmojiPicker()}
      active={hover || store.modal.isOpen && store.modal.type === 'emojipicker'}
      className="emoji-button"
    ></EmojiButton>
  )
})
