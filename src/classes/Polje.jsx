import { Circle } from "react-konva";
export class Polje {
  constructor(id,x, y, vlasnik, kuca, port, putevi) {
    this.id = id
    this.x = x;
    this.y = y;
    this.vlasnik = vlasnik;
    this.kuca = kuca;
    this.port = port;
    this.putevi = putevi;

  };

  render() {
    return (
      <Circle
        key={this.id}
        x={this.x}
        y={this.y}
        radius={4}
        fill={"rgb(250, 218, 122, 0.7)"} // bez ispune
        stroke={"black"}     // crna ivica
        strokeWidth={1}
      />
    )
  }
}