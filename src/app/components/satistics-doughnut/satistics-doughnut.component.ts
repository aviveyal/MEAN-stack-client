import { Component, OnInit } from '@angular/core';
import {SongService} from "../../services/songs.service";
import { AuthService} from "../../services/auth.service";

@Component({
  selector: 'app-satistics-doughnut',
  templateUrl: './satistics-doughnut.component.html',
  styleUrls: ['./satistics-doughnut.component.css']
})
export class SatisticsDoughnutComponent implements OnInit {

  artistName: string;
  count: number;
  isDataAvailable: boolean = false;

  // Doughnut
  public doughnutChartLabels:string[];
  public doughnutChartData:number[];
  public doughnutChartType:string = 'doughnut';
  dataList :number[];
  labelList :string[];

  // events
  public chartClicked(e:any):void {
    console.log(e);
  }

  public chartHovered(e:any):void {
    console.log(e);
  }

  constructor(private songservice: SongService, private authservice: AuthService) {
   this.dataList =[];
   this.labelList =[];
    this.doughnutChartData = [];
    this.doughnutChartLabels = [];
    songservice.topUser().subscribe(results => {

        for(var i=0;i<results.length;i++){
                this.dataList.push(parseInt(results[i].uploadingCount));
                authservice.getUserById(results[i]._id).subscribe(user =>{
                this.labelList.push(user.artistName);
                  if(this.labelList.length == results.length){
                    this.doughnutChartLabels =this.labelList;
                    this.doughnutChartData =this.dataList;
                    this.isDataAvailable = true;
                  }

                 });
        }



    });
    this.doughnutChartData = this.doughnutChartData.slice();
  }

  ngOnInit() {
  }

}
