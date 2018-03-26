import {Component, Input, OnInit} from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { SongService } from '../../services/songs.service';
import { Router } from '@angular/router';
import {Song} from "../../models/Song";
import {User} from "../../models/User";


@Component({
  moduleId: module.id ,
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})

export class ProfileComponent implements OnInit {
  user : User ;
  artistID: string;
  songs: Song[];
  songID: string;
  playedCount: number;
  @Input () topSong: Song;

  constructor(private authService: AuthService, private songService: SongService) {
  }

  ngOnInit() {
    this.authService.getProfile().subscribe(profile => {
      this.user = profile.user;
      // this.artistID = profile.user._id;
      this.songService.getLoggedInUserSongs(profile.user._id).subscribe(songsList => {
        this.songs = songsList;
      });

      this.songService.getMaxPlayedCount().subscribe(results=> {
        for(var i=0;i<results.length;i++){
          if(results[i]._id == this.user._id){
            this.playedCount = results[i].MaxPlayedCount;
            this.songID = results[i].songID
            this.songService.getSongByID(this.songID).subscribe( song => {
              this.topSong = song;
            });
          }
        }
4
      });

    });


  }

  deleteSong(id){
    console.log("Do something with the notification (evt) sent by the child!");

    this.songService.getSongByID(id).subscribe(result => {

        if(result.artistID == this.user._id) {
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

  }
}
