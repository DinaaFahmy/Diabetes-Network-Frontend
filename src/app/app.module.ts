import { BrowserModule, HammerModule } from '@angular/platform-browser';
import { NgModule, Component } from '@angular/core';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AccountModule } from './account/account.module';
import { PagesModule } from './pages/pages.module';
import { CommonModule } from '@angular/common';
import { ComponentsModule } from './components/components.module';
import { ExamplesModule } from './examples/examples.module';
// import { NavbarComponent } from './shared/navbar/navbar.component';
import { FormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { RouterModule } from '@angular/router';
// import { NavbarComponent } from './navbar/navbar.component';
import { NavbarModule } from './navbar/navbar.module';
import { SharedModule } from './shared/shared.module';
import { ErrorInterceptor } from './_Interceptor/error_Interceptor';
import { TokenInterceptor } from './_Interceptor/jwt.interceptor';
import { DoctorModule } from './doctor/doctor.module';
import { PatientModule } from './patient/patient.module';
import { ProfilesModule } from './profiles/profiles.module';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { SearchModule } from './search/search.module';
import { SidebarComponent } from './sidebar/sidebar.component';
import { LandingPageComponent } from './landing-page/landing-page.component';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatButtonModule } from '@angular/material/button';
import { MatListModule } from '@angular/material/list';
import { ToastrModule } from 'ngx-toastr';
// import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { SignalRModule } from './signal-r/signal-r.module';
import { ChartComponent } from './chart/chart.component';
import { ChartForDrComponent } from './chart-for-dr/chart-for-dr.component';

@NgModule({
  declarations: [
    AppComponent,
    SidebarComponent,
    LandingPageComponent,
    ChartForDrComponent,
  ],
  imports: [
    PagesModule,
    MatListModule,
    MatButtonModule,
    BrowserModule,
    ToastrModule.forRoot(),
    AppRoutingModule,
    BrowserAnimationsModule,
    AccountModule,
    MatSidenavModule,
    HttpClientModule,
    ComponentsModule,
    ExamplesModule,
    FormsModule,
    NgbModule,
    RouterModule,
    NavbarModule,
    SharedModule,
    DoctorModule,
    ProfilesModule,
    PatientModule,
    Ng2SearchPipeModule,
    SearchModule,
    // FontAwesomeModule,
    SignalRModule,
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: TokenInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
