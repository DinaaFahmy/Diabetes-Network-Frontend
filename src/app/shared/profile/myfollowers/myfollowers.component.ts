import { Component, OnInit } from '@angular/core';
import { DrFollowers } from 'src/app/_Models/dr-followers.model';
import { DoctorFollowersService } from 'src/app/_services/doctor-followers.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-myfollowers',
  templateUrl: './myfollowers.component.html',
  styleUrls: ['./myfollowers.component.css'],
})
export class MyfollowersComponent implements OnInit {
  drfollowers: DrFollowers[];
  userName: string;
  id;

  constructor(
    private s: DoctorFollowersService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.s.getAllDrFollowers().subscribe((a) => {
      this.drfollowers = a;
      //console.log(a);
    });
  }
}
