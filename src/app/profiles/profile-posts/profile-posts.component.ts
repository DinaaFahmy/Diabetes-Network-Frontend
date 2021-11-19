import { Component, OnInit, Input } from '@angular/core';
import { PostModel } from '../../_models/Posts.model';
import { QuestionModel } from '../../_models/Question.model';
import { QuestionService } from '../../_services/Question.services';
import { PostService } from '../../_services/post.service';
import { CategoriesModel } from '../../_models/Categories.model';
import { ReactionModel } from '../../_models/Reactions.model';
import { CategoryService } from '../../_services/category.service';
import { ReactionService } from '../../_services/reaction.service';
import { TokenService } from '../../_services/token.service';
import { DoctorService } from 'src/app/_services/doctor.service';
import { MatDialog } from '@angular/material/dialog';
import { AddAnswerComponent } from 'src/app/shared/add-answer/add-answer.component';
import { commentModel } from 'src/app/_models/comment.model';
import { PatientProfileService } from 'src/app/_services/patient-profile.service';

export interface DialogData {
  key: string;
  value: string;
}
@Component({
  selector: 'app-profile-posts',
  templateUrl: '../../shared/profile/myposts/myposts.component.html',
  styleUrls: ['../../shared/profile/myposts/myposts.component.css'],
})
export class ProfilePostsComponent implements OnInit {
  @Input() ID: number;
  myid: number;
  p: any;
  p_arr: any;
  ps_arr: PostModel[] = [];
  c: CategoriesModel[] = [];
  r: ReactionModel[] = [];
  q_arr: QuestionModel[] = [];
  userName: string;
  id;
  posts: any;
  comment: string;
  CommentModel: commentModel = new commentModel();
  constructor(
    private c_serv: CategoryService,
    private token: TokenService,
    private r_ser: ReactionService,
    private p_serv: PostService,
    private serv: DoctorService,
    public dialog: MatDialog,
    public tokserv: TokenService,
    public patientserv: PatientProfileService
  ) {}
  GoTOprofile(type: any, id: number) {
    if (type != null) window.location.assign('./profile/' + id + '/' + type);
  }
  openDialog(id: number, i: number, key: string): void {
    const dialogRef = this.dialog.open(AddAnswerComponent, {
      width: '250px',
      data: { key: key, value: '' },
    });
    console.log(id);
    dialogRef.afterClosed().subscribe((result) => {
      console.log(result);
      if (result != undefined) {
        this.comment = result;
        this.CommentModel.Comment = result;
        this.CommentModel.PostID = id;
        console.log(this.CommentModel);
        this.serv.Addcomment(this.CommentModel).subscribe((a) => {
          console.log(a);

          this.p_arr[i].comments.push({
            comment: a.comment,
            date: a.date,
            userName: this.tokserv.getUserName(),
          });
        });
      }
    });
  }
  ngOnInit(): void {
    this.id = this.ID;
    console.log(this.ID);
    console.log('ID');
    this.patientserv.getPatientPostsData(this.id).subscribe((a) => {
      this.p_arr = a;
      this.posts = a;
      console.log(a);
      console.log(this.p_arr);
    });
  }
  deletpost(i) {
    this.serv.Getuserid().subscribe((a) => {
      this.myid = a;
      console.log(this.myid);
      if (this.myid == this.posts[i].userId) {
        console.log('myid ' + a);
        this.serv.deletepost(this.posts[i].postId).subscribe((a) => {
          this.p_arr.splice(i, 1);
          console.log('delpost ' + a);
        });
      } else {
        alert('لا تملك الصلاحية للحذف');
      }
    });
  }

  deletecomment(postindex, comindex, commid) {
    this.serv.Getuserid().subscribe((a) => {
      this.myid = a;

      if (this.myid == this.p_arr[postindex].comments[comindex].userID) {
        console.log('id ' + a);
        this.p_arr[postindex].comments.splice(comindex, 1);
        this.serv
          .deletecomment(commid)
          .subscribe((a) => console.log('ifmycomment ' + a));
      } else {
        alert('لا تملك الصلاحية للحذف');
      }
    });
  }
}
