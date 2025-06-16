import React from 'react'
import { Stage, Layer, Rect, Text } from 'react-konva'
import './App.css'
import { Polje } from './classes/Polje';
import { Tile } from './classes/Tile'
import { Port } from './classes/Port';



function App() {
  const [count, setCount] = React.useState(0)
  const rec = React.useRef(null)
  
  let port0 = new Port("luka3u10",1)
  let port1 = new Port("luka3u11",1)
  let port2 = new Port("luka3u12",1)
  let port3 = new Port("luka3u13",1)
  let port4 = new Port("lukadrvo",2)
  let port5 = new Port("lukaovca",3)
  let port6 = new Port("lukazito",4)
  let port7 = new Port("lukakamen",5)
  let port8 = new Port("lukacigla",6)

  //1- ima 3 prema 1 port 2-ima drvo port 3-ovca port 4-zito port 5-kamen port 6-cigla port
  let nizPolja=[];
  let x=0
  let y=0
  let ox=100
  let oy=75
  for (let i=0;i<54;i++){
    if(i==3){ 
      x=0
      ox=75
      oy=90
    }
    if(i==7){
      x=0
      ox=75
      oy=110
    }
    if(i==11){
      x=0
      ox=50
      oy=130
    }
    if(i==16){
      x=0
      ox=50
      oy=150
    }
    if(i==21){
      x=0
      ox=25
      oy=170
    }
    if(i==27){
      x=0
      ox=25
      oy=190
    }
    if(i==33){
      x=0
      ox=50
      oy=210
    }
    if(i==38){
      x=0
      ox=50
      oy=230
    }
    if(i==43){
      x=0
      ox=75
      oy=250
    }
    if(i==47){
      x=0
      ox=75
      oy=270
    }
    if(i==51){
      x=0
      ox=100
      oy=290
    }
    let polje = new Polje(`polje${i}`,ox+x*50,oy,10,10,10,10)
    
    x++
    nizPolja.push(polje)
  }
  let nizTile = []
 
  const test1 = new Tile("tile00",100, 100, "drvo",2,false, "{0,0,0,0,0,0}")
  nizTile.push(test1)
  const test2 = new Tile("tile01",150, 100, "drvo",5,false, "{0,0,0,0,0,0}")
  nizTile.push(test2)
  const test3 = new Tile("tile02",200, 100, "drvo",5,false, "{0,0,0,0,0,0}")
  nizTile.push(test3)
  const test4 = new Tile("tile03",75, 140, "drvo",6,false, "{0,0,0,0,0,0}")
  nizTile.push(test4)
  const test5 = new Tile("tile04",125, 140, "cigla",6,false, "{0,0,0,0,0,0}")
  nizTile.push(test5)
  const test6 = new Tile("tile05",175, 140, "cigla",8,false, "{0,0,0,0,0,0}")
  nizTile.push(test6)
  const test7 = new Tile("tile06",225, 140, "cigla",8,false, "{0,0,0,0,0,0}")
  nizTile.push(test7)
  const test8 = new Tile("tile07",50, 180, "kamen",9,false, "{0,0,0,0,0,0}")
  nizTile.push(test8)
  const test9 = new Tile("tile08",100, 180, "kamen",9,false, "{0,0,0,0,0,0}")
  nizTile.push(test9)
  const test10 = new Tile("tile09",150, 180, "kamen",10,false, "{0,0,0,0,0,0}")
  nizTile.push(test10)
  const test11= new Tile("tile010",200, 180, "zito",10,false, "{0,0,0,0,0,0}")
  nizTile.push(test11)
  const test12 = new Tile("tile011",250, 180, "zito",11,false, "{0,0,0,0,0,0}")
  nizTile.push(test12)
  const test13 = new Tile("tile012",75, 220, "zito",11,false, "{0,0,0,0,0,0}")
  nizTile.push(test13)
  const test14 = new Tile("tile013",125, 220, "zito",12,false, "{0,0,0,0,0,0}")
  nizTile.push(test14)
  const test15 = new Tile("tile014",175, 220, "pustinja",7,false, "{0,0,0,0,0,0}")
  nizTile.push(test15)
  const test16= new Tile("tile015",225, 220, "ovca",4,false, "{0,0,0,0,0,0}")
  nizTile.push(test16)
  const test17 = new Tile("tile016",100, 260, "ovca",4,false, "{0,0,0,0,0,0}")
  nizTile.push(test17)
  const test18= new Tile("tile017",150, 260, "ovca",3,false, "{0,0,0,0,0,0}")
  nizTile.push(test18)
  const test19 = new Tile("tile018",200, 260, "zito",3,false, "{0,0,0,0,0,0}")
  nizTile.push(test19)
  
  return (

    <><Stage width={600} height={600} >
      <Layer>
        <Rect width={600} height={600} fill="#3674B5" />
      </Layer>
      <Layer >
        
        {nizTile.map(tile => tile.render())}
        {nizPolja.map(polje=>polje.render())}
      </Layer>

      
    </Stage></>
  )
}

export default App