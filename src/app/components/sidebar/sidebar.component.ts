import {Component, ElementRef, Injectable, OnInit, ViewChild} from "@angular/core";
import {NavigationEnd, Router} from "@angular/router";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {ConfigStorageService} from "../../providers/config-storage.service";

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

    signupForm: FormGroup;
    signupSubmitted: boolean;
    signupLoading: boolean;
    error: string;

    public sidebarDisplayed: boolean;
    public currentUrl: string;

    constructor(
        private formBuilder: FormBuilder,
        private router: Router,
        public configStorageService: ConfigStorageService
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
            }
        });
    }

    public toggleSidebar = () => {
        this.sidebarDisplayed = !this.sidebarDisplayed;
    };

    public signUp = () => {
        console.log("Reee")
    }
}
