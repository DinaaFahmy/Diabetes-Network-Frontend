import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login/login.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { RegisterAsPatientComponent } from './register-as-patient/register-as-patient.component';
import { RegisterAsDoctorComponent } from './register-as-doctor/register-as-doctor.component';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import {
  NgbPaginationModule,
  NgbAlertModule,
} from '@ng-bootstrap/ng-bootstrap';
import { SelectDropDownModule } from 'ngx-select-dropdown';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';

@NgModule({
  declarations: [
    LoginComponent,
    RegisterAsPatientComponent,
    RegisterAsDoctorComponent,
  ],
  imports: [
    CommonModule,
    NgbAlertModule,
    NgbPaginationModule,
    ReactiveFormsModule,
    BsDropdownModule.forRoot(),
    SelectDropDownModule,
    MatSelectModule,
    MatFormFieldModule,

    FormsModule,
    BsDatepickerModule.forRoot(),
  ],
  exports: [LoginComponent],
})
export class AccountModule {}
