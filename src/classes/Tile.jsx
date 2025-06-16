import { RegularPolygon,Group} from 'react-konva';
import ImageComponent from '../components/ImageComponent';

export class Tile {
  constructor(id, x, y, resource, number, lopov, polja) {
    this.id = id
    this.x = x
    this.y = y
    this.resource = resource
    this.number = number
    this.lopov = lopov
    this.polja = polja
  }

  render() {
    return (
      <Group
        key={this.id}
      >
        <RegularPolygon

          x={this.x}
          y={this.y}
          width={50}
          height={50}
          fill={"red"}
          sides={6}
        />
        <ImageComponent
          src={`src/assets/broj${this.number}.png`} // lokalni path, mora da bude validan
          x={this.x}
          y={this.y}
          width={20}
          height={20}
        />
      </Group>);
  }

}