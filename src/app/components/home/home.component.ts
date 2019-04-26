import {Component} from '@angular/core';
import {animate, query, stagger, style, transition, trigger} from "@angular/animations";
import {ActivePeopleService} from "../../providers/active-people.service";
import {IPerson} from "../../models/IPerson";
import {APIService} from "../../providers/api.service";
import {TimeUtil} from "../../TimeUtil";
import {AuthService} from "../../providers/auth.service";

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
export class HomeComponent {

    error: string;
    loading: boolean = false;

    constructor(
        public activePeopleService: ActivePeopleService,
        private apiService: APIService,
        public authService: AuthService
    ) {}

    private getDateString = (d: string) => {
        let timeDiff = Math.abs(new Date().getTime() - new Date(d).getTime());

        let min = Math.floor(timeDiff / 60000);
        const hrs = Math.floor(min / 60);
        min -= hrs * 60;

        if (hrs > 0) {
            return TimeUtil.numberPlural(hrs, "hour")  + " and " + TimeUtil.numberPlural(min, " minute") + " ago";
        } else if (min < 1) {
            return "just now"
        } else {
            return TimeUtil.numberPlural(min, "minute") + " ago";
        }
    };

    private removeUser = async (user: IPerson) => {
        try {
            this.loading = true;
            await this.apiService.endTracking(user._id);
            await this.activePeopleService.updateList();
        }catch (e) {
            this.error = e;
        }
        this.loading = false;
    }
}
