import { Injectable } from '@angular/core';
import { URL_SERVICES } from 'src/app/config/config';
import { XhrFactory } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UploadImageService {

  constructor() { }

  uploadImage( file: File, model: string, id: string) {

    return new Promise((resolve, reject) => {
      const formData = new FormData();
      const xhr = new XMLHttpRequest();

      formData.append('img', file, file.name);

      // tslint:disable-next-line: only-arrow-functions
      xhr.onreadystatechange = function() {
        if ( xhr.readyState === 4) {
          if ( xhr.status === 200 ) {
            resolve(JSON.parse(xhr.response));
          } else {
            reject(xhr.response);
          }
        }
      };

      const url = URL_SERVICES + 'upload/' + model + '/' + id;

      xhr.open('PUT', url, true);
      xhr.send( formData );

    });
  }
}
