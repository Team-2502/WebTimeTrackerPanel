import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot} from '@angular/router';
import {AuthService} from "./providers/auth.service";
import {Role} from "./models/Role";

@Injectable({
  providedIn: 'root'
})
export class CheckMentorGuard implements CanActivate{
  constructor(private authService: AuthService, private router: Router) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    if (this.authService.checkLoggedIn() && this.authService.cachedAuthResponse.role === Role.MENTOR) {
      return true
    } else {
      this.router.navigateByUrl("/");
    }
  }
}
