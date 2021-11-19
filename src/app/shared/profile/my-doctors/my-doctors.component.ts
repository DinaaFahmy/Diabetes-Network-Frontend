import { Component, OnInit } from '@angular/core';
import { myDoctorsService } from '../../../_services/myDoctors.service';
import { DoctorModel } from '../../../_Models/Doctor.model';

@Component({
  selector: 'app-my-doctors',
  templateUrl: './my-doctors.component.html',
  styleUrls: ['./my-doctors.component.css'],
})
export class MyDoctorsComponent implements OnInit {
  d: DoctorModel = new DoctorModel();
  d_arr: DoctorModel[] = [];
  dr_id: number;
  follow_id: number;
  constructor(private d_serv: myDoctorsService) {}

  ngOnInit(): void {
    this.dr_id = 0;
    this.d_serv.getMyDoctors().subscribe((a) => {
      this.d_arr = a;
      console.log(a);
    });
  }
  changeAcess(e) {
    var res = confirm(
      'Are you sure you want to change access for this doctor?'
    );
    if (Number(e.target.value.split(',', 2)[1]) == 2) {
      //was approved
      if (res == true) {
        this.d_serv
          .updateAccess(Number(e.target.value.split(',', 1)), 0)
          .subscribe((a) => {
            console.log(a);
          });
        window.location.reload();
      }
    } else if (
      Number(e.target.value.split(',', 2)[1]) == 0 ||
      Number(e.target.value.split(',', 2)[1]) == 3
    ) {
      //wasn't approved
      if (res != false) {
        this.d_serv
          .updateAccess(Number(e.target.value.split(',', 1)), 2)
          .subscribe((a) => {
            console.log(a);
          });
        window.location.reload();
      }
    } else if (Number(e.target.value.split(',', 2)[1]) == 1) {
      //requested
      if (res != false) {
        this.d_serv
          .updateAccess(Number(e.target.value.split(',', 1)), 2)
          .subscribe((a) => {
            console.log(a);
          });
        window.location.reload();
      }
    }
  }
  unfollow_dr() {
    this.d_serv.unfollowDr(this.dr_id).subscribe((a) => {
      console.log(a);
      if (a == true) {
        var i = this.d_arr.findIndex((a) => a.DoctorId == this.dr_id);
        this.d_arr.splice(i, 1);
        this.d_serv.getMyDoctors().subscribe((a) => {
          this.d_arr = a;
        });
      } else {
        alert("couldn't unfollow doctor");
      }
    });
  }
  open_profile(e) {
    console.log(e.target.id);
  }
  val(e) {
    this.dr_id = e.target.value;
    var res = confirm('Are you sure you want to unfollow this doctor?');
    console.log(this.dr_id);
    if (res == true) {
      this.unfollow_dr();
    }
  }
}
