import { useEffect, useMemo, useState } from 'react';
import { AutoSizer } from 'react-virtualized';
import { FixedSizeList as List } from 'react-window';
import { Root, Container, Sidebar, Content, EmojiDisplay, RowContainer } from './elements/emojipicker'
import { Twemoji } from '@ui/shared/Emoji/emoji'
import { defaultEmojis } from '@services/Emoji/defaultEmojis'
import _ from 'lodash'

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

  const [rowWidth, setRowWidth] = useState(9) // # of emojis in a row, 9 on desktop

  let rowCount: number

  const emojiCategories = useMemo(() => {
    const categories = defaultEmojis.reduce((obj, emoji) => ({
      ...obj,
      ...({ [emoji.category]: [...(obj[emoji.category] || []), emoji] })
    }), {});
    Object.keys(categories).forEach(category => categories[category] = _.chunk(categories[category], rowWidth))
    let index = 0
    Object.keys(categories).forEach(category => {
      categories[category] = [index, categories[category]]
      index += categories[category][1].length
      rowCount = index
    })
    return categories
  }, [defaultEmojis, rowWidth]) as Record<string, [number, any[][]]>

  console.log(emojiCategories)

  return (
    <Root className="emoji-picker" innerRef={ref => picker = ref}>
      <Container>
        <Sidebar>
          h
        </Sidebar>

        <Content>
          <AutoSizer>
            {({ width, height }) => {
              console.log(`width: ${width}, height: ${height}`)

              if (!width || !height) return null

              setRowWidth(Math.floor((width - 10) / 40))

              return <List
                width={width}
                height={height}
                itemSize={40}
                itemCount={rowCount}
              >
                {({ index, style }) => {
                  const [name, cat] = Object.entries(emojiCategories).reverse().find(c => c[1][0] <= index)
                  const emojis = cat[1][index - cat[0]]

                  return (
                    // @ts-expect-error
                    <RowContainer style={style}>
                      <EmojiDisplay>
                        {emojis.map(emoji => (
                          <EmojiDisplay onClick={() => onSelect(`:${emoji.keywords[0]}:`)}>
                            <Twemoji>{emoji.emoji}</Twemoji>
                          </EmojiDisplay>
                        ))}
                      </EmojiDisplay>
                    </RowContainer>
                  )
                }}
              </List>
            }}
          </AutoSizer>
        </Content>
      </Container>
    </Root>
  )
}

export default EmojiPicker
