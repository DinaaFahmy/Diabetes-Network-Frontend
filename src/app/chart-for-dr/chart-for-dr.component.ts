import { Component, OnInit } from '@angular/core';
import { Chart } from 'node_modules/chart.js';
import { PatientService } from 'src/app/_services/patient.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-chart-for-dr',
  templateUrl: './chart-for-dr.component.html',
  styleUrls: ['./chart-for-dr.component.css'],
})
export class ChartForDrComponent implements OnInit {
  chart = [];
  test_result = [];
  test_date = [];

  chart2 = [];
  test_result2 = [];
  test_date2 = [];

  chart3 = [];
  test_result3 = [];
  test_date3 = [];

  id: any;

  constructor(public serv: PatientService, private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.id = this.route.snapshot.paramMap.get('id');

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
          labels: this.test_date.splice(
            this.test_date.length - 30,
            this.test_date.length
          ),
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
          labels: this.test_date2.splice(
            this.test_date2.length - 30,
            this.test_date2.length
          ),
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
          labels: this.test_date3.splice(
            this.test_date3.length - 7,
            this.test_date3.length
          ),
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
