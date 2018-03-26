import {Injectable, OnInit} from '@angular/core';
import {Http, Headers} from '@angular/http';

import 'rxjs/add/operator/map';
import {AuthService} from "./auth.service";

@Injectable()
export class SongService implements OnInit{
  artistID : string;

  ngOnInit(){
    this.authService.getProfile().subscribe(profile => {
      this.artistID = profile.user._id
    });
  }

  constructor(private http:Http , private authService :AuthService){
    console.log('Song Service Initialized...');
  }

  getSongs(){
    return this.http.get('/songs')
      .map(res => res.json());
  }
  getSongByID(songID){
    return this.http.get('/songs/'+songID)
      .map(res => res.json());
  }

  getLocationBySongByID(songID){
    return this.http.get('/locations/'+songID)
      .map(res => res.json());
  }

  getLoggedInUserSongs(id) {
    return this.http.get('/songs/user/'+ id).map(res => res.json());
  }

  addSong(newSong){
    console.log(newSong);
    var headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return this.http.post('/songs', JSON.stringify(newSong), {headers: headers})
      .map(res => res.json());
  }

  deleteSong(id){
    // var headers = new Headers();
    // headers.append('Content-Type', 'application/json');
    return this.http.delete('/songs/delete/'+id).map(res => res.json());
  }

  updateSong(song){
      var headers = new Headers();
      headers.append('Content-Type', 'application/json');
      return this.http.put('/songs/update', JSON.stringify(song), {headers: headers})
          .map(res => res.json());
  }

  SearchSong(searchInput){
    var headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return this.http.post('/songs/search/', searchInput,{headers: headers})
      .map(res => res.json());
  }

  topUser(){
    return this.http.get('/songs/users/topuploader').map(res => res.json());
  }

  getMaxPlayedCount(){
    return this.http.get('/songs/users/topPlayed').map(res => res.json());
  }

}
