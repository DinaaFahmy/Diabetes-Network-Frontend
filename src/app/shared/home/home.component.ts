import { Component, OnInit } from '@angular/core';
import { PostModel } from '../../_models/Posts.model';
import { QuestionModel } from '../../_models/Question.model';
import { CategoriesModel } from '../../_models/Categories.model';
import { ReactionModel } from '../../_models/Reactions.model';
import { CategoryService } from '../../_services/category.service';
import { PostService } from '../../_services/post.service';
import { QuestionService } from '../../_services/Question.services';
import { ReactionService } from '../../_services/reaction.service';
import { AddQuestionComponent } from '../add-question/add-question.component';
import { AddPostComponent } from '../add-post/add-post.component';
import { of, concat } from 'rxjs';
import { commentModel } from 'src/app/_models/comment.model';
import { DoctorService } from 'src/app/_services/doctor.service';
import { MatDialog } from '@angular/material/dialog';
import { TokenService } from 'src/app/_services/token.service';
import { AddAnswerComponent } from '../add-answer/add-answer.component';
import { ToastrService } from 'ngx-toastr';

import { MatSelectModule } from '@angular/material/select';
import { Router } from '@angular/router';

export interface DialogData {
  key: string;
  value: string;
  id: number;
  ctg_name: string;
  react_name: string;
}

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  p: PostModel = new PostModel();
  role: string;
  userID: number;

  q: string;
  ques: QuestionModel = new QuestionModel();
  // p_arr: PostModel[] = [];
  p_arr: any;
  c: CategoriesModel[] = [];
  r: ReactionModel[] = [];
  ctg_ids: any[];
  file_img: File = null;
  img_url: String = '/assets/img/';

  comment: string;
  userId: number;
  CommentModel: commentModel = new commentModel();
  dr_id: number;
  saved_posts_arr: PostModel[] = [];
  ids: number[] = [];

  constructor(
    private c_serv: CategoryService,
    private r_ser: ReactionService,
    private p_serv: PostService,
    private serv: DoctorService,
    public dialog: MatDialog,
    public tokserv: TokenService,
    public q_serv: QuestionService,
    private toastr: ToastrService,
    private router: Router,
    private token: TokenService
  ) {}

  openDialog2(id: number, i: number, key: string): void {
    const dialogRef = this.dialog.open(AddAnswerComponent, {
      width: '250px',
      data: { key: key, value: this.comment },
    });
    console.log(id);
    dialogRef.afterClosed().subscribe((result) => {
      console.log(result);
      if (result != undefined) {
        this.comment = result;
        this.CommentModel.Comment = result;
        this.CommentModel.PostID = id;
        console.log(id);
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

  val(e) {
    console.log(e.target.value);
  }

  profilecheck(userId, type) {
    this.userID = this.tokserv.getUserId();
    console.log(userId);
    console.log(this.userID);

    if (this.userID == userId) return this.router.navigate(['myprofile']);
    else return this.router.navigate(['/profile/', userId, type]);
  }

  ngOnInit(): void {
    this.role = this.tokserv.getRole();
    this.ctg_ids = [];
    this.ids = [];
    this.saved_posts_arr = [];
    this.p_serv.getSavedPosts().subscribe((a) => {
      this.saved_posts_arr = a;
      console.log(a);
      for (var i = 0; i < a.length; i++) {
        this.ids.unshift(Object.values(a[i])[0]);
      }
    });
    console.log(this.ids);
    this.c_serv.getCategory().subscribe((a) => {
      this.c = a;
    });
    this.r_ser.getReactions().subscribe((a) => {
      this.r = a;
    });
    this.p_serv.getRandomPosts().subscribe((a) => {
      this.p_arr = a;
      console.log('posts');
      console.log(a);
    });
    this.check_saved_posts();

    this.checkmyPosts();
  }
  checkmyPosts() {
    this.userID = this.tokserv.getUserId();
    var x = document.getElementsByTagName('h2');
    var y = Array.from(x);
    let x_arr = [];
    for (var i = 0; i < y.length; i++) {
      x_arr.push(y[i].getAttribute('id'));
    }
    console.log(x_arr);
  }
  add() {
    this.p_serv.addPost(this.p).subscribe((a) => {
      console.log(a);
      this.toastr.success('Hello world!', 'Toastr fun!');
    });
    console.log(this.p);
  }
  filterposts() {
    if (this.ctg_ids.length < 1) {
      this.p_serv.getRandomPosts().subscribe((a) => {
        this.p_arr = a;
        console.log(a);
      });
    } else {
      this.p_serv.getPosts(-1, this.ctg_ids).subscribe((a) => {
        console.log(a);
        this.p_arr = a;
      });
    }
    console.log(this.ctg_ids);
  }
  getLastPostID() {
    var cd = document.getElementsByName('post_card');
    var id = cd[cd.length - 1].firstElementChild.innerHTML;
    return parseInt(id);
  }
  showMore() {
    if (this.ctg_ids.length < 1) {
      //this.p_serv.getRandomPosts().subscribe(a=>{this.p_arr=a;})
      //this.p_serv.getPosts(this.getLastPostID(),[1,2,3,4,5,6,7,8,9,10]).subscribe(a=>{this.p_arr=a;})

      concat(
        of(
          this.p_serv.getRandomPosts().subscribe((a) => {
            this.p_arr = a;
          })
        ),
        of(
          this.p_serv
            .getPosts(this.getLastPostID(), [1, 2, 3, 4, 5, 6, 7, 8, 9, 10])
            .subscribe((a) => {
              this.p_arr = a;
              console.log(a);
            })
        )
      ).subscribe(console.log);
    } else {
      this.p_serv
        .getPosts(this.getLastPostID(), this.ctg_ids)
        .subscribe((a) => {
          this.p_arr = a;
        });
    }
  }

  clickItem(e) {
    if (e.style.background == 'lightgrey') {
      var i = this.ctg_ids.indexOf(e.value);
      e.style.background = 'transparent';
      this.ctg_ids.splice(i, 1);
    } else {
      this.ctg_ids.push(e.value);
      e.style.background = 'lightgrey';
    }
  }
  savePost(e) {
    console.log(e.target.value);
    for (var i = 0; i < this.ids.length; i++) {
      if (e.target.value == this.ids[i]) {
        // this.toastr.warning('المنشور محفوظ بالفعل');
        alert('المنشور محفوظ بالفعل');
      } else {
        this.p_serv.savePost(e.target.value).subscribe();
        // this.toastr.info('تم حفظ المنشور');
        // alert("تم حفظ المنشور");
        // break;
      }
    }
  }
  check_saved_posts() {
    var btns = document.getElementsByClassName('save');
    // for(var i=0; i<this.ids.length; i++){
    for (var x = 0; x < btns.length; x++) {
      if (this.ids.includes(btns[x]['value'])) {
        btns[x].setAttribute('hidden', 'true');
      }
    }
  }
  deletpost(i) {
    this.serv.Getuserid().subscribe((a) => {
      this.userID = a;

      if (this.userID == this.p_arr[i].userID) {
        console.log('myid ' + a);
        this.serv.deletepost(this.p_arr[i].postId).subscribe((a) => {
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
      this.userID = a;

      if (this.userID == this.p_arr[postindex].comments[comindex].userID) {
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
  // selectFile(event){
  //   if (event.target.files && event.target.files[0]) {

  //     var reader = new FileReader();
  //     reader.readAsDataURL(event.target.files[0]);// read file as data url

  //    var str= event.target.value.replace("C:\\fakepath\\", "");
  //     console.log(event.target.result);

  //     reader.onload = (event:any) => { // called once readAsDataURL is completed
  //       this.img_url = event.target.result;
  //     }

  //   }
  // }
}
