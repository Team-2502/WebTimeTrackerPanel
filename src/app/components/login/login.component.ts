import { Component, OnInit } from '@angular/core';
import {AuthService, ITokenPayload} from "../../providers/auth.service";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {ActivatedRoute, NavigationEnd, Router} from "@angular/router";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;
  loading = false;
  submitted = false;
  returnUrl: string;
  error: string;
  returnUrlSet = false;

  credentials: ITokenPayload = {
    email: '',
    password: ''
  };

  constructor(
      private formBuilderService: FormBuilder,
      private routeService: ActivatedRoute,
      private routerService: Router,
      private authService: AuthService,
  ) { }

  ngOnInit() {
    console.log("auth here");
    this.loginForm = this.formBuilderService.group({
      email: ['', Validators.compose([Validators.required, Validators.email, Validators.maxLength(50)])],
      password: ['', Validators.compose([Validators.required, Validators.minLength(5), Validators.maxLength(50)])]
    });
    if (this.routeService.snapshot.queryParams['returnUrl']) {
      this.returnUrlSet = true;
    }

    this.returnUrl = this.routeService.snapshot.queryParams['returnUrl'] || '/';

    // Watch the router for changes (since the page isnt reloaded)
    this.routerService.events.subscribe((val) => {
      if (val instanceof NavigationEnd) {
        this.returnUrlSet = this.routeService.snapshot.queryParams['returnUrl'];
      }
    });
  }

  onSubmit = async (): Promise<void> => {
    this.submitted = true;
    if (this.loginForm.invalid) {
      return;
    }
    this.loading = true;
    this.credentials.email = this.loginForm.controls.email.value;
    this.credentials.password = this.loginForm.controls.password.value;

    console.log('doing login...');
    try {
      await this.authService.login(this.credentials);
      console.log('authed! cache is being updated');
      console.log('redir...');
      await this.routerService.navigateByUrl(this.returnUrl);
    } catch (e) {
      this.error = e;
    }
    this.loading = false;
    this.submitted = false;
  };

}
