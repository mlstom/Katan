import { Circle } from "react-konva";
export class Polje {
  constructor(x, y, vlasnik, kuca, port, putevi) {
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
        x={this.x}
        y={this.y}
        radius={4}
        fill={"rgba(255, 255, 0, 0.3)"} // bez ispune
        stroke={"black"}     // crna ivica
        strokeWidth={1}
      />
    )
  }
}