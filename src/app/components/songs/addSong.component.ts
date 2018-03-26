import {Component, OnDestroy, OnInit} from '@angular/core';
import {SongService} from '../../services/songs.service'
import {Song} from "../../models/Song";
import { AuthService } from '../../services/auth.service';
import {FlashMessagesService} from "angular2-flash-messages";
import {ValidateService} from "../../services/validate.service";
import {Router} from "@angular/router";
import { NotificationService } from '../../services/notification.service';
@Component({
    moduleId: module.id ,
    selector: 'add-songs',
    templateUrl: 'addSong.component.html'

})



export class addSongsComponent implements OnInit ,OnDestroy{
  //  user:Object;
    songs : Song[];
    name : string;
    album: string;
    artistID: string;
    artistName :string;
    length: string;
    songImage: string;
    flag =0 ;
    message;
    connection;
  ngOnInit() {
    this.authService.getProfile().subscribe(profile => {
        this.artistID = profile.user._id;
        this.artistName = profile.user.artistName;
        console.log(this.artistID);
      },
      err => {
        console.log(err);
        return false;
      });

    this.connection = this.notificationService.getMessages().subscribe(msg => {
      this.flashMessage.show('New song added by '+ msg["text"], {cssClass: 'alert-success', timeout: 5000});
    })
  }
  ngOnDestroy() {
    if (this.connection) {
      this.connection.unsubscribe();
    }
  }
  sendMessage(name){
    this.notificationService.sendMessage(name);
    this.message = '';
  }


    constructor( private songService : SongService,private notificationService:NotificationService,private router: Router,private validateService:ValidateService, private authService:AuthService, private flashMessage:FlashMessagesService,){
        this.songService.getSongs()
            .subscribe(songsList => {
                this.songs = songsList;
            });
    }

    addSong(event) {
      this.flag=0;

      if (this.name == undefined || this.album ==undefined|| this.length == undefined || this.songImage == undefined) {
        this.flashMessage.show('Please fill in all fields', {cssClass: 'alert-danger', timeout: 3000});
        this.flag = 1;
      }
      if (!this.validateService.validateTime(this.length)) {
        this.flashMessage.show('Please use a valid length', {cssClass: 'alert-danger', timeout: 3000});
        this.flag = 1;
      }
      if (!this.validateService.validateUrl(this.songImage)) {
        this.flashMessage.show('Please use a valid URL', {cssClass: 'alert-danger', timeout: 3000});
        this.flag = 1;
      }

      if (this.flag == 0) {

      event.preventDefault();
      var newSong = {
        name: this.name,
        artistID: this.artistID,
        length: this.length,
        album: this.album,
        songImage: this.songImage
      };
      this.songService.addSong(newSong)
        .subscribe((songData) => {
          this.sendMessage(this.artistName); // sent to server - socket.io
          this.flashMessage.show('You added new song successfully!', {cssClass: 'alert-success', timeout: 1000});
          this.songs.push(songData); //no need
          this.router.navigate(['/songs']);

          this.name = '';
          this.album = '';
          this.length = '';
          this.songImage = '';

        });
    }
    }

}
