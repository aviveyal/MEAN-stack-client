import { Component, OnInit } from '@angular/core';
import {Router, ActivatedRoute, Params} from '@angular/router';
import {SongService} from "../../../services/songs.service";
import {Song} from "../../../models/Song";
import {AuthService} from "../../../services/auth.service";
import {FlashMessagesService} from "angular2-flash-messages";
import {ValidateService} from "../../../services/validate.service";
@Component({
  selector: 'app-song-update',
  templateUrl: './song-update.component.html',
  styleUrls: ['./song-update.component.css']
})
export class SongUpdateComponent implements OnInit {
  _id : string;
  name : string;
  album: string;
  artistID: string;
  artistName :string;
  length: string;
  songImage: string;
  loggedInID :string ;
  flag  = 0;
  constructor(private songService : SongService, private authService:AuthService,private validateService:ValidateService,private flashMessage:FlashMessagesService ,private router: Router, private activatedRoute :ActivatedRoute) { }

  ngOnInit() {
    //subscribe to router event
    this.activatedRoute.params.subscribe((params: Params) => {
      let songId = params['id'];

      this.songService.getSongByID(songId).subscribe(result => {
      console.log(this._id);
      this.album = result.album;
      this.length = result.length;
      this.songImage = result.songImage;
      this.name = result.name;
      this.artistID = result.artistID;
      this._id = result._id;

        this.authService.getProfile().subscribe(profile => {
          this.loggedInID = profile.user._id;
          if(this.loggedInID!= this.artistID)
          {
            this.router.navigate(['/songs']);
          }
        });
    })

    });


  }
  updateSong() {
    this.flag = 0;

    if (this.name == undefined || this.album == undefined || this.length == undefined || this.songImage == undefined) {
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

      // event.preventDefault();
      var _song = {
        _id: this._id,
        name: this.name,
        artistID: this.artistID,
        length: this.length,
        album: this.album,
        songImage: this.songImage
      };
      if (this.artistID == this.loggedInID) { //cant update song that you didn't upload
        this.songService.updateSong(_song).subscribe(song => {
          this.flashMessage.show('You updated ' + _song.name + ' successfully!', {cssClass: 'alert-success', timeout: 1000});

          this.name = "";
          this.album = "";
          this.artistID = "";
          this.length = "";
          this.songImage = "";
        });

        this.router.navigate(['/songs']);
      }
      else
        this.router.navigate(['/songs']);
    }
  }
}
