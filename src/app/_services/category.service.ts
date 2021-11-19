import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CategoriesModel } from '../_models/Categories.model';
@Injectable({
  providedIn: 'root',
})
export class CategoryService {
  categoryArr: CategoriesModel[] = [];

  getCategory() {
    return this.http.get<CategoriesModel[]>('http://localhost:51273/rest/ctg');
  }
  constructor(private http: HttpClient) {}
}
