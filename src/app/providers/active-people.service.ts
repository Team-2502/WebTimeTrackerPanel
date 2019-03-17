import { Injectable } from '@angular/core';
import {BehaviorSubject, interval} from "rxjs";
import {ActiveEntry, APIService} from "./api.service";

@Injectable({
  providedIn: 'root'
})
export class ActivePeopleService {
  get activePeopleSource(): BehaviorSubject<Array<ActiveEntry>> {
    return this._activePeopleSource;
  }

  set activePeopleSource(value: BehaviorSubject<Array<ActiveEntry>>) {
    this._activePeopleSource = value;
  }

  private _activePeopleSource: BehaviorSubject<Array<ActiveEntry>> = new BehaviorSubject([]);

  constructor(
      private apiService: APIService
  ) {
    this.updateList();

    // Refresh every 60 seconds
    interval(60_000).subscribe(() => {
      this.updateList();
    })
  }

  public updateList = async () => {
    this.activePeopleSource.next(await this.apiService.getActive());
  };
}
