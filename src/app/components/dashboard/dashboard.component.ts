import { Component, OnInit } from '@angular/core';
import {SongService} from "../../services/songs.service";
import {AuthService} from "../../services/auth.service";
import {StatisticsService} from "../../services/statistics.service";

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  //users:Object;

//  private statisticsService : StatisticsServicee;

  ngOnInit() {
    // this.statisticsService.getUsersCountSongs()
    //   .subscribe(usersCountSongs => {
    //     this.users = usersCountSongs;
    //   },
    //   err => {
    //     console.log(err);
    //     return false;
    //   });
  }

  // constructor( ){
  //
  // }

}
