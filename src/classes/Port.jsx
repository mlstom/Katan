import { Circle } from "react-konva";
export class Port{
    constructor(id,x,y,luka){
        this.id = id
        this.luka = luka
        this.x = x
        this.y = y
    }
    setLuka(luka){
        this.luka = luka
    }



     render() {
        return (
          <Circle
            key={this.id}
            x={this.x}
            y={this.y}
            radius={7}
            fill={"rgb(250, 218, 122, 0.7)"} // bez ispune
            stroke={"black"}     // crna ivica
            strokeWidth={1}
          />
        )
      }

}