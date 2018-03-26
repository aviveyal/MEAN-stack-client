import { Component, OnInit } from '@angular/core';
import { Http, Headers } from '@angular/http';
import {SongService} from '../../../services/songs.service'
import {User} from "../../../models/User";
import {UserComponent} from "../user.component"
import {FlashMessagesService} from "angular2-flash-messages";
import {ValidateService} from "../../../services/validate.service";
import {AuthService} from "../../../services/auth.service";

@Component({
  selector: 'app-user-search',
  templateUrl: './user-search.component.html',
  styleUrls: ['./user-search.component.css']
})
export class UserSearchComponent implements OnInit {

  songs : User[];
  name : string;
  artistName : string;
  email : string;
  flag =0;

  constructor( private songService : SongService,private authService:AuthService,private userComponent : UserComponent,private validateService:ValidateService,private flashMessage:FlashMessagesService){
    this.name = '';
    this.artistName = '';
    this.email = '';
  }

  ngOnInit() {
  }


  Search(event) {
    this.flag =0;
    if(this.email!=''){

      if (!this.validateService.validateEmail(this.email))  {
        this.flashMessage.show('Please use a valid email', {cssClass: 'alert-danger', timeout: 4000});
        this.flag=1;
      }
    }
    if (this.flag ==0){

      event.preventDefault();
      const searchInput = {
        name: this.name,
        artistName: this.artistName,
        email: this.email
      };
      this.authService.SearchUser(searchInput)
        .subscribe((userData) => {
          console.log('userData:',userData);
          if (userData.length == 0)
          {
            this.flashMessage.show('No results ,please try another search', {cssClass: 'alert-danger', timeout: 4000});
          }
          this.userComponent.Users = userData;

        });
    }
  }

}
