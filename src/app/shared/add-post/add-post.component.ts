import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CategoriesModel } from '../../_models/Categories.model';
import { CategoryService } from '../../_services/category.service';
import { ReactionModel } from '../../_models/Reactions.model';
import { ReactionService } from '../../_services/reaction.service';
import { PostModel } from '../../_models/Posts.model';
import { PostService } from '../../_services/post.service';
import { ToastrService } from 'ngx-toastr';
import { ProfileComponent, DialogData } from '../profile/profile.component';

@Component({
  selector: 'app-add-post',
  templateUrl: './add-post.component.html',
  styleUrls: ['./add-post.component.css'],
})
export class AddPostComponent implements OnInit {
  c: CategoriesModel[] = [];
  r: ReactionModel[] = [];
  p: PostModel = new PostModel();
  constructor(
    private c_serv: CategoryService,
    private r_serv: ReactionService,
    private p_serv: PostService,
    private toastr: ToastrService,
    public dialogRef: MatDialogRef<ProfileComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData
  ) {}
  onNoClick(): void {
    this.dialogRef.close();
  }
  ngOnInit(): void {
    this.c_serv.getCategory().subscribe((a) => {
      this.c = a;
    });
    this.r_serv.getReactions().subscribe((a) => {
      this.r = a;
    });
  }
  getCtgName(e) {
    this.data.ctg_name = e.value;
  }
  getReactName(e) {
    this.data.react_name = e.value;
  }
  add() {
    this.p_serv.addPost(this.p).subscribe(
      (a) => {
        console.log(a);
        this.data.post_arr.push(this.p);
        console.log(this.data.post_arr);
        this.toastr.success('تم إضافة المنشور');
      },
      (error) => {
        console.log(error);
        this.toastr.error('error');
      }
    );
    console.log(this.p);
    // window.location.reload();
  }
}
