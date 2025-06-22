import { Mapa } from './Mapa';
import { Igrac } from './Igrac';
import ImageComponent from '../components/ImageComponent';

export class Game {
    constructor() {
        this.mapa = new Mapa(1);
        this.igraci = []; // niz igraca
        this.aktivniIgrac = 0;
        this.izabranoPolje1 = null;
        this.izabranoPolje2 = null;
        this.devKarte = []
        this.devIndex = 0
    }
    izaberiPolje(polje) {
        this.izabranoPolje = polje;
    }
    dodajIgraca(novi) {
        this.igraci.push(novi)
    }
    trenutniIgrac() {
        return this.igraci[this.aktivniIgrac];
    }
    postaviKucicu(polje) {
        polje.vlasnik = this.trenutniIgrac();
        polje.kuca = 1;
        this.trenutniIgrac().dodajKucicu(polje);
    }
    brojDevKarataKojiNisuIzvucene() {
        return this.devKarte.length - this.devIndex
    }

    zavrsiPotez() {
        this.aktivniIgrac = (this.aktivniIgrac + 1) % this.igraci.length;
        this.izabranoPolje = null;
    }
    postaviPut(izPolja, uPolje) {
        if (!izPolja || !uPolje) return;
        this.trenutniIgrac().dodajPut(izPolja, uPolje);
    }
    dodajDevKartu(devKarta) {
        this.devKarte.push(devKarta)
    }
    sfuleDevKarte() {

        for (let i = this.devKarte.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [this.devKarte[i], this.devKarte[j]] = [this.devKarte[j], this.devKarte[i]];
        }
        this.devIndex = 0;
        this.devKarte.forEach(k => k.izvucena = false);
    }
    draw(onPoljeClick, overlayLines) {
        let elements = []
        elements =  this.mapa.draw(this.igraci, overlayLines, (polje) => {
            // klik na polje
            if (polje) onPoljeClick(polje);
        });
       
        return elements
    }
    drawKarte(){
        let elements = []
        let ox=60,oy=75
        for(let i =0; i<this.trenutniIgrac().devKarte.length;i++){
            let trDevKar = this.trenutniIgrac().devKarte[i]
            console.log(trDevKar)
            elements.push(
            <ImageComponent
                key={`devKarta-${i}`}
                x={trDevKar.x+ox}
                y={trDevKar.y+oy}
                src = {trDevKar.src}
                width={125}
                height={140}
                />)
                ox= ox+125
        }
        return elements
    }

    update() {
        return this.draw(this.igraci);
    }
}