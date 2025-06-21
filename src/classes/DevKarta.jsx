import ImageComponent from '../components/ImageComponent';
export class DevKarta {
    constructor(id, src, naziv,x,y) {
        this.x=x;
        this.y=y;
        this.id = id
        this.src = src
        this.naziv = naziv
        this.izvucena = false
    }
   
}