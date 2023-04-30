
import React, { useState } from 'react'
import MyChild from './myChild'

function MyContainer() {
  const [name, setName] = useState('foo')

  return (
    <MyChild name={name} onNameChange={setName} />
  )
}

export default MyContainer;