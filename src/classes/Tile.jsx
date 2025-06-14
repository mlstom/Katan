import { RegularPolygon, Text } from 'react-konva';

export class Tile {
  constructor(x, y, resource, number, lopov, polja) {
    this.x = x
    this.y = y
    this.resource = resource
    this.number = number
    this.lopov = lopov
    this.polja = polja
  }

  render() {
    return (
      <>
        
        <RegularPolygon
          x={this.x}
          y={this.y}
          width={50}
          height={50}
          fill={"red"}
          sides={6}
          draggable
        />
        <Text 
        text={12}
         x={this.x-2}
          y={this.y-4} />
      </>);
  }

}