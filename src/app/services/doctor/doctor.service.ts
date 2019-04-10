import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { URL_SERVICES } from 'src/app/config/config';
import { HttpClient } from '@angular/common/http';
import { UserService } from '../user/user.service';
import { Doctor } from 'src/app/models/doctor.model';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class DoctorService {

  constructor(
    public http: HttpClient,
    public userService: UserService,
    private toastr: ToastrService
  ) { }

  loadDoctors() {
    const url = URL_SERVICES + 'doctors';
    return this.http.get(url)
      .pipe(
        map( (resp: any) => {
          return resp;
        })
      );
  }

  saveDoctor( doctor: Doctor) {
    let url = URL_SERVICES + 'doctors';
    if (doctor._id) {
      url += '/' + doctor._id + '?token=' + this.userService.token;

      return this.http.put(url, doctor).pipe(
        map( (resp: any) => {
          this.toastr.success('El Médico se actualizó correctamente', 'Médico Guardado');
          return resp.doctor;
        })
      );
    } else {
      url += '?token=' + this.userService.token;
      return this.http.post(url, doctor).pipe(
        map( (resp: any) => {
          this.toastr.success('El Médico se creó correctamente', 'Médico Creado');
          return resp.doctor;
        })
      );
    }
  }

  getDoctor(id: string) {
    const url = URL_SERVICES + 'doctors/' + id;
    return this.http.get(url)
      .pipe(
        map( (resp: any) => resp.doctor)
      );
  }

  searchDoctors(key: string) {
    const url = URL_SERVICES + 'search/collection/doctors/' + key;
    return this.http.get(url)
      .pipe(
        map( (resp: any) => resp.doctors )
      );
  }

  updateDoctor(doctor: Doctor) {
    const url = URL_SERVICES + 'doctors/' + doctor._id + '?token=' + this.userService.token;

    return this.http.put( url, doctor)
      .pipe(
        map( (resp: any) => resp.doctor)
      );
  }

  deleteDoctor(id: string) {
    const url = URL_SERVICES + 'doctors/' + id + '?token=' + this.userService.token;
    return this.http.delete(url);
  }
}
