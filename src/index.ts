import { archivoExiste, cargarEstado,guardarEstado, ruta} from "../Guardado/utils";
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

async function menu(mascota:Gatito|Pajarito){
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
                                           mascota=cargarEstado(mascota);
                                           menu(mascota);
                                        } else {
                                            const nombre=prompt("Como se llama tu mascota?: ");
                                            const mascota= new Gatito(nombre);
                                            menu(mascota);
                                                }

                } else if (tipo=="2") {
                                     if (archivoExiste(ruta)) {
                                            let mascota= new Pajarito("yaTieneNombre");
                                            mascota=cargarEstado(mascota);
                                            menu(mascota);
                                                          } else {
                                                               const nombre=prompt("Como se llama tu mascota?: ");
                                                               const mascota= new Pajarito(nombre);
                                                               menu(mascota);
                                                           }                                            
}
}

principal();

/*IDEA con IA para poder utilizar variacion de estado por tiempo*/ 
//no la entiendo aún, parece que la idea es en cada lugar donde el programa 
// podria detenerse por el ingreso de una variable, generar promesas o 
// asincronismo, de manera tal que el flujo del programra no se detenga 
// y tanto los ingresos del usuario como la ejecucion cada determinado 
// tiempo del cambio de estado sea posible.

/*import * as fs from 'fs';
import * as readline from 'readline';
import { Mascota } from './mascota'; // Asegúrate de que la ruta sea correcta
// Importaciones relativas, asumiendo la estructura de directorios
import { archivoExiste, cargarEstadoG, cargarEstadoP, guardarEstado, ruta} from "../Guardado/utils"

export class Gatito extends Mascota {
    dibujarMascota(): string {
        return `  /\\_/\\
        ( o.o )
         > ^ <`;
    }

    dibujarMascotaDead(): string {
        return `  /\\_/\\
        ( +.+ )
         > ^ <`;
    }
}

export class Pajarito extends Mascota {
    dibujarMascota(): string {
        return `    _,-._
        ('v')
       /---\\
         " "  `;
    }

    dibujarMascotaDead(): string {
        return `    _,-._
        (+v+)
       /---\\
         " "  `;
    }
}

// Interfaz para manejar la entrada del usuario de forma asíncrona
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

function menu(mascota: Gatito | Pajarito): Promise<void> {
    return new Promise<void>(resolve => {
        let vivo: boolean = true;

        const mostrarMenuYObtenerOpcion = () => { // Función anidada para repetir el menú
            if (!vivo) {
                resolve(); // Resuelve la promesa cuando vivo es false (opción 4)
                return;
            }
            console.clear();
            mascota.getInfo();
            console.log("🍕 1: Alimentar ⚽ 2:Jugar 😴 3:Dormir 🚪 4:Salir");

            rl.question("👉 Que quieres hacer? ", (opcion) => {
                switch (opcion) {
                    case "1":
                        mascota.alimentar();
                        mostrarMenuYObtenerOpcion(); // Llama de nuevo para mostrar el menú
                        break;
                    case "2":
                        mascota.jugar();
                        mostrarMenuYObtenerOpcion();
                        break;
                    case "3":
                        mascota.dormir();
                        mostrarMenuYObtenerOpcion();
                        break;
                    case "4":
                        guardarEstado(mascota);
                        vivo = false;
                        mostrarMenuYObtenerOpcion(); // Esto es CRUCIAL para terminar el bucle
                        break;
                    default:
                        mostrarMenuYObtenerOpcion();
                        break;
                }
            });
        };

        mostrarMenuYObtenerOpcion(); // Inicia el proceso del menú
    });
}

// La función para ejecutar periódicamente NO necesita ser async
function ejecutarPeriodicamente(intervalo: number, codigoAEjecutar: () => void): void {
    // La función setInterval ejecuta la función codigoAEjecutar cada intervalo milisegundos.
    setInterval(codigoAEjecutar, intervalo);
}

function miFuncionDeIntervalo(): void {
    console.log("Este código se ejecuta cada 2 segundos.");
    // Aquí puedes poner el código que quieres que se ejecute repetidamente.
}

async function principal() {
    console.log("--------------------------");
    console.log("  SELECCIONA TU MASCOTA");

    // Usamos rl.question para obtener la entrada de forma asíncrona
    rl.question("  1-🐱  2-🐦  :", async (tipo) => {
        console.log("--------------------------");

        // Iniciar el intervalo ANTES de entrar al menú
        ejecutarPeriodicamente(2000, miFuncionDeIntervalo);

        if (tipo === "1") {
            if (archivoExiste(ruta)) {
                let mascota = new Gatito("yaTieneNombre");
                mascota = cargarEstadoG(mascota);
                await menu(mascota); // Esperar a que el menú termine
            } else {
                rl.question("Como se llama tu mascota?: ", async (nombre) => {
                    const mascota = new Gatito(nombre);
                    await menu(mascota); // Esperar a que el menú termine
                });
            }
        } else if (tipo === "2") {
            if (archivoExiste(ruta)) {
                let mascota = new Pajarito("yaTieneNombre");
                mascota = cargarEstadoP(mascota);
                await menu(mascota); // Esperar a que el menú termine
            } else {
                rl.question("Como se llama tu mascota?: ", async (nombre) => {
                    const mascota = new Pajarito(nombre);
                    await menu(mascota); // Esperar a que el menú termine
                });
            }
        }
    });
}

principal();
*/