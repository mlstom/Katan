import React from 'react'
import { Stage, Layer, Rect, Text } from 'react-konva';
import './App.css'
import { Polje } from './classes/Polje';

function App() {
  const mapaRef = React.useRef(null);
  const polje = new Polje(10, 10, 10, 10, 10, 10);


  return (

    <><Stage width={600} height={600} >
      <Layer>
        <Rect width={600} height={600} fill="lightblue" />
      </Layer>
      <Layer >
        {polje.render()}
      </Layer>

      <Layer>
        <Text text="Hello Canvas!" fontSize={20} x={50} y={50} />
        <Rect draggable={true} x={70} y={100} width={400} height={400} fill="lightgreen" />
      </Layer>
    </Stage></>
  )
}

export default App