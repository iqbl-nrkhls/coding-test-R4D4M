import React from 'react'

const FilterColorsComponent = ({filters, setFilters}: {filters: string[]; setFilters: (filters: string[]) => void}) => {

  // intial addFilter function for adding filter item
  const addFilter = (filter: string) => {
    setFilters([...filters, filter]);
  }

  // intial deleteFilter function for delete filter item
  const deleteFilter = (filter: string) => {
    setFilters(filters.filter(item => item !== filter));
  }

  // onChange function for handle change event from checkbox element
  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.checked){
      // adding filter item
      addFilter(e.target.name)

    } else {
      // deleting filter item
      deleteFilter(e.target.name)
    }
  }

  // rendering with JSX format
  return (
    <div id="filter-form">
      <label className="label-filter">
        <input name="R" type="checkbox" onChange={onChange} />
        <span>{'Red > 50%'}</span>
      </label>

      <label className="label-filter">
        <input name="G" type="checkbox" onChange={onChange} />
        <span>{'Green > 50%'}</span>
      </label>

      <label className="label-filter">
        <input name="B" type="checkbox" onChange={onChange} />
        <span>{'Blue > 50%'}</span>
      </label>

      <label className="label-filter">
        <input name="S" type="checkbox" onChange={onChange} />
        <span>{'Saturation > 50%'}</span>
      </label>
    </div>
    )
}

export default FilterColorsComponent;