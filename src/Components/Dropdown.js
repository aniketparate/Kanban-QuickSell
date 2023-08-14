import React, { useEffect } from 'react'
import './Dropdown.css'
import localForage from "localforage";
export default function Dropdown({ value, List, name ,setfunc}) {
  const changeHandler = (x) => {
    setfunc(x);
    localForage.setItem(name, x);
  };

  useEffect(() => {
    localForage.getItem(name).then(x => changeHandler(x));
  }, []);

  return (
    <div >
      <label style = {{color: 'gray'}} for="List">{name}:</label>
      <select className = 'menu' name={name} value={value} onChange={(x) => changeHandler(x.target.value)}>
        {List.map(x => (
          <option value={x} key={x}>{x}</option>
        ))
        }
      </select>
    </div>
  )
}

