import {Component, Input, OnInit} from '@angular/core';
import {COMMON_DIRECTIVES} from '@angular/common';

@Component({
  selector: 'south-station',
  template: `
    <div class="south-station board">
      <h2>South Station</h2>
      <div class="headers">
        <div class="trip">Trip</div>
        <div class="destination">Destination</div>
        <div class="scheduledtime">Scheduled</div>
        <div class="lateness">Late</div>
        <div class="track">Track</div>
        <div class="status">Status</div>
      </div>
      <div *ngFor="let train of trains" class="train">
        <div class="trip">{{train.trip}}</div>
        <div class="destination">{{train.destination}}</div>
        <div class="scheduledtime">{{train.scheduledtime}}</div>
        <div class="lateness">{{train.lateness}}</div>
        <div class="track">{{train.track}}</div>
        <div class="status">{{train.status}}</div>
      </div>
    </div>
  `,
  directives: [COMMON_DIRECTIVES]
})

export class SouthStationBoardComponent implements OnInit{
  @Input() trains: string[];

  ngOnInit() {
    console.log(this.trains)
  }
}