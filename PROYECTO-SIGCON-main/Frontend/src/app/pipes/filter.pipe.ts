import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filter'
})
export class FilterPipe implements PipeTransform {

  transform(value: any, arg: any): any {
    if(arg=='') return value;
    const resultPosts = [];
    for(const post of value){
      if(post.recaudacion_estado.descripcion.toLowerCase().indexOf(arg.toLowerCase())>-1){
        resultPosts.push(post);
      }
      else if(post.mant_recibo.n_recibo.toLowerCase().indexOf(arg.toLowerCase())>-1){
        resultPosts.push(post);
      }
      else if(post.n_operacion.toLowerCase().indexOf(arg.toLowerCase())>-1){
        resultPosts.push(post);
      }
      else if(post.cuenta.persona.nombre_completo.toLowerCase().indexOf(arg.toLowerCase())>-1){
        resultPosts.push(post);
      }      
      else if(post.mant_recibo.casa.predio.descripcion.toLowerCase().indexOf(arg.toLowerCase())>-1){
        resultPosts.push(post);
      }
      else if(post.cuenta.tipo_moneda.descripcion.toLowerCase().indexOf(arg.toLowerCase())>-1){
        resultPosts.push(post);
      }       
    };
    return resultPosts;
  }
}
