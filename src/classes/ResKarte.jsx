import ImageComponent from '../components/ImageComponent';
export class ResKarta {
    constructor(id, src, naziv, x, y) {
        this.x = x;
        this.y = y;
        this.id = id
        this.src = src
        this.naziv = naziv
        this.izvucena = false
    }
    render(ox,oy) {
        return <ImageComponent
            key={`reskarte-${this.id}`}
            x={this.x + ox}
            y={this.y + oy}
            src={this.src}
            width={125}
            height={140}
        />
    }
}