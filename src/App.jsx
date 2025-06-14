import React from 'react'
import { Stage, Layer, Rect, Text } from 'react-konva'
import './App.css'
import { Tile } from './classes/Tile'

function App() {
  const [count, setCount] = React.useState(0)
  const rec = React.useRef(null)
  const test = new Tile(100, 100, "B",5,false, "{0,0,0,0,0,0}")
  return (
    
    <><Stage width={600} height={600} >
      <Layer>
        <Rect  width={600} height={600} fill="lightblue"/>
      </Layer>
    <Layer>
      {test.render()}
      <Text text="Hello Canvas!" fontSize={20} x={50} y={50} />
      <Rect  draggable = {true} x={70} y={100} width={400} height={400} fill="lightgreen" />
    </Layer>
  </Stage></>
  )
}

export default App