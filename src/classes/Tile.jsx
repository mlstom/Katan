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
    if(resource == "drvo"){
      this.rektBoja = "#2D4F2B"
    }
    if(resource == "pustinja"){
      this.rektBoja ="#F5F0CD"
    }
    if(resource == "ovca"){
      this.rektBoja = "#B6F500"
    }
    if(resource == "cigla"){
      this.rektBoja = "#FFAAAA"
    }
    if(resource=="kamen"){
      this.rektBoja = "#948979"
    }
    if(resource=="zito"){
      this.rektBoja = "#FED16A"
    }
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
          fill={this.rektBoja}
          sides={6}
        />
        <ImageComponent
          src={`src/assets/broj${this.number}.png`} // lokalni path, mora da bude validan
          x={this.x}
          y={this.y+10}
          width={20}
          height={20}
        />
        <ImageComponent
          src={`src/assets/${this.resource}.png`} // lokalni path, mora da bude validan
          x={this.x}
          y={this.resource!="pustinja" ? this.y-10 : this.y}
          width={20}
          height={20}
        />
      </Group>);
  }

}