import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {Routes , RouterModule} from "@angular/router";
import {HttpModule} from "@angular/http";
import {FormsModule} from "@angular/forms";

import { AppComponent }   from './app.component';
import {SongsComponent} from './components/songs/songs.component';
import {addSongsComponent} from './components/songs/addSong.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { LoginComponent } from './components/login/login.component';
import { HomeComponent } from './components/home/home.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { ProfileComponent } from './components/profile/profile.component';
import { RegisterComponent } from './components/register/register.component';


import { ValidateService } from "./services/validate.service";
import {AuthService} from "./services/auth.service";
import {FlashMessagesModule} from 'angular2-flash-messages';
import {AuthGuard} from "./guards/auth.guard";
import { LocationStrategy, HashLocationStrategy } from '@angular/common';
import { SongUpdateComponent } from './components/songs/song-update/song-update.component';
import { SongItemComponent } from './components/songs/song-item/song-item.component';
import {SongService} from "./services/songs.service";
import { SongSearchComponent } from './components/songs/song-search/song-search.component';
import { UserComponent } from './components/user/user.component';
import { UserSearchComponent } from './components/user/user-search/user-search.component';
import { GoogleMapsComponent } from './components/maps/google-maps/google-maps.component';
import { AgmCoreModule } from '@agm/core';
import { FooterComponent } from './components/footer/footer.component';
import { FacebookComponent } from './components/facebook/facebook.component';
import { FacebookModule } from 'ngx-facebook';
import { AngularWeatherWidgetModule, WeatherApiName } from 'angular-weather-widget';
import { WeatherWidgetComponent } from './components/weather-widget/weather-widget.component';
import { SatisticsDoughnutComponent } from './components/satistics-doughnut/satistics-doughnut.component';
import { ChartsModule } from 'ng2-charts';
import { StatisticsBarComponent } from './components/statistics-bar/statistics-bar.component'
import { NotificationService} from './services/notification.service';


const appRoutes: Routes =[

  {path:'', component: HomeComponent},
  {path:'register', component: RegisterComponent},
  {path:'login', component: LoginComponent},
  {path:'dashboard', component: DashboardComponent , canActivate:[AuthGuard]},
  {path:'profile', component: ProfileComponent , canActivate:[AuthGuard]},
  {path:'songs', component: SongsComponent , canActivate:[AuthGuard]},
  {path:'addsong', component: addSongsComponent , canActivate:[AuthGuard]},
  {path:'updatesong', component: SongUpdateComponent , canActivate:[AuthGuard]},
  //{path:'deletesong/:id', component: SongUpdateComponent , canActivate:[AuthGuard]}
  {path:'topusers', component: UserComponent , canActivate:[AuthGuard]},
  {path:'facebook', component: FacebookComponent }
];


@NgModule({
  imports:      [ BrowserModule , HttpModule , FormsModule, ChartsModule, RouterModule.forRoot(appRoutes), FlashMessagesModule.forRoot(),FacebookModule.forRoot() ,AgmCoreModule.forRoot({
    apiKey: 'AIzaSyB3YN-E65c4Zc2ZAQcj1HOKSHmpcq7Jq1Q'}),AngularWeatherWidgetModule.forRoot({
    key: '239d9c7bc3c3c59947d0ce1a566c3d9a',
    name: WeatherApiName.OPEN_WEATHER_MAP,
    baseUrl: 'http://api.openweathermap.org/data/2.5'
  })],
  declarations: [ AppComponent , SongsComponent ,addSongsComponent, NavbarComponent, LoginComponent, HomeComponent, DashboardComponent, ProfileComponent, RegisterComponent, SongUpdateComponent, SongItemComponent, SongSearchComponent, UserComponent, UserSearchComponent, GoogleMapsComponent, FooterComponent, FacebookComponent, WeatherWidgetComponent, SatisticsDoughnutComponent, StatisticsBarComponent ],
  bootstrap:    [ AppComponent ],
  providers: [ ValidateService , AuthService,SongService, AuthGuard,NotificationService ,{provide: LocationStrategy, useClass: HashLocationStrategy}]
})
export class AppModule { }
