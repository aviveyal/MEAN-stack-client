import { Component, OnInit } from '@angular/core';
import {User} from "../../models/User";
import {SongService} from "../../services/songs.service";
import {AuthService} from "../../services/auth.service";

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {
   Users ? : User[];
 //  Users2 ? : User[];
   uploadedSong ? : string[];
   sortedUsers : User[];
  constructor( private songService:SongService ,private authService:AuthService) {
    this.Users =[];
    this.uploadedSong=[];
    this.sortedUsers =[];

      this.authService.getUsers().subscribe(users =>{
      this.Users =users;
      //this.Users2 =users; // backup in case search result missing users

      this.songService.topUser().subscribe(results =>
      {
        for(var i=0 ; i<results.length; i++) // run on result users
        {
          for(var j=0 ; j<users.length;j++){ //find all this user data by id - checking all users
            if(results[i]._id == users[j]._id)
            {
              this.sortedUsers[i]= users[j];
              this.sortedUsers[i].password = results[i].uploadingCount ; // using passeord field to show songs count
            }
          }
        }


      });

      });

  }

  ngOnInit() {


  }

}
