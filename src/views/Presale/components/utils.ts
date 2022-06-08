// eslint-disable-next-line
export const toNumericFormat = function (prefix: any, value: any) {
  let str = ''
  let num = 10 ** --prefix
  while (value / num < 1) {
    str += '0'
    num = 10 ** --prefix
    if (value === 0) {
      break
    }
  }
  str += value
  return str
}
