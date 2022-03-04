export {}

/*import React from 'react'

import {
  TColors,
  TFormatedColor
} from '../types'

import { HEX2RGBHSL } from '../helpers/colorHelper'

const ColorsComponent = ({colors, deleteColor, filters}:
    { colors: TColors; deleteColor: (id: number) => void; filters: string[]; }) => {

  React.useEffect(() => {
    document.querySelectorAll<HTMLElement>('div[data-color]').forEach((element) => {
      const color: string | null = element.getAttribute('data-color');
      element.style.background = (color) ? color : '';
    })
  })

  const clickHandler = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault();
    const id: number = Number(e.currentTarget.getAttribute('data-color-id'));
    const confirm: boolean = window.confirm('Are you sure you want to delete this color?');
    if (confirm) {
      deleteColor(id);
    }
  }

  let formatedColors: TFormatedColor[] = colors.colors.map(elm => {
    const rgbhsl = HEX2RGBHSL(elm.hex);
    return { ...elm, ...rgbhsl }
  })

  formatedColors = formatedColors.filter((color) => {
    if (filters.length === 0) return true

    let isBlocked: boolean = false;
    filters.forEach((filter) => {
      switch (filter) {
        case "R": if(color.r < 255/2) isBlocked = true; break;
        case "G": if(color.g < 255/2) isBlocked = true; break;
        case "B": if(color.b < 255/2) isBlocked = true; break;
        case "S": if(color.s < 50) isBlocked = true; break;
        default: break;
      }
    })
    return !isBlocked;
  })

  formatedColors.sort((firstEl: TFormatedColor, secondEl: TFormatedColor) => {
    const differentR = (secondEl.r - firstEl.r);
    if (differentR !== 0) return differentR

    const differentG = (secondEl.g - firstEl.g);
    if (differentG !== 0) return differentG

    const differentB = (secondEl.b - firstEl.b);
    if (differentB !== 0) return differentB;

    const differentS = (secondEl.s - firstEl.s);
    return differentS;
  })

  return (
    <div id="colors" className="flex flex-wrap">
      {formatedColors.map(item => (
        <div className="box" key={`${item.id}${item.hex}`} >
          <div className="preview" data-color={ item.hex } />
          <div className="flex">
             <p className="grow">{ item.name.toUpperCase() }</p>
             {(item.id !== 0) ? <button data-color-id={item.id} onClick={clickHandler}>x</button> : null}
          </div>
          <p>r: {item.r}</p>
          <p>g: {item.g}</p>
          <p>b: {item.b}</p>
          <p>s: {item.s}</p>
        </div>
      ))}
    </div>
  );
}

export default ColorsComponent;*/