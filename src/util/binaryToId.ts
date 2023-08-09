// https://github.com/discordjs/discord.js/blob/master/src/util/Util.js#L498
export function binaryToId(str: string) {
  let dec = '';

  while (str.length > 50) {
    const high = parseInt(str.slice(0, -32), 2);
    const low = parseInt((high % 10).toString(2) + str.slice(-32), 2);

    dec = (low % 10).toString() + dec;
    str =
      Math.floor(high / 10).toString(2) +
      Math.floor(low / 10)
        .toString(2)
        .padStart(32, '0');
  }

  let num = parseInt(str, 2);
  while (num > 0) {
    dec = (num % 10).toString() + dec;
    num = Math.floor(num / 10);
  }

  return dec;
}
