export class Igrac{
    constructor(id, boja) {
        this.id = id;
        this.boja = boja;
        this.putevi = []; 
        this.kucice = [];
        this.gradovi=[] // niz polja gde ima kuće
      }
    
      dodajPut(polje1, polje2) {
        this.putevi.push({ polje1, polje2 });
      }
    
      dodajKucicu(polje) {
        this.kucice.push(polje);
      }
}