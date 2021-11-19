import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Subject, throwError, of } from 'rxjs';
import {
  map,
  debounceTime,
  distinctUntilChanged,
  switchMap,
  catchError,
  retryWhen,
  retry,
} from 'rxjs/operators';
import { SearchService } from '../_services/search.service';
import { TokenService } from '../_services/token.service';
import { Route } from '@angular/compiler/src/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css'],
})
export class SearchComponent implements OnInit {
  public loading: boolean;
  public searchTerm = new Subject<string>();
  public searchResults: any;
  public paginationElements: any;
  public errorMessage: any;
  public page: any;
  term: string;
  userId: number;

  constructor(
    private searchService: SearchService,
    private token: TokenService,
    private router: Router
  ) {}

  public searchForm = new FormGroup({
    search: new FormControl('', Validators.required),
  });

  public search() {
    this.searchTerm
      .pipe(
        map((e: any) => {
          //console.log(e.target.value);
          return e.target.value;
        }),
        debounceTime(400),
        distinctUntilChanged(),
        switchMap((term) => {
          this.loading = true;
          return this.searchService.search(term);
        }),
        catchError((e) => {
          //handle the error and return it
          console.log(e);
          this.loading = false;
          this.errorMessage = e.message;
          return throwError(e);
        })
      )
      .subscribe((v) => {
        this.loading = false;
        //return the results and pass the to the paginate module
        this.searchResults = v;
        this.paginationElements = this.searchResults;
        console.log(this.paginationElements);
      });
  }
  profilecheck(userId, type) {
    if (this.userId == userId) return this.router.navigate(['myprofile']);
    else return this.router.navigate(['/profile/', userId, type]);
  }

  ngOnInit() {
    this.search();
    this.userId = this.token.getUserId();
    console.log(this.userId);
  }
}
