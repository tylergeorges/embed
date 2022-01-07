import { Fragment, useEffect, useMemo } from 'react';
import { Root, Container, Sidebar, Content } from './elements/emojipicker'
import { Twemoji } from '@ui/shared/Emoji/emoji'
import { defaultEmojis } from '@services/Emoji/defaultEmojis'

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

  const emojiCategories = useMemo(() => {
    return defaultEmojis.reduce((obj, emoji) => ({
      ...obj,
      ...({ [emoji.category]: [...(obj[emoji.category] || []), emoji] })
    }), {});
  }, [defaultEmojis]);

  return (
    <Root className="emoji-picker" innerRef={ref => picker = ref}>
      <Container>
        <Sidebar>
          h
        </Sidebar>

        <Content>
          {Object.entries(emojiCategories).map(([categoryName, emojis]) =>
            <>
              <p>{categoryName}</p>

              <div>
                {(emojis as any[]).map(eData =>
                <span onClick={() => onSelect(`:${eData.keywords[0]}:`)}>
                  <Twemoji>{eData.emoji}</Twemoji>
                </span>
                )}
              </div>
            </>
          )}
        </Content>
      </Container>
    </Root>
  )
}

export default EmojiPicker
