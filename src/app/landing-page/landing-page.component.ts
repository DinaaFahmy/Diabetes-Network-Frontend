import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-landing-page',
  templateUrl: './landing-page.component.html',
  styleUrls: ['./landing-page.component.css'],
})
export class LandingPageComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {
    // document.getElementsByClassName('sidebar')[0].setAttribute("hidden","true");
    // document.getElementById('search_btn').setAttribute("hidden","true");
    // document.getElementsByClassName('fa-search')[0].setAttribute("hidden","true");
    // document.getElementsByClassName('o')[0].setAttribute("hidden","true");
  }
}
