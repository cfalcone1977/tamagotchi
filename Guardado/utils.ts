import fs from "node:fs";
import path from "node:path";
import { Mascota } from "../src/mascota";
import { Gatito, Pajarito } from "../src/index";



export const ruta:string=path.resolve(__dirname,"save.json");


export function archivoExiste(ruta:string):boolean{
   let existe:boolean=false;
   return fs.existsSync(ruta);
}

export function guardarEstado(objeto:Mascota){
    const data={nombre: objeto["nombre"],
      hambre: objeto["hambre"], 
      felicidad: objeto["felicidad"],
      energia: objeto["energia"]
   }
   fs.writeFileSync(ruta,JSON.stringify(data));

}

export function cargarEstadoG(objeto:Gatito):Gatito{
   const dataTexto=fs.readFileSync(ruta,'utf-8');
   const data=JSON.parse(dataTexto);
   objeto["nombre"]=data.nombre;
   objeto["hambre"]=data.hambre;
   objeto["felicidad"]=data.felicidad;
   objeto["energia"]=data.energia;
   return objeto;
}


export function cargarEstadoP(objeto:Pajarito):Pajarito{
   const dataTexto=fs.readFileSync(ruta,'utf-8');
   const data=JSON.parse(dataTexto);
   objeto["nombre"]=data.nombre;
   objeto["hambre"]=data.hambre;
   objeto["felicidad"]=data.felicidad;
   objeto["energia"]=data.energia;
   return objeto;
}