import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
// import { BaseComponent } from './base/base.component';
import { ChatComponent } from './chat/chat.component';
import {
  NgbPaginationModule,
  NgbAlertModule,
} from '@ng-bootstrap/ng-bootstrap';
import { TabsModule } from 'ngx-bootstrap/tabs';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { SelectDropDownModule } from 'ngx-select-dropdown';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatCardModule } from '@angular/material/card';
import { MatDividerModule } from '@angular/material/divider';
import { MatTabsModule } from '@angular/material/tabs';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatMenuModule } from '@angular/material/menu';

@NgModule({
  declarations: [ChatComponent],
  imports: [
    CommonModule,
    NgbPaginationModule,
    NgbAlertModule,
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
    MatIconModule,
    MatIconModule,
    MatIconModule,
    MatMenuModule,
    MatListModule,
    MatTabsModule,
    MatIconModule,
    BsDatepickerModule,
  ],
})
export class SignalRModule {}
