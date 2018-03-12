/**
 * Created by tangyuhui on 2018/3/7.
 */
import {
  transformPrefix
  , supportTransform
  , support3dTransform
} from '@/utils/feature-detect'

export function getScrollY () {
  return windowScrollY()
  // return window.scrollY || window.pageYOffset
}

export function addEventListener (node, event, listener) {
  if (node.addEventListener) {
    node.addEventListener(event, listener, false)
  } else {
    node.attachEvent(`on${event}`, listener)
  }
}

export function removeEventListener (node, event, listener) {
  if (node.removeEventListener) {
    node.removeEventListener(event, listener, false)
  } else {
    node.detachEvent(`on${event}`, listener)
  }
}
export var addEvent = (function (window) {
  var _eventCompat = function (event) {
    var type = event.type
    if (type == 'DOMMouseScroll' || type == 'mousewheel') {
      event.delta = (event.wheelDelta) ? event.wheelDelta / 120 : -(event.detail || 0) / 3
    }
    // alert(event.delta);
    if (event.srcElement && !event.target) {
      event.target = event.srcElement
    }
    if (!event.preventDefault && event.returnValue !== undefined) {
      event.preventDefault = function () {
        event.returnValue = false
      }
    }
    /*
     ......其他一些兼容性处理 */
    return event
  }
  if (window.addEventListener) {
    return function (el, type, fn, capture) {
      if (type === 'mousewheel' && document.mozFullScreen !== undefined) {
        type = 'DOMMouseScroll'
      }
      el.addEventListener(type, function (event) {
        fn.call(this, _eventCompat(event))
      }, capture || false)
    }
  } else if (window.attachEvent) {
    return function (el, type, fn, capture) {
      el.attachEvent('on' + type, function (event) {
        event = event || window.event
        fn.call(el, _eventCompat(event))
      })
    }
  }
  return function () {}
})(window)

export function windowScrollX () {
  return (window.pageXOffset !== undefined) ? window.pageXOffset
    : (document.documentElement || document.body.parentNode || document.body).scrollLeft
}

export function windowScrollY () {
  return (window.pageYOffset !== undefined) ? window.pageYOffset
    : (document.documentElement || document.body.parentNode || document.body).scrollTop
}

// events

// from perfectScrollbar
export function getDeltaFromEvent (e) {
  let deltaX = e.deltaX
  var deltaY = -1 * e.deltaY

  if (typeof deltaX === 'undefined' || typeof deltaY === 'undefined') {
    // OS X Safari
    deltaX = -1 * e.wheelDeltaX / 6
    deltaY = e.wheelDeltaY / 6
  }

  if (e.deltaMode && e.deltaMode === 1) {
    // Firefox in deltaMode 1: Line scrolling
    deltaX *= 20
    deltaY *= 20
  }

  if (deltaX !== deltaX && deltaY !== deltaY/* NaN checks */) {
    // IE in some mouse drivers
    deltaX = 0
    deltaY = e.wheelDelta
  }

  return -1 * deltaY
}

// css related
/**
 * @param  {number} x
 * @param  {number} y
 * @param  {number} z
 * @param  {number} scale
 * @return {object} prefixed-transform object
 */
export function transform (x, y, z = 0, scale = null) {
  if (!supportTransform) {
    return {}
  }
  let transtr

  if (support3dTransform) {
    transtr = `translate3d(${x}px, ${y}px, ${z})`
  } else {
    transtr = `translate(${x}px, ${y}px)`
  }

  if (scale) {
    transtr = transtr + ` scale(${scale})`
  }

  return { [transformPrefix]: transtr }
}
