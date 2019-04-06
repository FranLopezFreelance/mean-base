import { Component, OnInit } from '@angular/core';
import { Hospital } from 'src/app/models/hospital.model';
import { HospitalService } from 'src/app/services/service.index';
import { ModalUploadService } from 'src/app/components/modal-upload/modal-upload.service';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-hospitals',
  templateUrl: './hospitals.component.html',
  styles: []
})
export class HospitalsComponent implements OnInit {

  hospitals: Hospital[] = [];
  total: number = 0;

  createForm: boolean = false;

  constructor(
    public hospitalService: HospitalService,
    public modalUploadService: ModalUploadService
  ) { }

  ngOnInit() {
    this.loadHospitals();
    this.modalUploadService.notifacation
      .subscribe(resp => this.loadHospitals());
  }

  showCreateForm() {
    this.createForm = true;
  }

  createHospital( form: NgForm ) {
    this.hospitalService.createHospital(form.value.name)
    .subscribe(resp => this.loadHospitals());
    this.createForm = false;
  }

  loadHospitals() {
    this.hospitalService.loadHospitals()
      .subscribe( (resp: any) => {
        this.hospitals = resp.hospitals;
        this.total = this.hospitals.length;
      });
  }

  searchHospital(key: string) {
    if (key.length <= 0) {
      this.loadHospitals();
      return;
    }

    this.hospitalService.searchHospitals(key)
      .subscribe( (hospitals: Hospital[])  => {
        this.hospitals = hospitals;
        if (hospitals.length === 0) {
          this.hospitals = null;
        }
      });
  }

  updateHospital(hospital: Hospital) {
    this.hospitalService.updateHospital(hospital)
      .subscribe( resp  => {
        this.loadHospitals();
      });
  }

  deleteHospital(hospital: Hospital) {
    this.hospitalService.deleteHospital(hospital._id)
      .subscribe( resp  => {
        this.loadHospitals();
      });
  }

  showModal(id: string) {
    this.modalUploadService.showModal('hospitals', id);
  }

}
