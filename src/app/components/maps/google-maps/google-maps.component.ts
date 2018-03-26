import { Component, OnInit } from '@angular/core';
import {Input} from "@angular/core";
import {Locations} from "../../../models/Locations";

@Component({
  selector: 'app-google-maps',
  templateUrl: './google-maps.component.html',
  styleUrls: ['./google-maps.component.css']
})
export class GoogleMapsComponent implements OnInit {

  @Input() locations : Locations;
  @Input() zoom: number = 16;
  lat: number;
  lon: number;

  constructor() {

  }

  ngOnInit() {
    this.lon = parseFloat(this.locations.startLongitude);
    this.lat = parseFloat(this.locations.startLatitude);
  }

}
