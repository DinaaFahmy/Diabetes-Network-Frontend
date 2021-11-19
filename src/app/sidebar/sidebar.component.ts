import { Component, OnInit } from '@angular/core';
import { TokenService } from '../_services/token.service';
import { AccountService } from '../_services/account.service';
import { TestDialogComponent } from '../patient/test-dialog/test-dialog.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css'],
})
export class SidebarComponent implements OnInit {
  patient: boolean = false;
  doctor: boolean = false;

  constructor(
    private dialog: MatDialog,
    private token: TokenService // ,private acc:AccountService
  ) {
    this.patient = this.token.isPatient();
    this.doctor = this.token.isDoctor();
  }

  ngOnInit(): void {}
  addtest() {
    const dialogRef = this.dialog.open(TestDialogComponent, {
      panelClass: ['col-12', 'col-md-4', 'col-sm-12'],
    });

    dialogRef.afterClosed().subscribe((result) => {
      console.log(result);
      if (result != undefined) {
        this.ngOnInit();
        // console.log(this.checkup);
      }
    });
  }
  // logout() {
  //   this.acc.logout();
  // }
  // loggedin() {
  //   this.acc.loggedin();
  // }
}
