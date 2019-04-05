import { Pipe, PipeTransform } from '@angular/core';
import { URL_SERVICES } from '../config/config';

@Pipe({
  name: 'image'
})
export class ImagePipe implements PipeTransform {

  transform(img: string, model: string = 'users'): any {

    let url = URL_SERVICES + 'img/';

    if (!img) {
      return url + 'img_default?';
    }

    /* if (img.indexOf('https') >= 0) {
      return img;
    } */

    switch (model) {
      case 'users':
        url += 'users/' + img;
        break;
      case 'hospitals':
        url += 'hospitals/' + img;
        break;
      case 'doctors':
        url += 'doctors/' + img;
        break;
      default:
        console.log('Tipo de Imágen no existe');
        url += 'img_default?';
    }

    return url;
  }

}
