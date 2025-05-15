import { archivoExiste, cargarEstadoG, cargarEstadoP,guardarEstado, ruta} from "../Guardado/utils";
import { Mascota } from "./mascota";
import promptSync from "prompt-sync";


export class Gatito extends Mascota{
    dibujarMascota(): string {
        return `         /\\_/\\
        ( o.o )
         > ^ <`
       
    }

    dibujarMascotaDead(): string {
        return `         /\\_/\\
        ( +.+ )
         > ^ <`
       
    }
   
}

export class Pajarito extends Mascota{
    dibujarMascota(): string {
        return `           _,-._
           ('v')
           /---\\
            " "    `
       
    }

    dibujarMascotaDead(): string {
        return `           _,-._
           (+v+)
           /---\\
            " "   `
       
    }
   
}

function menu(mascota:Gatito){
    const prompt=promptSync();
    let vivo:boolean=true;
    while (vivo){
        console.clear();
        mascota.getInfo();
        console.log("🍕 1: Alimentar ⚽ 2:Jugar 😴 3:Dormir 🚪 4:Salir");
        const opcion=prompt("👉 Que quieres hacer? ");
        switch (opcion){
           case "1":{
                     mascota.alimentar();
                     break;
                    }
           case "2":{
                     mascota.jugar();
                     break;
                    }         
           case "3":{
                     mascota.dormir();
                     break;
                    }         
           case "4":{
                     guardarEstado(mascota);
                     vivo=false;
                     break;
                    }         
           default:{
                    break;
                   }         
        }
    }

}


async function principal(){
  const prompt=promptSync();
  console.log("--------------------------")
  console.log("  SELECCIONA TU MASCOTA");
  const tipo=prompt("   1-🐱  2-🐦  :")
  console.log("--------------------------");
  if (tipo=="1"){
                if (archivoExiste(ruta)) {
                                           let mascota= new Gatito("yaTieneNombre");
                                           mascota=cargarEstadoG(mascota);
                                           menu(mascota);
                                        } else {
                                            const nombre=prompt("Como se llama tu mascota?: ");
                                            const mascota= new Gatito(nombre);
                                            menu(mascota);
                                                }

                } else if (tipo=="2") {
                                     if (archivoExiste(ruta)) {
                                            let mascota= new Pajarito("yaTieneNombre");
                                            mascota=cargarEstadoP(mascota);
                                            menu(mascota);
                                                          } else {
                                                               const nombre=prompt("Como se llama tu mascota?: ");
                                                               const mascota= new Pajarito(nombre);
                                                               menu(mascota);
                                                           }                                            
}
}
principal();