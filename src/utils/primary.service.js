/* eslint no-param-reassign: 0 */

/**
 * Change the element location.
 * @param { Object } el Element object,
 * @param { Number } from Start location.
 * @param { Number } to End location.
 * @param { Number } duration Animation time.
 */
function scrollTop(el, from = 0, to, duration = 500) {
  if (!window.requestAnimationFrame) {
    window.requestAnimationFrame =
      window.webkitRequestAnimationFrame ||
      window.mozRequestAnimationFrame ||
      window.msRequestAnimationFrame ||
      (cb => {
        window.setTimeout(cb, 1000 / 60)
      })
  }
  const _difference = Math.abs(from - to)
  const _step = Math.ceil((_difference / duration) * 50)

  function scroll(start, end, step) {
    if (start === end) return

    let d = start + step > end ? end : start + step
    if (start > end) {
      d = start - step < end ? end : start - step
    }

    if (el === window) {
      window.scrollTo(d, d)
    } else {
      el.scrollTop = d
    }
    window.requestAnimationFrame(() => scroll(d, end, step))
  }
  scroll(from, to, _step)
}

let transferIndex = 0
function transferIncrease() {
  transferIndex++
}

export default {
  scrollTop,
  transferIndex,
  transferIncrease
}
