import {Component, OnInit} from '@angular/core';
import {IPerson} from "../../models/IPerson";
import {APIService, ITimeEntryResponse} from "../../providers/api.service";
import {TimeUtil} from "../../TimeUtil";

@Component({
    selector: 'app-top',
    templateUrl: './top.component.html',
    styleUrls: ['./top.component.scss']
})
export class TopComponent implements OnInit {

    loading: boolean = false;

    first: ITimeEntryResponse;
    second: ITimeEntryResponse;
    third: ITimeEntryResponse;

    constructor(
        private apiService: APIService
    ) {
    }

    ngOnInit() {
        this.loading = true;
        this.apiService.getTopUsers().then(top => {
            if (top[0]) {
                console.log("first is; " + JSON.stringify(top[0]))
                this.first = top[0];
            }
            if (top[1]) {
                this.second = top[1];
            }
            if (top[2]) {
                this.third = top[2];
            }
            this.loading = false;
        })
    }

    private getDateString = (time: number) => {
        let min = Math.floor(time / 60);
        const hrs = Math.floor(min / 60);
        min -= hrs * 60;

        console.log("hrs: " + hrs + ", mins: " + min);

        if (hrs > 0) {
            return TimeUtil.numberPlural(hrs, "hour")  + " and " + TimeUtil.numberPlural(min, " minute");
        } else if (min < 1) {
            return "just now"
        } else {
            return TimeUtil.numberPlural(min, "minute");
        }
    }
}
