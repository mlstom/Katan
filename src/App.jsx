import React from 'react'
import { useRef, useState } from 'react';
import { Stage, Layer, Rect, Text } from 'react-konva'
import './App.css'
import { Mapa } from './classes/Mapa';
import ImageComponent from './components/ImageComponent';


function App() {
  const layerRef = useRef(null);

  const handleWheel = (e) => {
    e.evt.preventDefault();

    const scaleBy = 1.05;
    const layer = layerRef.current;
    const oldScale = layer.scaleX();
    const pointer = layer.getStage().getPointerPosition();

    const mousePointTo = {
      x: (pointer.x - layer.x()) / oldScale,
      y: (pointer.y - layer.y()) / oldScale,
    };

    const direction = e.evt.deltaY > 0 ? 1 : -1;
    const newScale = direction > 0 ? oldScale / scaleBy : oldScale * scaleBy;

    layer.scale({ x: newScale, y: newScale });

    const newPos = {
      x: pointer.x - mousePointTo.x * newScale,
      y: pointer.y - mousePointTo.y * newScale,
    };

    layer.position(newPos);
    layer.batchDraw();
  };

  const mapa = new Mapa(1);
  return (

    <div className="canvas-container" ><Stage width={600} height={600} onWheel={handleWheel}>
      <Layer>
        <Rect width={600} height={600} fill="#3674B5" draggable={false} />
      </Layer>

      <Layer ref={layerRef} draggable >
        <ImageComponent
          src={`src/assets/tlo5.png`} // lokalni path, mora da bude validan
          x={150}
          y={180}
          width={300}
          height={260}
        />
        {mapa.draw()}

      </Layer>


    </Stage></div>
  )
}

export default App