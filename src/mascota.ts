export abstract class Mascota{
     protected nombre:string;
     protected hambre:number=50;
     protected felicidad:number=50;
     protected energia:number=100;
     //vida:number=100;     

     constructor(nombre:string){
        this.nombre=nombre;
     }

     abstract dibujarMascota():string;

     jugar():void{
        this.felicidad=Math.min(100,this.felicidad+10);
        this.energia=Math.max(0,this.energia-5);
        this.hambre=Math.min(100,this.hambre+5);
     }

     alimentar():void{
       this.hambre=Math.max(0,this.hambre-10);
     }

     dormir():void{
      this.energia=Math.min(100,this.energia+20);  
     }

     public actualizarEstado():void{
      this.energia=Math.max(0,this.energia-5);
      this.felicidad=Math.max(0,this.felicidad-5);
      this.hambre=Math.max(0,this.hambre+5);
      this.getInfo();
     }

     public getInfo(){
       console.log(this.dibujarMascota());
       console.log(`   Nombre: ${this.nombre}`);
       console.log("-------------------------");
       console.log(` 🔋 Energia:   ${this.energia} 🔋 `);
       console.log(` 🎉 Felicidad: ${this.felicidad} 🎉 `);
       console.log(` 🍴🥗 Hambre:  ${this.hambre} 🍴🍵 `);
       console.log("-------------------------");
     }

}







