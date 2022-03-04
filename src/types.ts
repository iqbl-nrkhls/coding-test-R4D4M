// type for color
export type TColor = {
  id: number;
  name: string;
  hex: string;
}

export type TRGBSformat = {
  r: number;
  g: number;
  b: number;
  s: number;
}

export type TRGBHSLformat = TRGBSformat & {
  h: number;
  l: number;
}

export type TParsedColor = TColor & TRGBSformat;

export type TParsedColors = {
  colors: TParsedColor[];
}