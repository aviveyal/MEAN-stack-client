import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";
import {AuthService} from "../../services/auth.service";
import { ViewChild, ElementRef } from '@angular/core';
import $ from 'jquery';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  @ViewChild('myCanvas') canvasRef: ElementRef;
  user:Object;
  ctx: CanvasRenderingContext2D ;

  constructor(public authService:AuthService, private router:Router) { }

  ngOnInit() {
    this.ctx = this.canvasRef.nativeElement.getContext('2d');


    this.authService.getProfile().subscribe(profile => {
        this.user = profile.user;
      },
      err => {
        console.log(err);
        return false;
      });
    this.ctx.beginPath();
    this.ctx.moveTo(250, 60);
    this.ctx.lineTo(63.8, 126.4);
    this.ctx.lineTo(92.2, 372.6);
    this.ctx.lineTo(250, 460);
    this.ctx.lineTo(407.8, 372.6);
    this.ctx.lineTo(436.2, 126.4);
    this.ctx.moveTo(250, 104.2);
    this.ctx.lineTo(133.6, 365.2);
    this.ctx.lineTo(177, 365.2);
    this.ctx.lineTo(200.4, 306.8);
    this.ctx.lineTo(299.2, 306.8);
    this.ctx.lineTo(325.2, 365.2);
    this.ctx.lineTo(362.6, 365.2);
    this.ctx.lineTo(250, 104.2);
    this.ctx.moveTo(304, 270.8);
    this.ctx.lineTo(216, 270.8);
    this.ctx.lineTo(250, 189);
    this.ctx.lineTo(284, 270.8);
    this.ctx.clip('evenodd');

    this.ctx.beginPath();
    this.ctx.fillStyle = '#DD0031';
    for (let i=0 ; i < 50000 ; i++) {
      let x = Math.random() * 500;
      let y = Math.random() * 500;
      this.ctx.moveTo(x, y);
      this.ctx.arc(x, y, 1, 0, Math.PI * 2);
    }
    this.ctx.fill();


  }

}
