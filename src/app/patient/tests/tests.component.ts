import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { PatientService } from 'src/app/_services/patient.service';
import { MatDialog } from '@angular/material/dialog';
import { TokenService } from 'src/app/_services/token.service';
import { ActivatedRoute } from '@angular/router';
import { AnyARecord } from 'dns';
import { TestDialogComponent } from '../test-dialog/test-dialog.component';

@Component({
  selector: 'app-tests',
  templateUrl: './tests.component.html',
  styleUrls: [
    '../check-ups/check-ups.component.css',
    '../check-ups/check-ups.component.scss',
  ],
  encapsulation: ViewEncapsulation.ShadowDom,
})
export class TestsComponent implements OnInit {
  type1: any;
  type2: any;
  AC: any;
  id: any;
  medication: any;
  chart = [];
  test_result = [];
  test_date = [];

  public title: any;
  public type: any;
  public data: any;
  public options: any;
  public columnNames: any;
  width: any;
  height: any;

  constructor(
    public serv: PatientService,
    private dialog: MatDialog,
    public route: ActivatedRoute,
    private tokserv: TokenService
  ) {}
  add() {
    const dialogRef = this.dialog.open(TestDialogComponent, {
      panelClass: ['col-12', 'col-md-4', 'col-sm-12'],
    });

    dialogRef.afterClosed().subscribe((result) => {
      console.log(result);
      this.ngOnInit();
      if (result != undefined) {
        console.log(result);
      }
    });
  }
  delete(x: any, i: number) {
    this.serv.deletetest(x).subscribe((a) => {
      console.log(a);
      if (x.type == 0) {
        this.AC.splice(i, 1);
      } else if (x.type == 1) {
        this.type1.splice(i, 1);
      } else if (x.type == 2) {
        this.type2.splice(i, 1);
      }
    });
  }

  ngOnInit(): void {
    //     this.serv.getTests(1).subscribe((res) => {
    //       res.forEach(el => {
    //         this.test_result.push(Number(el.result));
    //       });
    //       res.forEach(el => {
    //         this.test_date.push(new Date(el.date).toDateString().slice(4,15));
    //       });
    //     console.log(this.test_result);
    //  this.title = 'Average Temperatures of Cities';
    //    this.type = 'LineChart';
    //    this.data =[
    //     [this.test_result[0],this.test_result[0]],
    //    ];

    //   this. columnNames =['Month'];
    //    this.options = {
    //      hAxis: {
    //         title: 'التاريخ'
    //      },
    //      vAxis:{
    //         title: 'نتيجة التحليل'
    //      },
    //   };
    //   this.width = 550;
    //   this.height = 400;

    //     });

    if (this.tokserv.getRole() == 'Patient') {
      this.serv.getTests(1).subscribe((a) => {
        this.type1 = a;
        console.log(a);
      });
      this.serv.getTests(2).subscribe((a) => {
        this.type2 = a;
        console.log(a);
      });
      this.serv.getTests(0).subscribe((a) => {
        this.AC = a;
        console.log(a);
      });
    } else if (this.tokserv.getRole() == 'Doctor') {
      this.id = this.route.snapshot.paramMap.get('id');
      this.serv.getTestsfordoc(this.id, 1).subscribe((a) => {
        this.type1 = a;
        console.log(a);
      });
      this.serv.getTestsfordoc(this.id, 2).subscribe((a) => {
        this.type2 = a;
        console.log(a);
      });
      this.serv.getTestsfordoc(this.id, 0).subscribe((a) => {
        this.AC = a;
        console.log(a);
      });
    }
  }
}
