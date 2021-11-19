import { Component, OnInit } from '@angular/core';
import { Chart } from 'node_modules/chart.js';
import { PatientService } from 'src/app/_services/patient.service';

@Component({
  selector: 'app-chart',
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.css'],
})
export class ChartComponent implements OnInit {
  chart = [];
  test_result = [];
  test_date = [];

  chart2 = [];
  test_result2 = [];
  test_date2 = [];

  chart3 = [];
  test_result3 = [];
  test_date3 = [];

  constructor(public serv: PatientService) {}

  //    addData(chart, label, data) {
  //     chart.data.labels.push(label);
  //     chart.data.datasets.forEach((dataset) => {
  //         dataset.data.push(data);
  //     });
  //     chart.update();
  // }

  //  removeData(chart) {
  //     chart.data.labels.pop();
  //     chart.data.datasets.forEach((dataset) => {
  //         dataset.data.pop();
  //     });
  //     chart.update();
  // }

  //   changeDate(e){

  //     var new_arr=[];

  //       for(var k=0;k<this.test_date2.length;k++){
  //         if(this.test_date2[k].slice(0,3) == e.target.value){
  //         new_arr.push(this.test_date2[k]);}}

  //         this.removeData(this.chart2);
  //         this.addData(this.chart2,new_arr,this.test_result2);

  //   }
  ngOnInit(): void {
    var ctx = document.getElementById('myChart');
    var ctx2 = document.getElementById('myChart2');
    var ctx3 = document.getElementById('myChart3');

    const monthNames = [
      'January',
      'February',
      'March',
      'April',
      'May',
      'June',
      'July',
      'August',
      'September',
      'October',
      'November',
      'December',
    ];
    const d = new Date();

    this.serv.getTests(1).subscribe((res) => {
      console.log(res);
      res.forEach((el) => {
        this.test_result.push(Number(el.result));
      });
      res.forEach((el) => {
        this.test_date.push(new Date(el.date).toDateString().slice(4, 15));
      });

      // var new_arr=[];
      //   for(var k=0;k<this.test_date.length;k++){
      //   if(this.test_date[k].slice(0,3) == monthNames[d.getMonth()].slice(0,3)){
      //   new_arr.push(this.test_date[k]);
      //   }}

      // new_arr.sort(function (a, b) {
      //       if (a.slice(4,6) > b.slice(4,6)) return 1;
      //       if (a.slice(4,6) < b.slice(4,6)) return -1;
      //       return 0;
      //     });
      //   console.log(new_arr);

      this.chart = new Chart(ctx, {
        type: 'line',
        data: {
          labels: this.test_date.slice(
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

    this.serv.getTests(2).subscribe((res) => {
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

    this.serv.getTests(0).subscribe((res) => {
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
