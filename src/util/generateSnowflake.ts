/* eslint-disable no-plusplus */
import { binaryToId } from '@util/binaryToId';

const EPOCH = 1420070400000;
let INCREMENT = 0;

export function generateSnowflake() {
  const timestamp = Date.now();

  if (typeof timestamp !== 'number' || Number.isNaN(timestamp)) {
    throw new TypeError(
      `"timestamp" argument must be a number (received ${
        Number.isNaN(timestamp) ? 'NaN' : typeof timestamp
      })`
    );
  }

  if (INCREMENT >= 4095) INCREMENT = 0;

  const BINARY = `${(timestamp - EPOCH).toString(2).padStart(42, '0')}0000100000${(INCREMENT++)
    .toString(2)
    .padStart(12, '0')}`;

  return binaryToId(BINARY);
}
