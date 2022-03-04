import { TRGBHSLformat } from '../types'

// HEX validation
export const isHEXColor = (color: string) : boolean => {
  // checking hex color
  const result: boolean = (/^#[0-9a-f]{3}(?:[0-9a-f]{3})?$/i).test(color);

  return result;
}

// 3 character HEX validation
export const isHEX3Char = (color: string) : boolean => {
  // checking hex 3 character color
  const result: boolean = (/^#[0-9a-f]{3}?$/i).test(color);

  return result;
}

// convert 3 character to 6 character HEX
export const HEX3to6 = (color: string) : string => {
  // spliting and duplicating hex component
  const hex: string = color.slice(1).split('').map(item => item + item).join('');

  // merging hex component
  const result: string = `#${hex}`;

  return result;
}

// RGB validation
export const isRGBColor = (color: string) : boolean => {
  // checking rgb color
  const result: boolean = (/rgb\s?\((\s?([01]?[0-9]?[0-9]|2[0-4][0-9]|25[0-5])\s?,){2}([01]?[0-9]?[0-9]|2[0-4][0-9]|25[0-5])\)/i).test(color);

  return result;
}

// convert RGB to HEX
export const RGB2HEX = (color: string) : string => {
  // return empty if the color is not a rgb color
  if (!isRGBColor) return '';

  // initial result with hashtag
  let result: string = '#';

  // split rgb component
  const rgbComponent: string[] = color.split(/rgb\s?\(|\s?,\s?|\s?\)/);

  // convert each component to HEX
  for (let i = 1; i <= 3; i++) {
     const hex: string = Number(rgbComponent[i]).toString(16);
     if (hex.length === 1) {
       result += hex + hex;
     } else {
       result += hex;
     }
  }

  return result;
}

// convert HEX to RGB and HSL
export const HEX2RGBHSL = (hex: string): TRGBHSLformat => {
  // parsing rgb component
  const hexComponent = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);

  // set default return (if the color is not match or not valid)
  if (hexComponent === null) return { r:0, g:0, b:0, h:0, s:0, l:0 };

  // store each rgb component into variable
  const r = parseInt(hexComponent[1], 16);
  const g = parseInt(hexComponent[2], 16);
  const b = parseInt(hexComponent[3], 16);

  // find max and min of rgb component
  const max = Math.max(r/255, g/255, b/255)
  const min = Math.min(r/255, g/255, b/255);

  let h, s, l = (max + min) / 2;
  if (h === undefined) h = 0;

  // finding hsl format from rgb

  if(max === min){
    h = s = 0; // achromatic
  } else {
    const different = max - min;
    s = l > 0.5 ? different / (2 - max - min) : different / (max + min);
    switch(max) {
      case r: h = (g - b) / different + (g < b ? 6 : 0); break;
      case g: h = (b - r) / different + 2; break;
      case b: h = (r - g) / different + 4; break;
    }
    h /= 6;
  }

  h = Math.round(360 * h)
  s = s*100;
  s = Math.round(s);
  l = l*100;
  l = Math.round(l);

  return { r, g, b, h, s, l };
}