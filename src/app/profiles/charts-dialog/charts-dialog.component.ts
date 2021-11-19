import { Component, OnInit, Inject, ViewEncapsulation } from '@angular/core';
import { PatientService } from 'src/app/_services/patient.service';
import { ActivatedRoute } from '@angular/router';
import { TokenService } from 'src/app/_services/token.service';
import { DrProfileComponent } from '../dr-profile/dr-profile.component';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Chart } from 'node_modules/chart.js';

@Component({
  selector: 'app-charts-dialog',
  templateUrl: './charts-dialog.component.html',
  styleUrls: ['./charts-dialog.component.css'],
  encapsulation: ViewEncapsulation.ShadowDom,
})
export class ChartsDialogComponent implements OnInit {
  id: any;
  type1: any;
  type2: any;
  AC: any;

  chart = [];
  test_result = [];
  test_date = [];

  chart2 = [];
  test_result2 = [];
  test_date2 = [];

  chart3 = [];
  test_result3 = [];
  test_date3 = [];

  constructor(
    public dialogRef: MatDialogRef<DrProfileComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    public serv: PatientService,
    public route: ActivatedRoute,
    private tokserv: TokenService
  ) {
    this.id = this.data.id;
  }

  ngOnInit(): void {
    if (this.tokserv.getRole() == 'Doctor') {
      // this.serv.getTestsfordoc(this.id, 1).subscribe((a) => {
      //   this.type1 = a;
      //   console.log(a);
      // });
      // this.serv.getTestsfordoc(this.id, 2).subscribe((a) => {
      //   this.type2 = a;
      //   console.log(a);
      // });
      // this.serv.getTestsfordoc(this.id, 0).subscribe((a) => {
      //   this.AC = a;
      //   console.log(a);
      // });

      var ctx = document.getElementById('myChart');
      var ctx2 = document.getElementById('myChart2');
      var ctx3 = document.getElementById('myChart3');

      this.serv.getTestsfordoc(this.id, 1).subscribe((res) => {
        res.forEach((el) => {
          this.test_result.push(Number(el.result));
        });
        res.forEach((el) => {
          this.test_date.push(new Date(el.date).toDateString().slice(4, 15));
        });
        this.chart = new Chart(ctx, {
          type: 'line',
          data: {
            labels: this.test_date,
            datasets: [
              {
                data: this.test_result,
                borderColor: '#5CB0CE',
                // backgroundColor:'#A5D5EB',
                fill: false,
              },
            ],
          },
          options: {
            responsive: true,
            legend: {
              display: false,
            },
            scales: {
              xAxes: [
                {
                  display: true,
                },
              ],
            },
          },
        });
      });

      this.serv.getTestsfordoc(this.id, 2).subscribe((res) => {
        res.forEach((el) => {
          this.test_result2.push(Number(el.result));
        });
        res.forEach((el) => {
          this.test_date2.push(new Date(el.date).toDateString().slice(4, 15));
        });
        this.chart2 = new Chart(ctx2, {
          type: 'line',
          data: {
            labels: this.test_date2,
            datasets: [
              {
                data: this.test_result2,
                borderColor: '#5CB0CE',
                // backgroundColor:'#A5D5EB',
                fill: false,
              },
            ],
          },
          options: {
            responsive: true,
            legend: {
              display: false,
            },
            scales: {
              xAxes: [
                {
                  display: true,
                },
              ],
            },
          },
        });
      });

      this.serv.getTestsfordoc(this.id, 0).subscribe((res) => {
        res.forEach((el) => {
          this.test_result3.push(Number(el.result));
        });
        res.forEach((el) => {
          this.test_date3.push(new Date(el.date).toDateString().slice(4, 15));
        });
        this.chart3 = new Chart(ctx3, {
          type: 'line',
          data: {
            labels: this.test_date3,
            datasets: [
              {
                data: this.test_result3,
                borderColor: '#5CB0CE',
                // backgroundColor:'#A5D5EB',
                fill: false,
              },
            ],
          },
          options: {
            responsive: true,
            legend: {
              display: false,
            },
            scales: {
              xAxes: [
                {
                  display: true,
                },
              ],
            },
          },
        });
      });
    }
  }
}
