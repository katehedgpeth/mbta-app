import {Component, Input, OnInit} from '@angular/core';
import {COMMON_DIRECTIVES} from '@angular/common';

@Component({
  selector: 'north-station',
  template: `
    <div class="north-station board">
      <h2>North Station</h2>
      <div class="headers">
        <div class="header" *ngFor="let header of headers">{{header}}</div>
      </div>
      <div *ngFor="let train of trains" class="train">
        <div>{{train.trip}}</div>
        <div>{{train.destination}}</div>
        <div>{{train.scheduledtime}}</div>
        <div>{{train.lateness}}</div>
        <div>{{train.track}}</div>
        <div>{{train.status}}</div>
      </div>
    </div>
  `,
  directives: [COMMON_DIRECTIVES]
})

export class NorthStationBoardComponent implements OnInit{
  @Input() trains: string[];
  @Input() headers: string[];

  ngOnInit() {
    console.log(this.trains)
  }
}