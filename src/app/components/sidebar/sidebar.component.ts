import {Component, ElementRef, Injectable, OnInit, ViewChild} from "@angular/core";
import {NavigationEnd, Router} from "@angular/router";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {ConfigStorageService} from "../../providers/config-storage.service";
import {IPerson} from "../../models/IPerson";
import {APIService} from "../../providers/api.service";
import {ActivePeopleService} from "../../providers/active-people.service";
import {AuthService} from "../../providers/auth.service";

@Injectable({
    providedIn: "root"
})
@Component({
    selector: "app-sidebar",
    templateUrl: "./sidebar.component.html",
    styleUrls: ["./sidebar.component.scss"]
})
export class SidebarComponent implements OnInit {
    @ViewChild('signupModal', {read: ElementRef}) signupModal: ElementRef;

    public signupForm: FormGroup;
    public signupSubmitted: boolean;
    public signupLoading: boolean;
    public error: string;

    public personList: Array<IPerson> = [];

    public sidebarDisplayed: boolean;
    public currentUrl: string;

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
        // TODO: debugging
        this.sidebarDisplayed = true;

        this.router.events.subscribe(e => {
            if (e instanceof NavigationEnd) {
                this.currentUrl = e.url;
                console.log("current url: " + e.url);
            }
        });
    }

    public toggleSidebar = () => {
        this.sidebarDisplayed = !this.sidebarDisplayed;
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
