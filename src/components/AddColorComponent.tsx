import React from 'react'

import {
  isHEXColor,
  isHEX3Char,
  HEX3to6,
  isRGBColor,
  RGB2HEX
} from '../helpers/colorHelper'


// React function component
const AddColorComponent = ({addColor} : { addColor: (hex: string, name: string) => void }) => {
  // initial color and setColor
  const [color, setColor] = React.useState<string>("");

  // onChange function for handle change event for input element
  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    // delete whitespace from input value
    const trimedColor = e.target.value.trim()

    // set trimed input value into state
    setColor(trimedColor);
  }

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    // disable form action
    e.preventDefault();

    // if input is empty
    if (!color) {
      // notif user that the input is empty
      alert('Please enter a color');

    } else {
      // if using HEX color
      if (isHEXColor(color)) {

        // if using 3 character HEX color
        if (isHEX3Char(color)) {
          // adding color after converted 3 char HEX color to 6 char HEX color
          addColor(HEX3to6(color), color);
        } else {
          // adding color
          addColor(color, color);
        }

        // reset input value
        setColor('');

      // if using hex color
      } else if (isRGBColor(color)) {
        // adding color after converted RGB to HEX
        addColor(RGB2HEX(color), color);

        // reset input value
        setColor('');

      // if the input not match any color format
      } else {
        // notif user that the entered color is invalid
        alert('Please enter a valid color HEX or RGB (pay attention for the space)');
      }
    }
  };

  // rendering with JSX format
  return (
    <div id="add-form">
      <form onSubmit={onSubmit}>

        <label className="label-input">
          <b>Add new color: </b>
          <input
          type="text"
            value={color}
            onChange={onChange} />
        </label>

        <button type="submit" className="btn-add">Add</button>
      </form>
    </div>
  );
};

export default AddColorComponent;