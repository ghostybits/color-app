function rgbToHex (rgb) {
  var hex = Number(rgb).toString(16);
  if (hex.length < 2) {
    hex = `0${hex}`
  }
  return hex;
};


/**
 * Converts an HSL color value to Color Object. Conversion formula
 * adapted from http://en.wikipedia.org/wiki/HSL_color_space.
 *
 * @param   {h}            [0 - 360]
 * @param   {s}            [0 - 100]
 * @param   {l}            [0 - 100]
 * @return  {hex}          A hex color code
 */
export function hslToHex(h: number, s: number, l: number): string {
  let hue = h / 360
  let saturation = s / 100
  let lightness = l / 100

  let red, green, blue;

  if (saturation == 0) {
    red = green = blue = lightness; // achromatic
  } else {
    var hue2rgb = function hue2rgb(p, q, t) {
      if (t < 0) t += 1;
      if (t > 1) t -= 1;
      if (t < 1 / 6) return p + (q - p) * 6 * t;
      if (t < 1 / 2) return q;
      if (t < 2 / 3) return p + (q - p) * (2 / 3 - t) * 6;
      return p;
    }

    var q = lightness < 0.5 ? lightness * (1 + saturation) : lightness + saturation - lightness * saturation;
    var p = 2 * lightness - q;
    red = Math.round(hue2rgb(p, q, hue + 1 / 3) * 255)
    green = Math.round(hue2rgb(p, q, hue) * 255)
    blue = Math.round(hue2rgb(p, q, hue - 1 / 3) * 255)
  }

    return `#${rgbToHex(red)}${rgbToHex(green)}${rgbToHex(blue)}`
}