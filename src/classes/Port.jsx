import ImageComponent from '../components/ImageComponent';
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
          <ImageComponent
          src={`src/assets/luka${this.luka}.png`} // lokalni path, mora da bude validan
          x={this.x}
          y={this.y}
          width={30}
          height={30}
          key={this.id}
        />
        )
      }

}