import { EmojisIconRoot, EmojisIconWrapper } from '@icons/Buttons/IconButtonWrapper/styles';
import { useState } from 'react';
import EmojisImage from '../../../../res/images/discordAssets/message-renderer-icons/button-icons/icon-emoji.png';

export const EmojisIcon = () => {
  // The first column/X value is at -11
  // The first row/Y value is at 0
  const [currentEmojiPos, setCurrentEmojiPos] = useState({ x: '-11px', y: '0px' });

  const getRandEmoji = () => {
    const emojiSize = -22;

    const emojiColumns = 11;
    const emojiRows = 5;
    const emojisInLastRow = 6;

    // First Y axis starts at 0 and decrements by factors of -22
    // so the '4th' row would be at -66
    const randRow = Math.floor(Math.random() * emojiRows);
    const newEmojiY = randRow * emojiSize;

    const isLastRow = randRow === 4;

    // The last row only has 6 emojis
    const actualColumns = isLastRow ? emojisInLastRow : emojiColumns;

    const randCol = Math.floor(Math.random() * actualColumns);

    // We subtract by 11 since the first column is at -11

    // For example, the '3rd' column would be at -55
    const newEmojiX = randCol * emojiSize - 11;

    setCurrentEmojiPos({ x: `${newEmojiX}px`, y: `${newEmojiY}px` });
  };

  return (
    <EmojisIconWrapper onMouseOver={getRandEmoji}>
      <EmojisIconRoot
        width={242}
        height={110}
        alt="Emojis Image"
        src={EmojisImage}
        // Used to  choose an emoji from the image which is an emoji grid
        css={{ '--emoji-x': currentEmojiPos.x, '--emoji-y': currentEmojiPos.y }}
      />
    </EmojisIconWrapper>
  );
};
