import {Component, OnInit} from '@angular/core';
import {animate, query, stagger, style, transition, trigger} from "@angular/animations";
import {IPerson} from "../../models/IPerson";
import {APIService} from "../../providers/api.service";

@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.scss'],
    animations: [
        trigger('listStagger', [
            transition('* <=> *',
                [
                    query(':enter', [
                        style({ opacity: 0, transform: 'translateY(-15px)' }),
                        stagger('50ms',
                            animate('550ms ease-out',
                                style({opacity: .7, transform: 'translateY(0px)'})))
                    ], { optional: true }),
                    query(':leave', animate('50ms', style({ opacity: 0 })) ,{
                        optional: true
                    })
                ])
        ])
    ]
})
export class HomeComponent implements OnInit {

    activePeople$: Array<IPerson>;
    len: number;

    constructor(
        private apiService: APIService
    ) {
    }

    ngOnInit() {
        this.apiService.getActive().then(activePeople => this.activePeople$ = activePeople);
    }
}
