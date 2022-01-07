import { useEffect } from 'react';
import { Root, Container, Sidebar } from './elements/emojipicker'

interface Props {
  button: HTMLButtonElement
  close: () => void
  onSelect: (emoji: string) => void
}

const EmojiPicker = ({ button, close, onSelect }: Props) => {
  let picker: HTMLDivElement
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (![picker, button].some(e => e?.contains(event.target as Node))) close();
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [picker])

  return (
    <Root className="emoji-picker" innerRef={ref => picker = ref}>
      <Container>
        <Sidebar>
          h
        </Sidebar>

        <p onClick={() => onSelect('test')}>Hello world</p>
      </Container>
    </Root>
  )
}

export default EmojiPicker
