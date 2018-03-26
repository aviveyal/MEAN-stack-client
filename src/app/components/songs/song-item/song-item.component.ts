import { Component, OnInit } from '@angular/core';
import {Song} from "../../../models/Song";
import {Input ,Output} from "@angular/core";
import {AuthService} from "../../../services/auth.service";
import {User} from "../../../models/User";
import {SongService} from "../../../services/songs.service";
import {SongsComponent} from "../songs.component";
import {SongUpdateComponent} from "../song-update/song-update.component";
import {Router} from "@angular/router";
import {EventEmitter} from "@angular/core";
import {Locations} from "../../../models/Locations";

@Component({
  selector: 'app-song-item',
  templateUrl: './song-item.component.html',
  styleUrls: ['./song-item.component.css'],
  providers :[SongsComponent]
})
export class SongItemComponent implements OnInit {
  artistID : string ;
  artistName : string;
  locations: Locations;
  lat: string;
  lon : string;

  @Input() song: Song;
  @Output() notifyParent: EventEmitter<any> = new EventEmitter();

  deleteSong(id) {
    this.notifyParent.emit(id);
  }
  constructor(private authService:AuthService,private router: Router, private songService:SongService, private  songsComponent:SongsComponent){
 this.lat="";
 this.lon="";
  }

  ngOnInit() {
    //get logged in user id
    this.authService.getProfile().subscribe(profile => {
        this.artistID = profile.user._id;
        //get artist name with artist id
      },
      err => {
        console.log(err);
        return false;
      });
    this.authService.getUserById(this.song.artistID).subscribe(userData=>
    {
      this.artistName = userData.artistName ;
    });


    this.songService.getLocationBySongByID(this.song._id).subscribe(location =>
    {
      this.locations = location;
     // console.log(location);
    });
  }

  // deleteSong(id){
  //   this.songsComponent.deleteSong(id);
  // }
  submit()
  {
    this.router.navigate(['/updatesong', {id: this.song._id}]);
  }

}
