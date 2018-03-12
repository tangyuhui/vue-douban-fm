/**
 * Created by tangyuhui on 2018/3/12.
 */
// utils functions
export function pad (n) {
  if (n < 10) {
    return '0' + n.toString()
  } else {
    return n.toString()
  }
}

export function formatTime (time) {
  if (!time) return ''
  let d = new Date(parseInt(time))
  let hours = d.getUTCHours()

  return (
    hours ? (pad(hours) + ':') : ''
  ) + pad(d.getUTCMinutes()) + ':' + pad(d.getUTCSeconds())
}
