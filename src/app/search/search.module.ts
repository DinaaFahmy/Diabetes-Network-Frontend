import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SearchRoutingModule } from './search-routing.module';
import { SearchComponent } from './search.component';
import { ReactiveFormsModule } from '@angular/forms';
import { NgxPaginationModule } from 'ngx-pagination';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { Router, RouterModule } from '@angular/router';

@NgModule({
  imports: [
    SearchRoutingModule,
    ReactiveFormsModule,
    CommonModule,
    NgxPaginationModule,
    Ng2SearchPipeModule,

    RouterModule,
  ],
  declarations: [SearchComponent],
})
export class SearchModule {}
