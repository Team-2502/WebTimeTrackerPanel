import {Component, ElementRef, Injectable, OnDestroy, OnInit, ViewChild} from "@angular/core";
import {NavigationEnd, Router} from "@angular/router";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {IPerson} from "../../models/IPerson";
import {APIService} from "../../providers/api.service";
import {ActivePeopleService} from "../../providers/active-people.service";
import {AuthService} from "../../providers/auth.service";
import {Subscription, interval} from "rxjs";


@Injectable({
    providedIn: "root"
})
@Component({
    selector: "app-sidebar",
    templateUrl: "./sidebar.component.html",
    styleUrls: ["./sidebar.component.scss"]
})
export class SidebarComponent implements OnInit, OnDestroy {
    @ViewChild('signupModal', {read: ElementRef}) signupModal: ElementRef;

    public signupForm: FormGroup;
    public signupSubmitted: boolean;
    public signupLoading: boolean;
    public error: string;

    public personList: Array<IPerson> = [];

    public sidebarDisplayed: boolean;
    public currentUrl: string;

    public timeSubscription: Subscription;
    public time: string;

    constructor(
        private formBuilder: FormBuilder,
        private router: Router,
        private apiService: APIService,
        private activePeopleService: ActivePeopleService,
        public authService: AuthService
    ) {
        this.signupForm = this.formBuilder.group({
            user: ['', Validators.compose([Validators.required, Validators.maxLength(50)])],
        });
    }

    public ngOnInit() {
        this.sidebarDisplayed = true;

        this.router.events.subscribe(e => {
            if (e instanceof NavigationEnd) {
                this.currentUrl = e.url;
            }
        });

        this.updateTime();
        this.timeSubscription = interval(1000).subscribe(() => this.updateTime());
    }

    public ngOnDestroy(): void {
        if(this.timeSubscription) this.timeSubscription.unsubscribe();
    }

    public toggleSidebar = () => {
        this.sidebarDisplayed = !this.sidebarDisplayed;
    };

    public updateTime = () => {
        const date = new Date();
        const unit = (date.getHours() < 12) ? 'AM' : 'PM';

        let hour: string | number = (date.getHours() < 12) ? date.getHours() : date.getHours() - 12;
        let minutes: string | number = date.getMinutes();
        let seconds: string | number = date.getSeconds();

        if(hour < 10) hour = '0' + hour;
        if(minutes < 10) minutes = '0' + minutes;
        if(seconds < 10) seconds = '0' + seconds;

        this.time = `${hour}:${minutes}:${seconds} ${unit}`;
    };

    public openSignUp = async () => {
        this.personList = await this.apiService.getInactive();

        this.signupModal.nativeElement.className = 'modal fade show';
        this.signupModal.nativeElement.style = 'display: block;'
    };

    public closeSignUp = () => {
        this.signupModal.nativeElement.className = 'modal hide';
        this.signupModal.nativeElement.style = 'display: none;'
    };

    public signUp = async () => {
        this.signupSubmitted = true;
        if (this.signupForm.invalid) {
            return;
        }

        this.signupLoading = true;

        try{
            await this.apiService.startTracking(this.signupForm.controls.user.value);
            await this.activePeopleService.updateList();
            this.closeSignUp();
            this.personList = [];
        }catch (e) {
            this.error = e;
            return;
        }
        this.signupLoading = false;
    }
}
