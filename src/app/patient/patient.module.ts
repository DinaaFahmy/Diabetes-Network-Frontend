import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { CheckUpsComponent } from './check-ups/check-ups.component';
import {
  NgbPaginationModule,
  NgbAlertModule,
} from '@ng-bootstrap/ng-bootstrap';
import { TabsModule } from 'ngx-bootstrap/tabs';
import { SelectDropDownModule } from 'ngx-select-dropdown';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatTabsModule } from '@angular/material/tabs';
import { MatDividerModule } from '@angular/material/divider';
import { MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatListModule } from '@angular/material/list';
import { CheckupDialogComponent } from './checkup-dialog/checkup-dialog.component';
// import { MyDoctorsComponent } from '../shared/profile/my-doctors/my-doctors.component';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { TestDialogComponent } from './test-dialog/test-dialog.component';
import { TestsComponent } from './tests/tests.component';
 import {ChartComponent} from '../chart/chart.component';
import {ChartsModule} from 'ng2-charts';
import { GoogleChartsModule } from 'angular-google-charts';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

@NgModule({
  declarations: [CheckUpsComponent, CheckupDialogComponent, TestDialogComponent, TestsComponent,ChartComponent],
  imports: [
    NgbPaginationModule,
    BrowserAnimationsModule,
    GoogleChartsModule,
    NgbAlertModule,
    ChartsModule,
    TabsModule,
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    NgbPaginationModule,
    NgbAlertModule,
    SelectDropDownModule,
    MatCardModule,
    MatFormFieldModule,
    MatTabsModule,
    MatDividerModule,
    MatDialogModule,
    MatButtonModule,
    MatIconModule,
    MatMenuModule,
    MatListModule,
    MatTabsModule,
    MatIconModule,
    BsDatepickerModule,
  ],
  exports:[ChartComponent]
})
export class PatientModule {}
