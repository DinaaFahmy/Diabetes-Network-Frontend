import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

import { EditDoctorProfileComponent } from './edit-doctor-profile/edit-doctor-profile.component';
import { DialogCertificatesComponent } from './edit-doctor-profile/dialog-certificates/dialog-certificates.component';

import { MatFormFieldModule } from '@angular/material/form-field';
import { MatCardModule } from '@angular/material/card';
import { MatTabsModule } from '@angular/material/tabs';
import { MatDividerModule } from '@angular/material/divider';
import { MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatListModule } from '@angular/material/list';
import { MatTableModule } from '@angular/material/table';

import { MatInputModule } from '@angular/material/input';
import { MentionedquestionsComponent } from './mentionedquestions/mentionedquestions.component';
import { PassdialogComponent } from './passdialog/passdialog.component';

@NgModule({
  declarations: [EditDoctorProfileComponent, DialogCertificatesComponent, PassdialogComponent],
  imports: [
    CommonModule,
    MatCardModule,
    MatFormFieldModule,
    MatTabsModule,
    MatDividerModule,
    MatDialogModule,
    MatButtonModule,
    MatIconModule,
    MatMenuModule,
    MatListModule,
    MatTableModule,
    MatInputModule,
    ReactiveFormsModule,
    FormsModule,
  ],
  exports: [],
})
export class DoctorModule {}
