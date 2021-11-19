import { Component, OnInit, HostListener } from '@angular/core';

@Component({
  selector: 'app-squares-bg',
  templateUrl: './squares-bg.component.html',
  styleUrls: ['./squares-bg.component.css'],
})
export class SquaresBgComponent implements OnInit {
  constructor() {}
  @HostListener('document:mousemove', ['$event'])
  onMouseMove(e) {
    var squares1 = document.getElementById('square1');
    var squares2 = document.getElementById('square2');
    var squares3 = document.getElementById('square3');
    var squares4 = document.getElementById('square4');
    var squares5 = document.getElementById('square5');
    var squares6 = document.getElementById('square6');
    var squares7 = document.getElementById('square7');
    var squares8 = document.getElementById('square8');

    if (!(typeof e === 'undefined')) {
      var posX = e.clientX - window.innerWidth / 2;
      var posY = e.clientY - window.innerWidth / 6;
    }

    squares1.style.transform =
      'perspective(500px) rotateY(' +
      posX * 0.05 +
      'deg) rotateX(' +
      posY * -0.05 +
      'deg)';
    squares2.style.transform =
      'perspective(500px) rotateY(' +
      posX * 0.05 +
      'deg) rotateX(' +
      posY * -0.05 +
      'deg)';
    squares3.style.transform =
      'perspective(500px) rotateY(' +
      posX * 0.05 +
      'deg) rotateX(' +
      posY * -0.05 +
      'deg)';
    squares4.style.transform =
      'perspective(500px) rotateY(' +
      posX * 0.05 +
      'deg) rotateX(' +
      posY * -0.05 +
      'deg)';
    squares5.style.transform =
      'perspective(500px) rotateY(' +
      posX * 0.05 +
      'deg) rotateX(' +
      posY * -0.05 +
      'deg)';
    squares6.style.transform =
      'perspective(500px) rotateY(' +
      posX * 0.05 +
      'deg) rotateX(' +
      posY * -0.05 +
      'deg)';
    squares7.style.transform =
      'perspective(500px) rotateY(' +
      posX * 0.02 +
      'deg) rotateX(' +
      posY * -0.02 +
      'deg)';
    squares8.style.transform =
      'perspective(500px) rotateY(' +
      posX * 0.02 +
      'deg) rotateX(' +
      posY * -0.02 +
      'deg)';
  }

  ngOnInit(): void {}
}
