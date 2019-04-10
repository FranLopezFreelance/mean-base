import { Component, OnInit } from '@angular/core';
import { DoctorService } from 'src/app/services/service.index';
import { ModalUploadService } from 'src/app/components/modal-upload/modal-upload.service';
import { ToastrService } from 'ngx-toastr';
import { Doctor } from 'src/app/models/doctor.model';
import { Hospital } from 'src/app/models/hospital.model';

@Component({
  selector: 'app-doctors',
  templateUrl: './doctors.component.html',
  styles: []
})
export class DoctorsComponent implements OnInit {

  doctors: Doctor[] = [];
  doctor: Doctor;
  hospital: Hospital;
  total: number = 0;

  constructor(
    public doctorService: DoctorService,
    public modalUploadService: ModalUploadService,
    private toastr: ToastrService
  ) { }

  ngOnInit() {
    this.loadDoctors();
    this.modalUploadService.notifacation
      .subscribe(resp => this.loadDoctors());
  }

  loadDoctors() {
    this.doctorService.loadDoctors()
      .subscribe( (resp: any) => {
        this.doctors = resp.doctors;
        this.total = this.doctors.length;
      });
  }

  searchDoctor(key: string) {
    if (key.length <= 0) {
      this.loadDoctors();
      return;
    }

    this.doctorService.searchDoctors(key)
      .subscribe( (doctors: Doctor[])  => {
        this.doctors = doctors;
        if (doctors.length === 0) {
          this.doctors = null;
        }
      });
  }

  updateDoctor(doctor: Doctor) {
    this.doctorService.updateDoctor(doctor)
      .subscribe( resp  => {
        this.loadDoctors();
        this.toastr.success('El Médico se actualizó Correctamente', 'Médico Actualizado');
      });
  }

  deleteDoctor(doctor: Doctor) {
    if (confirm('¿Seguro que quieres eliminarlo?')) {
      this.doctorService.deleteDoctor(doctor._id)
        .subscribe( resp  => {
          this.loadDoctors();
          this.toastr.success('El médico se eliminó Correctamente', 'médico Eliminado');
        });
    }
  }

  showModal(id: string) {
    this.modalUploadService.showModal('doctors', id);
  }
}
