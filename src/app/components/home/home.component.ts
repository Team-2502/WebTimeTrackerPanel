import {Component} from '@angular/core';
import {animate, query, stagger, style, transition, trigger} from "@angular/animations";
import {ActivePeopleService} from "../../providers/active-people.service";

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

    constructor(
        private activePeopleService: ActivePeopleService
    ) {}

    private getDateString = (d: string) => {
        let timeDiff = Math.abs(new Date().getTime() - new Date(d).getTime());

        let min = Math.floor(timeDiff / 60000);
        const hrs = Math.floor(min / 60);
        min -= hrs * 60;

        if (hrs > 0) {
            return HomeComponent.numberPlural(hrs, "hour")  + " and " + HomeComponent.numberPlural(min, " minute") + " ago";
        } else if (min < 1) {
            return "just now"
        } else {
            return HomeComponent.numberPlural(min, "minute") + " ago";
        }
    };

    private static numberPlural(n: number, unit: string){
        if(n != 1){
            return n + " " + unit + "s"
        }else{
            return n + " " + unit;
        }
    }
}
