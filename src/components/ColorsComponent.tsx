import React from 'react'

import {
  TParsedColor,
  TParsedColors
} from '../types'

type TProps = {
  colors: TParsedColors;
  deleteColor: (id: number) => void;
  filters: string[];
}

type TState = {
  parsedColors: TParsedColor[];
}

// ColorsComponent using React Class Component
class ColorsComponent extends React.Component<TProps, TState> {
  // initialize constructor
  state: TState = {
    parsedColors: []
  };

  // manage color state
  static getDerivedStateFromProps = (props: TProps, state: TState) => {

    // filtering colors
    let parsedColors: TParsedColor[] = props.colors.colors.filter((color) => {
      if (props.filters.length === 0) return true

      let isAllowed: boolean = true;
      props.filters.forEach((filter) => {
        switch (filter) {
          case "R": if(color.r < 127) isAllowed = false; break;
          case "G": if(color.g < 127) isAllowed = false; break;
          case "B": if(color.b < 127) isAllowed = false; break;
          case "S": if(color.s < 50) isAllowed = false; break;
          default: break;
        }
      })
      return isAllowed;
    })

    // sorting colors
    parsedColors = parsedColors.sort((firstEl: TParsedColor, secondEl: TParsedColor) => {
      const differentR = (secondEl.r - firstEl.r);
      if (differentR !== 0) return differentR

      const differentG = (secondEl.g - firstEl.g);
      if (differentG !== 0) return differentG

      const differentB = (secondEl.b - firstEl.b);
      if (differentB !== 0) return differentB;

      const differentS = (secondEl.s - firstEl.s);
      return differentS;
    })

    return ({ parsedColors })
  }

  // add color to color box
  coloringPreview = () => {
    document.querySelectorAll<HTMLElement>('div[data-color]').forEach((element) => {
      const color: string | null = element.getAttribute('data-color');
      element.style.background = (color) ? color : '';
    })
  }

  // coloring when component mount
  componentDidMount = () => {
    this.coloringPreview()
  }

  // coloring when component update
  componentDidUpdate = () => {
    this.coloringPreview();
  }

  // handle input click
  onClick = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault();
    const id: number = Number(e.currentTarget.getAttribute('data-color-id'));
    const confirm: boolean = window.confirm('Are you sure you want to delete this color?');
    if (confirm) {
      this.props.deleteColor(id);
    }
  }

  render = () => {
    console.log(this);
    if (this.state.parsedColors !== []) {
      return (
        <div id="colors" className="flex flex-wrap">

          {this.state.parsedColors.map(item => (
            <div className="box" key={`${item.id}${item.hex}`} >
              <div className="preview" data-color={ item.hex } />

              <div className="info">
                <p className="color-name">{ item.name.toUpperCase() }</p>

                {(item.id !== 0) ?
                  <button
                    className="btn-delete"
                    data-color-id={item.id}
                    onClick={this.onClick}
                    title="delete"
                  >x</button>
                : null}


              </div>

            </div>
          ))}

        </div>
      );
    }
    return <p>Loading</p>;
  }
}

export default ColorsComponent;