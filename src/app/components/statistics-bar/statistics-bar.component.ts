import { Component, OnInit } from '@angular/core';
import {SongService} from "../../services/songs.service";
import {forRoot} from "angular-weather-widget";


@Component({
  selector: 'app-statistics-bar',
  templateUrl: './statistics-bar.component.html',
  styleUrls: ['./statistics-bar.component.css']
})
export class StatisticsBarComponent implements OnInit {


  public barChartOptions:any = {
    scaleShowVerticalLines: false,
    responsive: true
  };


  public barChartLabels:string[] = [];
  public barChartType:string = 'bar';
  public barChartLegend:boolean = true;
  public barChartData:any[] = [];
  isAvailable:boolean = false;

  private colors = [
    {
      backgroundColor: [
        'rgba(255, 99, 132, 0.8)',
        'rgba(54, 162, 235, 0.8)',
        'rgba(255, 206, 86, 0.8)',
        'rgba(0, 255, 0, 0.8)',
        'rgba(102, 0, 204, 0.8)',
        'rgba(255, 128, 0, 0.8)',
        'rgba(255, 99, 132, 0.8)',
        'rgba(54, 162, 235, 0.8)',
        'rgba(255, 206, 86, 0.8)',
        'rgba(0, 255, 0, 0.8)',
        'rgba(102, 0, 204, 0.8)',
        'rgba(255, 128, 0, 0.8)'
      ]
    }

  ];

    constructor(private songservice: SongService) {
    this.barChartLabels = [];
    var data:number[] =[];
    this.songservice.getSongs().subscribe(songs =>{

      for(var i=0;i<songs.length;i++){
        this.barChartLabels.push(songs[i].name);
        data.push(songs[i].PlayedCount);
      }

      var FinalData = {
        data: data,
        label: 'PlayedCount'
      }
      this.barChartData = [
        {data: data, label: 'PlayedCount'}
      ];
      this.isAvailable = true;
    });
  }

  ngOnInit() {
  }




  // events
  public chartClicked(e:any):void {
    console.log(e);
  }

  public chartHovered(e:any):void {
    console.log(e);
  }



}
