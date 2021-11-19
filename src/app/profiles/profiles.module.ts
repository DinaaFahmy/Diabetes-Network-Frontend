import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

import { DrProfileComponent } from './dr-profile/dr-profile.component';
import { ProfilePostsComponent } from './profile-posts/profile-posts.component';
import { ProfileQuestionsComponent } from './profile-questions/profile-questions.component';

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
import { CheckUpsInfoDialogComponent } from './check-ups-info-dialog/check-ups-info-dialog.component';
import { TestsDialogInfoComponent } from './tests-dialog-info/tests-dialog-info.component';

@NgModule({
  declarations: [
    DrProfileComponent,
    ProfilePostsComponent,
    ProfileQuestionsComponent,
    CheckUpsInfoDialogComponent,
    TestsDialogInfoComponent,
  ],
  imports: [
    ReactiveFormsModule,
    FormsModule,
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
    MatIconModule,
    MatInputModule,
  ],
})
export class ProfilesModule {}
