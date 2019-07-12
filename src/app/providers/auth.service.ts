import { Injectable } from '@angular/core';
import {Role} from "../models/Role";
import {HttpClient} from "@angular/common/http";
import {ConfigStorageService} from "./config-storage.service";

export interface ITokenPayload {
  email: string;
  password: string;
}

export interface ITokenContents {
  email: string;
  firstName: string;
  lastName: string;
  role: Role;
  id: string;
  exp: number;
}

export interface IAuthResponse {
  token: string;
  firstName: string;
  lastName: string;
  id: string;
  role: Role;
}

export interface IRegisterPayload {
  firstName: string;
  lastName: string;
  role: Role;
  password: string;
  email: string;
  canSignup: boolean
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  get cachedAuthResponse(): IAuthResponse {
    if (!this._cachedAuthResponse) {
      if (localStorage.getItem('session') === undefined) { return undefined; }
      this._cachedAuthResponse = JSON.parse(localStorage.getItem('session'));
    }
    return this._cachedAuthResponse;
  }

  set cachedAuthResponse(value: IAuthResponse) {
    this._cachedAuthResponse = value;
    if (value === undefined) { // We're logging out
      localStorage.removeItem('session');
    } else {
      localStorage.setItem('session', JSON.stringify(value));
    }
  }

  constructor(
      private httpService: HttpClient,
      private configStorageService: ConfigStorageService
  ) { }

  private _cachedAuthResponse: IAuthResponse;

  public register = async (registerPayload: IRegisterPayload): Promise<void> => {
      await this.httpService.post(this.configStorageService.config.apiEndpoint + "user/add", registerPayload).toPromise();
  };

  public login = async (loginPayload: ITokenPayload): Promise<void> => {
    const res: any = await this.httpService.post(this.configStorageService.config.apiEndpoint + "user/login", loginPayload).toPromise();
    console.log("res: " + JSON.stringify(res));
    this.cachedAuthResponse = res.user as IAuthResponse;
  };

  public logout = (): void => {
    this.cachedAuthResponse = undefined;
  };

  public checkMentor = (): boolean => this.cachedAuthResponse && this.cachedAuthResponse.role == 'mentor';

  public checkLoggedIn = (): boolean => {
    const user = this.cachedAuthResponse;
    if (user) {
      const payload = user.token.split('.')[1];
      const validatedPayload: ITokenContents = JSON.parse(window.atob(payload));
      return validatedPayload.exp > Date.now() / 1000;
    } else {
      return false;
    }
  };
}
