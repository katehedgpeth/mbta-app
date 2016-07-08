import {Http} from '@angular/http';
import {Injectable} from '@angular/core';

@Injectable()
export class TrainService {
  constructor(private http: Http) {}

  getTrains() {
    return this.http.get('/api/v1/trains')
             .map(response => {
                return response.json();
              })
  }
}