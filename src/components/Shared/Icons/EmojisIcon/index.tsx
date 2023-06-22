import { EmojisIconRoot } from '@components/Shared/Icons/Buttons/IconButtonWrapper/elements';
import { useState } from 'react';

export const EmojisIcon = () => {
  const [currentEmojiPos, setCurrentEmojiPos] = useState({ x: '-22px', y: '0px' });
  const getRandEmoji = () => {
    const emojiSize = 22;

    // ! COLUMN = X pos
    const emojiColumns = 11;
    // ! ROW = Y pos
    const emojiRows = 5;
    const emojisInLastRow = 5;

    // The first column X is -22
    const randRow = Math.floor(Math.random() * emojiRows);
    const newEmojiY = randRow * emojiSize * -1;

    const isLastRow = randRow === 4;

    const actualColumns = isLastRow ? emojisInLastRow : emojiColumns;
    const randCol = Math.floor(Math.random() * actualColumns);

    const newEmojiX = randCol * emojiSize * -1;

    setCurrentEmojiPos({ x: `${newEmojiX}px`, y: `${newEmojiY}px` });
  };
  return <EmojisIconRoot onMouseOver={getRandEmoji} css={{ '--emoji-x': currentEmojiPos.x, '--emoji-y': currentEmojiPos.y }} />;
};
