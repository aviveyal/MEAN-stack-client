import { Component } from '@angular/core';
import { SongService } from './services/songs.service';

@Component({
  moduleId: module.id,
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers : [SongService]
})

export class AppComponent {
}
