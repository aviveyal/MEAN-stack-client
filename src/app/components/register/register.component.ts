import { Component, OnInit } from '@angular/core';
import {ValidateService} from "../../services/validate.service";
import {FlashMessagesService} from "angular2-flash-messages";
import {Router} from '@angular/router';
import {AuthService} from '../../services/auth.service'

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})

export class RegisterComponent implements OnInit {
  name: String;
  username: String;
  artistName: String;
  email: String;
  password: String;
  flag =0;

  constructor(
    private validateService: ValidateService,
    private flashMessage:FlashMessagesService,
    private authService:AuthService,
    private router: Router
  ) { }


  ngOnInit() {


  }

  onRegisterSubmit() {
    const user = {
      name: this.name,
      email: this.email,
      artistName: this.artistName,
      username: this.username,
      password: this.password
    };

    // Required Fields
    if (!this.validateService.validateRegister(user)) {
      this.flashMessage.show('Please fill in all fields', {cssClass: 'alert-danger', timeout: 3000});
      this.flag = 1;
    }
    // Validate Email
    if (!this.validateService.validateEmail(user.email)) {
      this.flashMessage.show('Please use a valid email', {cssClass: 'alert-danger', timeout: 3000});
      this.flag = 1;
    }


    this.validateService.validateAvailable(user.artistName,user.email,user.username).subscribe(result => {
      if (result != null) {
        this.flashMessage.show('This artist name ,email or username are already taken ,Please use another', {
          cssClass: 'alert-danger',
          timeout: 3000
        });
    }
      else if(this.flag==0) {
        // Register user
        this.authService.registerUser(user).subscribe(data => {
          if (data.success) {
            this.flashMessage.show('You are now registered and can log in', {cssClass: 'alert-success', timeout: 1000});
            this.router.navigate(['/login']);
          } else {
            this.flashMessage.show('Something went wrong', {cssClass: 'alert-danger', timeout: 2000});
            this.router.navigate(['/register']);
          }
        });
      }

    });

  }

}
