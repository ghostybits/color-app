export type HSL = {
  hue: number,
  saturation: number,
  luminance: number
}

export type Color = HSL & {
  id: number,
  hex: string,
}

export type ExtendedColor = Color & {
  shades: Color[]
}