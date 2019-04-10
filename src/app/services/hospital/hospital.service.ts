import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { URL_SERVICES } from 'src/app/config/config';
import { map } from 'rxjs/operators';
import { UserService } from '../user/user.service';
import { Hospital } from 'src/app/models/hospital.model';

@Injectable({
  providedIn: 'root'
})
export class HospitalService {

  totalHospitals: number = 0;

  constructor(
    public http: HttpClient,
    public userService: UserService
  ) { }

  loadHospitals() {
    const url = URL_SERVICES + 'hospitals';
    return this.http.get(url)
      .pipe(
        map( (resp: any) => {
          return resp;
        })
      );
  }

  getHospital(id: string) {
    const url = URL_SERVICES + 'hospitals/' + id;
    return this.http.get(url)
      .pipe(
        map( (resp: any) => resp.hospitals)
      );
  }

  deleteHospital(id: string) {
    const url = URL_SERVICES + 'hospitals/' + id + '?token=' + this.userService.token;
    return this.http.delete(url);
  }

  createHospital(name: string) {
    const url = URL_SERVICES + 'hospitals?token=' + this.userService.token;
    return this.http.post(url, { name })
    .pipe(
      map( (resp: any) => resp.hospital)
    );
  }

  searchHospitals(key: string) {
    const url = URL_SERVICES + 'search/collection/hospitals/' + key;
    return this.http.get(url)
      .pipe(
        map( (resp: any) => resp.hospitals )
      );
  }

  updateHospital(hospital: Hospital) {
    const url = URL_SERVICES + 'hospitals/' + hospital._id + '?token=' + this.userService.token;

    return this.http.put( url, hospital)
      .pipe(
        map( (resp: any) => resp.hospital)
      );
  }
}
