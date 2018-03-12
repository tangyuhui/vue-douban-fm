/**
 * Created by tangyuhui on 2018/3/7.
 */
/*! COPY from https://raw.githubusercontent.com/viljamis/feature.js/master/feature.js
 * FEATURE.JS 1.0.1, A Fast, simple and lightweight browser feature
 * detection library in just 1kb.
 *
 * http://featurejs.com
 *
 * CSS 3D Transform, CSS Transform, CSS Transition, Canvas, SVG,
 * addEventListener, querySelectorAll, matchMedia, classList API,
 * placeholder, localStorage, History API, Viewport Units, REM Units,
 * CORS, WebGL, Service Worker, Context Menu, Geolocation,
 * Device Motion, Device Orientation, Touch, Async, Defer,
 * Srcset, Sizes & Picture Element.
 *
 *
 * USAGE EXAMPLE:
 * if (feature.webGL) {
 *   console.log("webGL supported!");
 * }
 *
 * Author: @viljamis, https://viljamis.com
 */

/**
 * Function that takes a standard CSS property name as a parameter and
 * returns it's prefixed version valid for current browser it runs in
 */

const pfx = (function () {
  let style = document.createElement("dummy").style,
    prefixes = ["Webkit", "Moz", "O", "ms"],
    memory = {}

  return function (prop) {
    if (typeof memory[prop] === "undefined") {
      var ucProp = prop.charAt(0).toUpperCase() + prop.substr(1),
        props = (prop + " " + prefixes.join(ucProp + " ") + ucProp).split(" ")
      memory[prop] = null
      for (var i in props) {
        if (style[props[i]] !== undefined) {
          memory[prop] = props[i]
          break
        }
      }
    }
    return memory[prop]
  }
})()

export const transformPrefix = pfx('transform')
export const supportTransform = (transformPrefix !== null)
export const support3dTransform = (pfx('perspective') !== null)


