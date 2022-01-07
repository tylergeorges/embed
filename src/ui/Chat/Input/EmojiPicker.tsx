import { useEffect, useMemo } from 'react';
import { AutoSizer, CellMeasurer, CellMeasurerCache, List } from 'react-virtualized';
import { Root, Container, Sidebar, Content, EmojiDisplay } from './elements/emojipicker'
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

  const cache = new CellMeasurerCache({
    defaultHeight: 60,
    fixedWidth: true
  });


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

              return <List
                deferredMeasurementCache={cache}
                width={width}
                height={height}
                rowHeight={cache.rowHeight}
                rowCount={Object.keys(emojiCategories).length}
                rowRenderer={({ index, key, parent, style }) => {
                  const category = Object.keys(emojiCategories)[index];
                  console.log(`rendering ${category}`)

                  const emojis = emojiCategories[category];
                  return (
                    <CellMeasurer
                      cache={cache}
                      columnIndex={0}
                      key={key}
                      overscanRowCount={1}
                      parent={parent}
                      rowIndex={index}
                    >
                      <div style={style}>
                        <EmojiDisplay>
                          {emojis.map(emoji => (
                            <EmojiDisplay onClick={() => onSelect(`:${emoji.keywords[0]}:`)}>
                              <Twemoji>{emoji.emoji}</Twemoji>
                            </EmojiDisplay>
                          ))}
                        </EmojiDisplay>
                      </div>
                    </CellMeasurer>


                  )
                }}
              />
            }}
          </AutoSizer>
        </Content>
      </Container>
    </Root>
  )
}

export default EmojiPicker
