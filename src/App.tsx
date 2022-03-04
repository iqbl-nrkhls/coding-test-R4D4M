import React from 'react'

import './App.scss'

import {
  TRGBSformat,
  TParsedColor,
  TParsedColors
} from './types'

import { HEX2RGBHSL } from './helpers/colorHelper'

import AddColorComponent from './components/AddColorComponent'
import FilterColorsComponent from './components/FilterColorsComponent'
import ColorsComponent from './components/ColorsComponent'

// an initialColors
const initialHex: string[] = ['#1ABC9C','#2ECC71','#3498DB','#9B59B6','#34495E','#16A085','#27AE60','#2980B9','#8E44AD','#2C3E50','#F1C40F','#E67E22','#E74C3C','#ECF0F1','#95A5A6','#F39C12','#D35400','#C0392B','#BDC3C7','#7F8C8D'];

// an intiaial parsed colors
const initialParsedColors: TParsedColor[] = initialHex.map((color) => {
  const parsedColor: TRGBSformat = HEX2RGBHSL(color);
  return {
    id   : 0,
    name : color,
    hex  : color,
    r    : parsedColor.r,
    g    : parsedColor.g,
    b    : parsedColor.b,
    s    : parsedColor.s
  }
})

// React function component
const App: React.FC = () => {
  // describe a savedColors
  let savedColors: TParsedColors;

  // get colors item from localStorage
  const localColors: string | null = localStorage.getItem('colors');

  // parsing color if not empty
  if (localColors !== null) {
    savedColors = JSON.parse(localColors);
  } else {
    savedColors = {colors: []};
  }
  
  // initial colors and setColors
  const [colors, setColors] = React.useState<TParsedColors>(savedColors);

  // initial filters and setFilters
  const [filters, setFilters] = React.useState<string[]>([]);

  // merge initial colors and saved colors from localStorage
  const displayColors: TParsedColors = {
    colors: colors.colors.concat(initialParsedColors)
  };

  // addColor function for adding color with HEX format
  const addColor = (hex: string, name: string) => {
    // parsing color from HEX to RGB & S format
    const parsedColor: TRGBSformat = HEX2RGBHSL(hex);

    // the result of colors after adding new color
    const result: TParsedColors = {
      colors: [
        {
          id   : Math.floor(Math.random() * 1000),
          hex  : hex,
          name : name.toUpperCase(),
          r    : parsedColor.r,
          g    : parsedColor.g,
          b    : parsedColor.b,
          s    : parsedColor.s
        },
        ...colors.colors
      ] 
    };

    // save colors into localStorage
    localStorage.setItem('colors', JSON.stringify(result));

    // save colors into state
    setColors(result);
  }

  const deleteColor = (id: number) => {
    // result of colors after deletign color
    const result: TParsedColors = {
      colors: colors.colors.filter(color => color.id !== id)
    };

    // save colors into localStorage
    localStorage.setItem('colors', JSON.stringify(result));

    // save color into state
    setColors(result);
  }

  // rendering with JSX format
  return (
    <div id="App">
      <div className="container">
        <AddColorComponent addColor={addColor}/>
        <FilterColorsComponent
          filters={filters}
          setFilters={setFilters} />
        <ColorsComponent
          filters={filters}
          colors={displayColors} 
          deleteColor={deleteColor} />
      </div>
    </div>
  )
}

export default App