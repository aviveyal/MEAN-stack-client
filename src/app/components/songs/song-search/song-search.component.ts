import { Component, OnInit } from '@angular/core';
import { Http, Headers } from '@angular/http';
import {SongService} from '../../../services/songs.service'
import {Song} from "../../../models/Song";
import {SongsComponent} from "../songs.component";
import {FlashMessagesService} from "angular2-flash-messages";
import {ValidateService} from "../../../services/validate.service";

@Component({
  selector: 'app-song-search',
  templateUrl: './song-search.component.html',
  styleUrls: ['./song-search.component.css']
})
export class SongSearchComponent implements OnInit {

  songs : Song[];
  songName : string;
  artistName : string;
  length :string;
  album : string;
  flag =0;

  constructor( private songService : SongService, private songComponent : SongsComponent,private validateService:ValidateService,private flashMessage:FlashMessagesService){
    this.album = '';
    this.songName = '';
    this.length = '';
  }

  ngOnInit() {
  }


  Search(event) {
    this.flag =0;
    if(this.length!=''){

    if (!this.validateService.validateTime(this.length))  {
      this.flashMessage.show('Please use a valid length format - mm:mm / m:mm', {cssClass: 'alert-danger', timeout: 4000});
      this.flag=1;
    }
    }
    if (this.flag ==0){

    event.preventDefault();
    const searchInput = {
      songName: this.songName,
      album: this.album,
      length: this.length
    };
    this.songService.SearchSong(searchInput)
      .subscribe((songData) => {
        console.log('songData:',songData);
        if (songData.length == 0)
        {
          this.flashMessage.show('No results ,please try another search', {cssClass: 'alert-danger', timeout: 4000});
        }
        this.songComponent.songs = songData;

      });
  }
  }

}
