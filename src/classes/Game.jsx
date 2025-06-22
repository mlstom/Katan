import { Mapa } from './Mapa';

export class Game {
    constructor() {
        this.mapa = new Mapa(1);
        this.igraci = []; // niz igraca
        this.aktivniIgrac = 0;
        this.izabranoPolje1 = null;
        this.izabranoPolje2 = null;
        this.devKarte = []
        this.devIndex = 0
        this.loggedIgracIndex = null
        this.nizZito = []
        this.nizDrvo = []
        this.nizCigla = []
        this.nizKamen = []
        this.nizOvca = []
    }
    
    findLoggedIgracIndex (id){
        for(let i =0; i<this.igraci.length;i++){
            if(this.igraci[i].id == id) this.loggedIgracIndex=i;
        }
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
        
        for(let i =0; i<this.igraci[this.loggedIgracIndex].devKarte.length;i++){
            let trDevKar = this.igraci[this.loggedIgracIndex].devKarte[i]
            elements.push(
                trDevKar.render(ox,oy)
            )
                ox= ox+125
        }
        return elements
    }

    update() {
        return this.draw(this.igraci);
    }
}