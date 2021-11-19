import { Component, OnInit } from '@angular/core';
import { PostModel } from '../../../_models/Posts.model';
import { PostService } from '../../../_services/post.service';
import { CategoriesModel } from '../../../_models/Categories.model';
import { ReactionModel } from '../../../_models/Reactions.model';
import { CategoryService } from '../../../_services/category.service';
import { ReactionService } from '../../../_services/reaction.service';
import { TokenService } from '../../../_services/token.service';
import { DoctorService } from 'src/app/_services/doctor.service';
import { MatDialog } from '@angular/material/dialog';
import { AddAnswerComponent } from '../../add-answer/add-answer.component';
import { commentModel } from 'src/app/_models/comment.model';

export interface DialogData {
  key: string;
  value: string;
}
@Component({
  selector: 'app-saved-posts',
  templateUrl: './../myposts/myposts.component.html',
  styleUrls: ['././../myposts/myposts.component.css'],
})
export class SavedPostsComponent implements OnInit {
  p: PostModel = new PostModel();
  myid: number;
  p_arr: PostModel[] = [];
  ps_arr: PostModel[] = [];
  c: CategoriesModel[] = [];
  r: ReactionModel[] = [];
  userName: string;
  comment: string;
  posts: any;
  CommentModel: commentModel = new commentModel();
  constructor(
    private c_serv: CategoryService,
    private token: TokenService,
    private r_ser: ReactionService,
    private p_serv: PostService,
    private serv: DoctorService,
    public dialog: MatDialog,
    public tokserv: TokenService
  ) {}

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
        this.CommentModel.PostID = this.posts[i].post_id;
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
  GoTOprofile(type: any, id: number) {
    window.location.assign('./profile/' + id + '/' + type);
  }
  ngOnInit(): void {
    this.c_serv.getCategory().subscribe((a) => {
      this.c = a;
    });
    this.r_ser.getReactions().subscribe((a) => {
      this.r = a;
    });
    this.userName = this.token.getUserName();
    this.p_serv.getSavedPosts().subscribe((a) => {
      this.p_arr = a;
      this.posts = a;
      console.log(a);
    });
  }
  deletpost(i) {
    this.serv.Getuserid().subscribe((a) => {
      this.myid = a;
      console.log(this.myid);
      if (this.myid == this.posts[i].user_id) {
        console.log('myid ' + a);
        console.log(this.posts[i].user_id);

        this.serv.deletepost(this.posts[i].post_id).subscribe((a) => {
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
