import React from 'react'
import { useRef, useState, useMemo } from 'react';
import { Stage, Layer, Rect, Text, Line } from 'react-konva'
import '../Game.css'
import { Igrac } from '../classes/Igrac';
import { Game } from '../classes/Game';
import { DevKarta } from '../classes/DevKarta';
import  DiceRoller from '../components/DiceRoller';
const GameScreen = () => {
    const layerRef = useRef(null);
    const layerRef2 = useRef(null)

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
    const handleWheel1 = (e) => {
        e.evt.preventDefault();

        const layer = layerRef2.current;
     
        const newX = layer.x() - e.evt.deltaY;

        layer.x(newX);
        layer.batchDraw();

    };


    const game = useMemo(() => {
        const g = new Game();

        g.dodajIgraca(new Igrac('milos', { r: 255, b: 0, g: 0 }));
        g.dodajIgraca(new Igrac('jovan', { r: 0, b: 255, g: 0 }));
        let vrsta = 'vitez';
        for (let i = 0; i < 25; i++) {
            if (i == 14) vrsta = 'vpoen'
            if (i == 19) vrsta = 'monopol'
            if (i == 21) vrsta = 'putevi'
            if (i == 23) vrsta = 'resurs'
            g.dodajDevKartu(new DevKarta(i, `src/assets/${vrsta}karta.png`, vrsta, 0, 0))
        }

        g.sfuleDevKarte()
        return g;
    }, []);

    const [_, forceUpdate] = useState(0);
    const refresh = () => forceUpdate(u => u + 1);

    const handlePoljeClick = (polje) => {
        const igrac = game.trenutniIgrac();

        switch (mode) {
            case 'kucica':
                // Postavljaš kućicu samo na prazno polje
                if (polje.kuca == 0) {
                    polje.kuca = 1;
                    polje.vlasnik = igrac;
                    // ako želiš da vodiš evidenciju u klasi Igrac:
                    igrac.kucice.push(polje);
                }
                break;

            case 'grad':
                // Nadograđuješ samo kućicu koja pripada trenutnom igraču
                console.log(polje.id)
                if (polje.kuca == 1 && polje.vlasnik == igrac) {
                    polje.kuca = 2;
                    // vođenje liste gradova
                    igrac.gradovi = igrac.gradovi || [];
                    igrac.gradovi.push(polje);
                    // (po želji) ukloniš polje iz igrac.kucice:
                    igrac.kucice = igrac.kucice.filter(p => p.id !== polje.id);
                }
                break;

            default:
                // normal klik, ništa posebno
                break;
        }

        // posle svakog klika vraćamo mod na normal i rerenderujemo
        setMode('normal');
        refresh();
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
        [41, 45], [41, 46],
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

     const handleDiceResult = (dice1, dice2) => {
    console.log(`You rolled ${dice1} and ${dice2}`);
    // You can also set this in state and show it in UI
  };

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

    const handleEdgeClick = (a, b) => {
        const p1 = game.mapa.nizPolja[a];
        const p2 = game.mapa.nizPolja[b];
        game.postaviPut(p1, p2);
        setMode('normal');
        refresh();
    };
    const overlayLines = mode === 'put'
        ? freeEdges().map((edge, i) => {
            const [a, b] = edge;
            const p1 = game.mapa.nizPolja[a];
            const p2 = game.mapa.nizPolja[b];
            return (
                <Line
                    key={`overlay-${a}-${b}`}
                    points={[p1.x, p1.y, p2.x, p2.y]}
                    stroke="yellow"
                    strokeWidth={4}
                    onClick={() => handleEdgeClick(a, b)}
                />
            );
        })
        : null;

    const izvuciKartuRazvoja = () => {
        if (game.devIndex >= game.devKarte.length) {
            return null; // nema više karata
        }
        const karta = game.devKarte[game.devIndex++];
        karta.izvucena = true;
        game.trenutniIgrac().devKarte.push(karta)
        refresh()
    }



    return (

        <div className="canvas-container" >
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }} >
                <Stage width={500} height={500} onWheel={handleWheel} className='more'>
                    <Layer>
                        <Rect width={500} height={500} fill="#5b6ee1" draggable={false} />
                    </Layer>

                    <Layer ref={layerRef} draggable x={100} y={60}>

                        {game.draw(handlePoljeClick, overlayLines)}

                    </Layer>
                </Stage>
                <DiceRoller onRoll={handleDiceResult}/>
                <div className="controls">
                    <p>Trenutni mod: {mode}</p>
                    <button onClick={() => { setMode('put'); }}>
                        Postavi put
                    </button>
                    <button onClick={() => { setMode('kucica'); }}>
                        Postavi kucicu
                    </button>
                    <button onClick={() => { setMode('grad'); }}>
                        Postavi grad
                    </button>
                    <button onClick={() => { setMode('normal'); }}>
                        Vrati na normal
                    </button>
                    <button onClick={() => { izvuciKartuRazvoja() }}>
                        Dodaj dev kartu trenutnom igracu, trenutni broj dev karata: {game.brojDevKarataKojiNisuIzvucene()}
                    </button>
                    <button onClick={() => { game.zavrsiPotez(); refresh(); }}>
                        Završi potez (trenutni: {game.trenutniIgrac().id})
                    </button>
                </div>
            </div>
            <Stage width={1000} height={150} onWheel={handleWheel1} className='border'>
                <Layer >
                    <Rect width={1000} height={150} fill="#A86523" draggable={false} />
                </Layer>
                <Layer ref={layerRef2}>
                    {game.drawKarte()}
                </Layer>
            </Stage>


        </div>
    )
}

export default GameScreen