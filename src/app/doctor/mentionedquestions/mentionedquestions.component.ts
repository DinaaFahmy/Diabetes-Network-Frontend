import { Component, OnInit } from '@angular/core';
import { DoctorService } from 'src/app/_services/doctor.service';
import { MatDialog } from '@angular/material/dialog';
import { QuestionService } from 'src/app/_services/Question.services';
import { TokenService } from 'src/app/_services/token.service';
import { AddAnswerComponent } from 'src/app/shared/add-answer/add-answer.component';
export interface DialogData {
  key: string;
  value: string;
}
@Component({
  selector: 'app-mentionedquestions',
  templateUrl: '../../shared/questions/questions.component.html',
  styleUrls: ['../../shared/questions/questions.component.css'],
})
export class MentionedquestionsComponent implements OnInit {
  questions: any;
  Answer: string;
  myid: number;
  filter: string[] = [];
  mention: boolean = true;
  constructor(
    public serv: DoctorService,
    public dialog: MatDialog,
    public tokserv: TokenService,
    public Qserv: QuestionService
  ) {}

  GoTOprofile(type: any, id: number) {
    if (type != null) window.location.assign('./profile/' + id + '/' + type);
  }
  getdocans(id: number, i: number) {
    this.filter[i] = 'أجابات الاطباء';
    this.Qserv.getDocAns(id).subscribe((a) => {
      console.log(a);
      this.questions[i].answers = a;
    });
  }
  getuserans(id: number, i: number) {
    this.filter[i] = 'أجابات المستخدمين';
    this.Qserv.getUserAns(id).subscribe((a) => {
      console.log(a);
      this.questions[i].answers = a;
    });
  }
  getallanss(id: number, i: number) {
    this.filter[i] = 'جميع الأجابات';
    this.Qserv.getAllAns(id).subscribe((a) => {
      console.log(a);
      this.questions[i].answers = a;
    });
  }
  noans(i: number) {
    this.filter[i] = 'بدون اجابات';
    this.questions[i].answers = [];
  }
  openDialog(id: number, i: number, key: string): void {
    const dialogRef = this.dialog.open(AddAnswerComponent, {
      width: '250px',
      data: { key: key, value: '' },
    });
    dialogRef.afterClosed().subscribe((result) => {
      console.log(result);
      if (result != undefined) {
        this.Answer = result;
        this.serv.Addanswer(result, id).subscribe((a) => {
          console.log(a);
          if (this.tokserv.isPatient()) {
            this.getuserans(id, i);
          } else this.getdocans(id, i);

          this.questions[i].answers.push({
            answer: a.answer,
            date: a.date,
            userName: this.tokserv.getUserName(),
          });
        });
      }
    });
  }
  ngOnInit(): void {
    this.serv.getdocMentionquestions().subscribe((a) => {
      this.questions = a;
      this.filter = new Array((this.questions as Array<any>).length);
      this.filter.fill('أجابات الاطباء');
      console.log('mention');

      console.log(this.questions);
      console.log(this.filter);
    });
  }
  deleteQuestion(i, questionID) {
    this.serv.Getuserid().subscribe((a) => {
      this.myid = a;

      if (this.myid == this.questions[i].userid) {
        console.log('id ' + a);
        this.serv.Deletequestion(questionID).subscribe((a) => {
          this.questions.splice(i, 1);
          console.log(a);
        });
      } else {
        alert('لا تملك الصلاحية للحذف');
      }
    });
  }
  deleteAnswer(quesindex, ansindex, answer_id) {
    this.serv.Getuserid().subscribe((a) => {
      this.myid = a;

      if (this.myid == this.questions[quesindex].answers[ansindex].userID) {
        console.log('id ' + a);

        this.serv
          .DeleteAnswer(this.questions[quesindex].answers[ansindex].id)
          .subscribe((a) => {
            this.questions[quesindex].answers.splice(ansindex, 1);
            console.log(a);
          });
      } else {
        alert('لا تملك الصلاحية للحذف');
      }
    });
  }
}
