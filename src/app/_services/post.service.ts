import { Injectable } from '@angular/core';
import { PostModel } from '../_models/Posts.model';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class PostService {
  productsArr: PostModel[] = [];
  addPost(p: PostModel) {
    return this.http.post<PostModel>(
      'http://localhost:51273/test/WritePost',
      p
    );
  }

  //Home page
  getRandomPosts() {
    return this.http.get<PostModel[]>('http://localhost:51273/rest/allPosts');
  }
  getPosts(post_id: number, ctg_ids: any[]) {
    let params = new HttpParams();
    for (let id of ctg_ids) {
      params = params.append('ctg', id);
    }

    return this.http.get<PostModel[]>(
      'http://localhost:51273/test/loadPosts/' + post_id,
      { params: params }
    );
  }

  //my profile
  getmyPosts() {
    return this.http.get<PostModel[]>('http://localhost:51273/test/myposts');
  }
savePost(post_id:number){
  return this.http.post('http://localhost:51273/rest/savePost/'+post_id,"");
}
  getSavedPosts() {
    return this.http.get<PostModel[]>(
      'http://localhost:51273/test/mysavedposts'
    );
  }

  constructor(private http: HttpClient) {}
}
