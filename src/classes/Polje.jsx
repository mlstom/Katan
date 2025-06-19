import { Circle, Group } from "react-konva";
export class Polje {
  constructor(id,x, y, vlasnik, kuca, port, putevi) {
    this.id = id
    this.x = x;
    this.y = y;
    this.vlasnik = vlasnik;
    this.kuca = kuca;
    this.port = port;
    this.putevi = putevi;
    this.povezani =[]
  };

  addPovezani(sused){
    this.povezani.push(sused)
  }
  setKuca(kuca){
    this.kuca = kuca
  }
  setVlasnik(vlasnik){
    this.vlasnik = vlasnik
  }

  render(onClick) {
    console.log(this.id)
    return (
      <Circle
        key={this.id}
        x={this.x}
        y={this.y}
        radius={5}
        fill="#eee"
        stroke="black"
        onClick={() => onClick(this)}
      />
    );
  }
}