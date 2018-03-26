import { Component, OnInit } from '@angular/core';
import { FacebookService, InitParams } from 'ngx-facebook';
@Component({
  moduleId : module.id,
  selector: 'app-facebook',
  templateUrl: './facebook.component.html',
  styleUrls: ['./facebook.component.css']
})
export class FacebookComponent implements OnInit {

  constructor(private fb: FacebookService) {

    let initParams: InitParams = {
      appId: '1928888677372718',
      xfbml: true,
      version: 'v2.9'
    };

    fb.init(initParams);

  }

  ngOnInit() {

  }

}
