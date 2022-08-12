import { Message_stickers } from "@generated";
import Tooltip from "rc-tooltip";
import StickerIcon from "@images/discordAssets/sticker-icon.svg";
import {
  LottieStickerWrapper,
  StickerTooltipBase, StickerTooltipIconBase
} from "@ui/Messages/Content/elements";
import Lottie from "@ui/Messages/Content/Sticker/Lottie";
import webpCheck from "@ui/shared/webpCheck";
import * as React from "react";

interface StickerProps {
  sticker: Message_stickers;
}

function Sticker(props: StickerProps) {
  return (
    <Tooltip
      overlay={
        <StickerTooltipBase>
          <StickerTooltipIconBase src={StickerIcon} alt="" /> {props.sticker.name}
        </StickerTooltipBase>
      }
      placement="top"
    >
      {props.sticker.formatType === 'LOTTIE'
        ? (
        <LottieStickerWrapper>
          <Lottie
            data={props.sticker.lottieData}
            width={160}
            height={160}
          />
        </LottieStickerWrapper>
        )
        : (
          <img
            height={160}
            width={160}
            style={{objectFit: 'contain'}}
            alt={props.sticker.name+' Sticker'}
            src={
              props.sticker.formatType === 'APNG'
                ? `https://cdn.discordapp.com/stickers/${props.sticker.id}.png`
                : webpCheck(`https://media.discordapp.net/stickers/${props.sticker.id}.webp?size=240`)
            }
            draggable={false}
          />
        )
      }
    </Tooltip>
  );
}

export default Sticker;
