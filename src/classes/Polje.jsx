import { Circle, Group } from "react-konva";
import ImageComponent from "../components/ImageComponent";
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
    let renderElement
    if(this.vlasnik == null){
      renderElement =<Circle
      key={this.id}
      x={this.x}
      y={this.y}
      radius={5}
      fill="#eee"
      stroke="black"
      onClick={() => onClick(this)}
    />
    }
    if(this.kuca==1 && this.vlasnik!=null){
     
      renderElement =<ImageComponent
      onClickKuca={()=>onClick(this)}
      src={`src/assets/kuca.png`}
      key={`kuca-${this.id}`}
      x={this.x}
      y={this.y - 1}
      width={18}
      height={10}
      red={this.vlasnik.boja.r}
      green={this.vlasnik.boja.g}
      blue={this.vlasnik.boja.b}
      
    /> 
    }
    if(this.kuca == 2 && this.vlasnik!=null){
      renderElement =<ImageComponent
      src={`src/assets/grad.png`}
      key={`grad-${this.id}`}
      x={this.x}
      y={this.y-2}
      width={23}
      height={15}
      red={this.vlasnik.boja.r}
      green={this.vlasnik.boja.g}
      blue={this.vlasnik.boja.b}
    /> 
    }
    return (
      renderElement
    );
  }
}