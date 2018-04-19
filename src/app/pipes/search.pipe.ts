import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'search'
})
export class SearchPipe implements PipeTransform {

  transform(items: any[], searchText: string, value: string): any[] {
    if (!items) {
      return [];
    }

    if (!value) {
      return items;
    }

    const myPattern = new RegExp(value, 'i');
    return items.filter(it => {
      let isOk = 0;
      for(let i = 0; i < it.categories.length; i++){
        if (it.categories[i].match(myPattern))
        isOk++;
      }
      if(isOk > 0){
        return it;
      }
    }
    )}

}