import { Mapa } from './Mapa';
import { Igrac } from './Igrac';

export class Game {
    constructor() {
        this.mapa = new Mapa(1);
        this.igraci = []; // niz igraca
        this.aktivniIgrac = 0;
        this.izabranoPolje1 = null;
        this.izabranoPolje2 = null;
    }
    izaberiPolje(polje) {
        this.izabranoPolje = polje;
    }
    dodajIgraca(novi){
        this.igraci.push(novi)
    }
    trenutniIgrac() {
        return this.igraci[this.aktivniIgrac];
    }
    postaviKucicu(polje) {
        this.trenutniIgrac().dodajKucicu(polje);
      }
    
    zavrsiPotez() {
        this.aktivniIgrac = (this.aktivniIgrac + 1) % this.igraci.length;
        this.izabranoPolje = null;
    }
    postaviPut(izPolja, uPolje) {
        if (!izPolja || !uPolje) return;
        // logika: ako su susedna i ako igrač sme tu da stavi put
        // dodaj put (možda niz puteva u igraču?)
        this.trenutniIgrac().dodajPut(izPolja, uPolje);
    }
    draw(onPoljeClick,overlayLines) {
        // prosledi igračima i callback na mapu
        return this.mapa.draw(this.igraci,overlayLines,(polje) => {
          // klik na polje
          if (polje) onPoljeClick(polje);
          this.izaberiPolje(polje);
        });
      }
    update(){
        return this.draw(this.igraci);
    }
}