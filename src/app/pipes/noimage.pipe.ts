import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'noimage'
})
export class NoimagePipe implements PipeTransform {

  transform(url: any): string {
    if (!url) {
      return 'assets/imagenes/noimage.png';
    }

    if (url.length > 0) {
      return url;
    } else {
      return 'assets/imagenes/noimage.png';
    }

  }

}
