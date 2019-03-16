import {Component, OnDestroy, OnInit} from '@angular/core';
import {animate, query, stagger, style, transition, trigger} from "@angular/animations";
import {ActiveEntry, APIService} from "../../providers/api.service";
import {interval, Subscription} from "rxjs";

@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.scss'],
    animations: [
        trigger('listStagger', [
            transition('* <=> *',
                [
                    query(':enter', [
                        style({opacity: 0, transform: 'translateY(-15px)'}),
                        stagger('50ms',
                            animate('550ms ease-out',
                                style({opacity: .7, transform: 'translateY(0px)'})))
                    ], {optional: true}),
                ])
        ])
    ]
})
export class HomeComponent implements OnInit, OnDestroy {

    activePeople: Array<ActiveEntry> = [];
    len: number = 0;

    private _activePeopleSource: Subscription;

    constructor(
        private apiService: APIService
    ) {
    }

    private updateList = () => {
        this.apiService.getActive().then(data => {
            // console.log("ap1: " + JSON.stringify(activePeople));
            // console.log("ap1: " + JSON.stringify(activePeople.activePeople));

            this.activePeople = data;
            this.len = data.length;
            console.log("len is " + this.len);
            console.log("Data list is " + JSON.stringify(data));
        });
    };

    ngOnInit() {
        this.updateList();

        // Refresh every 60 seconds
        this._activePeopleSource = interval(60_000).subscribe(() => {
            this.updateList();
        })
    }

    ngOnDestroy(): void {
        if (this._activePeopleSource) this._activePeopleSource.unsubscribe();
    }

    private getDateString = (d: string) => {
        let timeDiff = Math.abs(new Date().getTime() - new Date(d).getTime());

        let min = Math.floor(timeDiff / 60000);
        const hrs = Math.floor(min / 60);
        min -= hrs * 60;

        if (hrs > 0) {
            return hrs + " hour(s) and " + min + " minute(s) ago";
        } else if (min < 1) {
            return "just now"
        } else {
            return min + " minute(s) ago";
        }
    }
}
