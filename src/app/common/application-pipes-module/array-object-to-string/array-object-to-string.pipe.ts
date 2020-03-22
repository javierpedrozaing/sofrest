import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'arrayObjectToString'
})
export class ArrayObjectToStringPipe implements PipeTransform {

  transform(value: any, ...args: any[]): any {
    if(Array.isArray(value)){
      let data = value.map((data)=>{
        if(typeof data === "object" && data !==null && args.length>0){
          if(data[args[0]]) return data[args[0]]
        }
        return null
      });
      let filter = data.filter(x => x!== null);
      return filter;
    }
    else return value;
  }

}
