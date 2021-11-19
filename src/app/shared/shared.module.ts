import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home/home.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { BsDropdownModule } from 'ngx-bootstrap/dropdown';

import {
  NgbPaginationModule,
  NgbAlertModule,
} from '@ng-bootstrap/ng-bootstrap';
import { TabsModule } from 'ngx-bootstrap/tabs';
// import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import { SelectDropDownModule } from 'ngx-select-dropdown';
import { ProfileComponent } from './profile/profile.component';
import { SquaresBgComponent } from './squares-bg/squares-bg.component';
import { MypostsComponent } from './profile/myposts/myposts.component';
import { QuestionsComponent } from './questions/questions.component';
import { AddAnswerComponent } from './add-answer/add-answer.component';
import { MyDoctorsComponent } from '../shared/profile/my-doctors/my-doctors.component';
// import { MatFormFieldModule } from '@angular/material/form-field';

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
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { SavedPostsComponent } from './profile/saved-posts/saved-posts.component';
import { EditProfileComponent } from './profile/edit-profile/edit-profile.component';
import { DialogComponent } from './dialog/dialog.component';

import { DrugDialogComponent } from './drug-dialog/drug-dialog.component';

import { MyfollowersComponent } from './profile/myfollowers/myfollowers.component';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { AddQuestionComponent } from './add-question/add-question.component';
import { LifeStyleDialogComponent } from './life-style-dialog/life-style-dialog.component';
import { PasswdDialogComponent } from './passwd-dialog/passwd-dialog.component';
import { AddPostComponent } from './add-post/add-post.component';
import { DoctorModule } from '../doctor/doctor.module';
import { MentionedquestionsComponent } from '../doctor/mentionedquestions/mentionedquestions.component';

@NgModule({
  declarations: [
    HomeComponent,
    ProfileComponent,
    SquaresBgComponent,
    MypostsComponent,
    QuestionsComponent,
    AddAnswerComponent,
    SavedPostsComponent,
    EditProfileComponent,
    DialogComponent,

    DrugDialogComponent,

    MyDoctorsComponent,
    MyfollowersComponent,
    AddQuestionComponent,
    LifeStyleDialogComponent,
    PasswdDialogComponent,
    AddPostComponent,
    MentionedquestionsComponent,
  ],
  imports: [
    NgbPaginationModule,
    NgbAlertModule,
    TabsModule,
    BsDropdownModule,
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
    MatTableModule,
    MatInputModule,
    MatSelectModule,
    RouterModule,
    // DoctorModule,

    Ng2SearchPipeModule,
  ],
  exports: [
    HomeComponent,
    ProfileComponent,
    SquaresBgComponent,
    MypostsComponent,
    QuestionsComponent,
    AddAnswerComponent,
    SavedPostsComponent,
  ],
})
export class SharedModule {}
