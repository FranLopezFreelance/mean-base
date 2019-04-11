import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { URL_SERVICES } from 'src/app/config/config';
import { User } from 'src/app/models/user.model';
import { Doctor } from 'src/app/models/doctor.model';
import { Hospital } from 'src/app/models/hospital.model';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styles: []
})
export class SearchComponent implements OnInit {

  users: User[] = [];
  totUsers: number = 0;
  doctors: Doctor[] = [];
  totDoctors: number = 0;
  hospitals: Hospital[] = [];
  totHospitals: number = 0;

  constructor(
    public activatedRoute: ActivatedRoute,
    public http: HttpClient
  ) {
    activatedRoute.params
      .subscribe( params => {
        const text = params.text;
        this.search(text);
      });
  }

  ngOnInit() {
  }

  search( text: string ) {
    const url = URL_SERVICES + 'search/all/' + text;
    this.http.get(url)
      .subscribe( (resp: any) => {
        // Users
        this.users = resp.users;
        this.totUsers = resp.users.length;
        if (this.totUsers === 0) {
          this.users = null;
        }
        // Doctors
        this.doctors = resp.doctors;
        this.totDoctors = resp.doctors.length;
        if (this.totDoctors === 0) {
          this.doctors = null;
        }
        // Hospitals
        this.hospitals = resp.hospitals;
        this.totHospitals = this.hospitals.length;
        if (this.totHospitals === 0) {
          this.hospitals = null;
        }
      });
  }

}
