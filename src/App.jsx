import React from 'react'
import { Stage, Layer, Rect, Text } from 'react-konva';
import './App.css'

function App() {
  const [count, setCount] = React.useState(0)

  return (
    
    <><Stage width={400} height={400} >
    <Layer>
      <Text text="Hello Canvas!" fontSize={20} x={50} y={50} />
      <Rect  draggable = {true} x={70} y={100} width={400} height={400} fill="lightgreen" />
    </Layer>
  </Stage></>
  )
}

export default App