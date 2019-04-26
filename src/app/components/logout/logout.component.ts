import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";
import {AuthService} from "../../providers/auth.service";

@Component({
  selector: 'app-logout',
  templateUrl: './logout.component.html',
  styleUrls: ['./logout.component.scss']
})
export class LogoutComponent implements OnInit {

  constructor(
      private routerService: Router,
      private authService: AuthService
  ) { }

  ngOnInit() {
    this.authService.cachedAuthResponse = undefined;
    this.routerService.navigateByUrl('/');
  }

}
