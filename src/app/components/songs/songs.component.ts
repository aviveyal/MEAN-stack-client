import {Component, OnInit, NgZone, EventEmitter, Output, OnDestroy} from '@angular/core';
import {SongService} from '../../services/songs.service'
import {Song} from "../../models/Song";
import {AuthService} from "../../services/auth.service";
import {Router} from "@angular/router";
import { NotificationService } from '../../services/notification.service';
import {FlashMessagesService} from "angular2-flash-messages";


@Component({
    moduleId: module.id ,
    selector: 'songs',
    templateUrl: 'songs.component.html',
    styleUrls: ['songs.component.css'],

})
export class SongsComponent implements OnInit  {
    songs : Song[];
    name : string;
    album: string;
    artistID: string;
    length: string;
    songImage: string;
    loggedInID :string ;
    num : number;
    connection;

  // getNotification(evt) {
  //   console.log("Do something with the notification (evt) sent by the child!");
  // }
    ngOnInit() {
      // this.songService.getSongs()
      //   .subscribe(songsList => {
      //     this.songs = songsList;
      //   });
    }

    constructor( private songService : SongService,private zone:NgZone,private router:Router, private authService:AuthService,private flashMessage:FlashMessagesService , private notificationService:NotificationService){
        this.songService.getSongs()
             .subscribe(songsList => {
                 this.songs = songsList;
             });


    }



  deleteSong(id){
    console.log("Do something with the notification (evt) sent by the child!");

    this.songService.getSongByID(id).subscribe(result => {
      this.authService.getProfile().subscribe(profile => {
        this.loggedInID = profile.user._id;

      if(result.artistID == this.loggedInID) {
        //var _songs = this.songs;
        this.songService.deleteSong(id).subscribe(data => {
             if (data.n == 1) {
            for (var i = 0; i < this.songs.length; i++) {
              if (this.songs[i]._id == id) {
                this.songs.splice(i,1);
                       break;

              }
            }
         }

        });
      }
    });
    });
  }

}
