///<reference path="../../typings/browser.d.ts"/>

import {Component, OnInit} from '@angular/core';
import {NorthStationBoardComponent} from './north-station-board.component';
import {SouthStationBoardComponent} from './south-station-board.component';
import {TrainService} from './trains.service';

@Component({
  selector: 'mbta-app',
  template: `
    <h1>MBTA Commuter Rail Departure Board</h1>
    <div class="boards">
      <north-station [trains]="northStation" [headers]="headers"></north-station>
      <div class="spacer"></div>
      <south-station [trains]="northStation" [headers]="headers"></south-station>
    </div>
  `,
  directives: [NorthStationBoardComponent, SouthStationBoardComponent],
  providers: [TrainService]
})

export class AppComponent implements OnInit {
  trains: any = {};
  headers: string[] = ['Trip', 'Destination', 'Scheduled Time', 'Lateness', 'Track', 'Status'];
  northStation: any[] = [];
  southStation: any[] = [];

  constructor(private trainService: TrainService) {}

  ngOnInit() {
    this.trainService.getTrains().subscribe(trains => {
      this.trains = trains;
      this.northStation = this.trains.northStation;
      this.southStation = this.trains.southStation;
      console.log(this.northStation)
      // this.trains.forEach(train => {
      //   console.log(train);
      // })
    })
  }
}
