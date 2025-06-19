import React from 'react'
import { useRef, useState, useMemo } from 'react';
import { Stage, Layer, Rect, Text, Line } from 'react-konva'
import './App.css'
import { Igrac } from './classes/Igrac';
import { Game } from './classes/Game';



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


  const game = useMemo(() => {
    const g = new Game();

    g.dodajIgraca(new Igrac('milos', 'blue'));
    g.dodajIgraca(new Igrac('jovan', 'red'));
    return g;
  }, []);

  const [_, forceUpdate] = useState(0);
  const refresh = () => forceUpdate(u => u + 1);

  const handlePoljeClick = (polje) => {

      game.postaviKucicu(polje);
    
    // Zavolji update i rerender
    forceUpdate(u => u + 1);
  };
  const [mode, setMode] = useState('normal');

  const handleZavrsi = () => {
    game.zavrsiPotez();
    forceUpdate(u => u + 1);
  };

  const veze = [
    [0, 3], [0, 4],
    [1, 4], [1, 5],
    [2, 5], [2, 6],
    [3, 7],
    [4, 8],
    [5, 9],
    [6, 10],
    [7, 11], [7, 12],
    [8, 12], [8, 13],
    [9, 13], [9, 14],
    [10, 15], [10, 14],
    [11, 16],
    [12, 17],
    [13, 18],
    [14, 19],
    [15, 20],
    [16, 21], [16, 22],
    [17, 22], [17, 23],
    [18, 23], [18, 24],
    [19, 24], [19, 25],
    [20, 25], [20, 26],
    [21, 27],
    [22, 28],
    [23, 29],
    [24, 30],
    [25, 31],
    [26, 32],
    [27, 33],
    [28, 33], [28, 34],
    [29, 34], [29, 35],
    [30, 35], [30, 36],
    [31, 36], [31, 37],
    [32, 37],
    [33, 38],
    [34, 39],
    [35, 40],
    [36, 41],
    [37, 42],
    [38, 43],
    [39, 43], [39, 44],
    [40, 44], [40, 45],
    [41, 45], [41,46],
    [42, 46],
    [43, 47],
    [44, 48],
    [45, 49],
    [46, 50],
    [47, 51],
    [48, 51], [48, 52],
    [49, 52], [49, 53],
    [50, 53]
  ];

  const freeEdges = () => {
    const zauzeteVeze = [];
  
    game.igraci.forEach(tr => {
      tr.putevi.forEach(put => {
        const id1 = put.polje1.id;
        const id2 = put.polje2.id;
        const key = [id1, id2].sort().join('-');
        zauzeteVeze.push(key);
      });
    });
  
    const zauzeteSet = new Set(zauzeteVeze);
  
    const slobodneVeze = [];
    
      for (let [a, b] of veze) {
        const key = [a, b].sort().join('-');
        if (!zauzeteSet.has(key)) {
          slobodneVeze.push([a, b]);
        }
      }
    
  
    return slobodneVeze;
  };

  const handleEdgeClick = (a,b) => {
    const p1 = game.mapa.nizPolja[a];
    const p2 = game.mapa.nizPolja[b];
    game.postaviPut(p1, p2);
    setMode('normal');
    refresh();
  };
  const overlayLines = mode === 'put'
    ? freeEdges().map((edge,i) => {
        const [a,b] = edge;
        const p1 = game.mapa.nizPolja[a];
        const p2 = game.mapa.nizPolja[b];
        return (
          <Line
            key={`overlay-${a}-${b}`}
            points={[p1.x, p1.y, p2.x, p2.y]}
            stroke="yellow"
            strokeWidth={4}
            onClick={() => handleEdgeClick(a,b)}
          />
        );
      })
    : null;


  return (

    <div className="canvas-container" >
      <Stage width={600} height={600} onWheel={handleWheel} className='more'>
        <Layer>
          <Rect width={600} height={600} fill="#5b6ee1" draggable={false} />
        </Layer>

        <Layer ref={layerRef} draggable x={160} y={100}>
          {game.draw(handlePoljeClick)}
          {overlayLines}
        </Layer>
      </Stage>
      
      <div className="controls">
        <button onClick={() => { setMode('put'); }}>
          Postavi put
        </button>
        <button onClick={() => { game.zavrsiPotez(); refresh(); }}>
          Završi potez (trenutni: {game.trenutniIgrac().id})
        </button>
      </div>
    </div>
  )
}

export default App