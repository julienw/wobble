const re = /(\d*)([a-z])/ig;
export default function develop(str) {
  let parsed;
  let result = '';
  while ((parsed = re.exec(str)) !== null) {
    const [, count, letter] = parsed;
    result += letter.repeat(count);
  }

  return result;
}
