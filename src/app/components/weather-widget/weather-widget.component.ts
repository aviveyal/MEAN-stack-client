import { Component, OnInit } from '@angular/core';
import { WeatherSettings, TemperatureScale, ForecastMode, WeatherLayout } from 'angular-weather-widget';

@Component({
  selector: 'app-weather-widget',
  templateUrl: './weather-widget.component.html',
  styleUrls: ['./weather-widget.component.css']
})
export class WeatherWidgetComponent implements OnInit {



  settings: WeatherSettings = {
    location: {
      cityName: 'Tel Aviv'
    },
    backgroundColor: '#347c57',
    color: '#ffffff',
    width: '300px',
    height: 'auto',
    showWind: false,
    scale: TemperatureScale.CELCIUS,
    showDetails: false,
    layout: WeatherLayout.NARROW,
    language: 'en'
  };

  constructor() { }

  ngOnInit() {
  }

}
