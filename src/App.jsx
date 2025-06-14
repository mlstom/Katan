import React from 'react'
import { Stage, Layer, Rect, Text } from 'react-konva';
import './App.css'


function App() {
  const [count, setCount] = React.useState(0)

  return (
    
<<<<<<< HEAD
    <><Stage width={600} height={600} >
      <Layer>
        <Rect  width={600} height={600} fill="lightblue"/>
      </Layer>
=======
    <><Stage width={900} height={900} >
>>>>>>> a935f9be847f52118eab167118e436353345bce3
    <Layer>
      <Text text="Hello Canvas!" fontSize={20} x={50} y={50} />
      <Rect  draggable = {true} x={70} y={100} width={400} height={400} fill="lightgreen" />
    </Layer>
  </Stage></>
  )
}

export default App