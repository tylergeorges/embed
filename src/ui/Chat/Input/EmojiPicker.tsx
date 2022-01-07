import { useEffect } from 'react';
import { Root } from './elements/emojipicker'

interface Props {
  close: () => void
  button: HTMLButtonElement
}

const EmojiPicker = ({ close, button }: Props) => {
  let picker:  HTMLDivElement
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (![picker, button].some(e => e.contains(event.target as Node))) close()
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [picker])
  
  return (
    <Root className="emoji-picker" innerRef={ref => picker = ref}>
      hello world
    </Root>
  )
}

export default EmojiPicker
