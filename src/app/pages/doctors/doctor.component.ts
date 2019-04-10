import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Hospital } from 'src/app/models/hospital.model';
import { HospitalService, DoctorService } from 'src/app/services/service.index';
import { Doctor } from 'src/app/models/doctor.model';
import { Router, ActivatedRoute } from '@angular/router';
import { ModalUploadService } from 'src/app/components/modal-upload/modal-upload.service';

@Component({
  selector: 'app-doctor',
  templateUrl: './doctor.component.html',
  styles: []
})
export class DoctorComponent implements OnInit {

  hospitals: Hospital[] = [];
  selectedHospital: Hospital = new Hospital('');
  doctor: Doctor = new Doctor('', '', '', '', '');

  constructor(
    public hospitalService: HospitalService,
    public doctorService: DoctorService,
    public router: Router,
    public activatedRout: ActivatedRoute,
    public modalUploadService: ModalUploadService
  ) {
    activatedRout.params.subscribe( params => {
      const id = params.id;

      if (id !== 'new') {
        this.getDoctor(id);
      }
    });
  }

  ngOnInit() {
    this.hospitalService.loadHospitals()
      .subscribe( resp => this.hospitals = resp.hospitals);
    this.modalUploadService.notifacation
      .subscribe( resp => {
        this.doctor.img = resp.doctor.img;
      })
  }

  saveDcotor(f: NgForm) {
    if (f.invalid) {
      return;
    }
    this.doctorService.saveDoctor( this.doctor )
      .subscribe( doctor => {
        this.router.navigate(['/doctor/' + doctor._id]);
        this.doctor._id = doctor._id;
      });
  }

  getDoctor(id: string) {
    this.doctorService.getDoctor(id)
      .subscribe( doctor => {
        this.doctor = doctor;
        this.doctor.hospital = doctor.hospital._id;
        this.changeHospital(this.doctor.hospital);
      });
  }

  changeHospital( id: string ) {
    this.hospitalService.getHospital(id)
      .subscribe( hospital => {
        this.selectedHospital = hospital;
      });
  }

  changeImage() {
    this.modalUploadService.showModal( 'doctors', this.doctor._id);
  }

}
