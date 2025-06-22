export class Igrac{
    constructor(id, boja) {
        this.id = id;
        this.boja = boja;
        this.putevi = []; 
        this.kucice = [];
        this.gradovi=[] 
        this.devKarte=[]
        this.resKarte = []
      }
    
      dodajPut(polje1, polje2) {
        this.putevi.push({ polje1, polje2 });
      }
    
      dodajKucicu(polje) {
        this.kucice.push(polje);
      }
}