import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './account/login/login.component';
import { RegisterAsPatientComponent } from './account/register-as-patient/register-as-patient.component';
import { RegisterAsDoctorComponent } from './account/register-as-doctor/register-as-doctor.component';
import { IndexComponent } from './pages/index/index.component';
import { ComponentsComponent } from './components/components.component';
import { AuthGuard } from './_Gaurds/auth.guard';
import { DoctorGuard } from './_Gaurds/doctor.guard';
import { PatientGuard } from './_Gaurds/patient.guard';
import { HomeComponent } from './shared/home/home.component';
import { ProfileComponent } from './shared/profile/profile.component';
import { MypostsComponent } from './shared/profile/myposts/myposts.component';
import { QuestionsComponent } from './shared/questions/questions.component';
import { EditProfileComponent } from './shared/profile/edit-profile/edit-profile.component';
import { EditDoctorProfileComponent } from './doctor/edit-doctor-profile/edit-doctor-profile.component';
import { DrProfileComponent } from './profiles/dr-profile/dr-profile.component';
import { CheckUpsComponent } from './patient/check-ups/check-ups.component';
import { MyDoctorsComponent } from './shared/profile/my-doctors/my-doctors.component';
import { LandingPageComponent } from './landing-page/landing-page.component';
import { MentionedquestionsComponent } from './doctor/mentionedquestions/mentionedquestions.component';
import { SearchComponent } from './search/search.component';
// import { BaseComponent } from './signal-r/base/base.component';
import { TestsComponent } from './patient/tests/tests.component';
import { ChatComponent } from './signal-r/chat/chat.component';
import { ChartForDrComponent } from './chart-for-dr/chart-for-dr.component';
import { ChartComponent } from './chart/chart.component';

const routes: Routes = [
  { path: 'landingpage', component: LandingPageComponent },
  { path: 'timeline', component: HomeComponent, canActivate: [AuthGuard] },
  { path: 'login', component: LoginComponent },
  { path: 'registerasdoctor', component: RegisterAsDoctorComponent },
  { path: 'registeraspatient', component: RegisterAsPatientComponent },
  { path: 'myprofile', component: ProfileComponent, canActivate: [AuthGuard] },
  { path: 'post', component: MypostsComponent, canActivate: [AuthGuard] },
  { path: 'q', component: QuestionsComponent, canActivate: [AuthGuard] },
  { path: 'charts', component: ChartComponent, canActivate: [AuthGuard] },

  {
    path: 'profile/:id/:type',
    component: DrProfileComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'charts/:id/:type',
    component: ChartForDrComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'test/:id/:type',
    component: TestsComponent,
  },

  { path: 'search', component: SearchComponent },
  {
    path: '',
    runGuardsAndResolvers: 'always',
    canActivate: [DoctorGuard, AuthGuard],
    children: [
      { path: 'd', component: EditDoctorProfileComponent },
      { path: 'mention', component: MentionedquestionsComponent },
    ],
  },
  {
    path: '',
    runGuardsAndResolvers: 'always',
    canActivate: [PatientGuard, AuthGuard],
    children: [
      { path: 'p', component: EditProfileComponent },
      { path: 'checkups', component: CheckUpsComponent },
    ],
  },
  {
    path: '',
    runGuardsAndResolvers: 'always',
    canActivate: [PatientGuard, AuthGuard],
    children: [
      { path: 'myDoctors', component: MyDoctorsComponent },
      {
        path: 'test',
        component: TestsComponent,
      },
    ],
  },

  { path: 'index', component: IndexComponent },
  { path: 'try', component: ComponentsComponent },
  {
    path: 'Chat/:id',
    component: ChatComponent,
  },
  {
    path: '**',
    redirectTo: 'landingpage',
    pathMatch: 'full',
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
