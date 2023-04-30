import React, { useCallback } from 'react'

function MyChild(props: any,) {

    const handleInputChange = useCallback((ev:any)=>props.onNameChange(ev.target.value), [props.onNameChange])
  
  return (
    <div>
      <input type="text" onChange={handleInputChange} value={props.name} />
      <div>The name is: {props.name}</div>
    </div>
  )
}

export default MyChild