import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filterByTitle'
})
export class FilterByTitlePipe implements PipeTransform {
  transform(data: any[], title: string): any[] {
    return data.filter(item => item.titre === title);
  }
}
