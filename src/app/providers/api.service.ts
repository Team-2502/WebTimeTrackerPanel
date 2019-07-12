import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {ConfigStorageService} from "./config-storage.service";
import {IPerson} from "../models/IPerson";
import {ITimeEntry} from "../models/ITimeEntry";

export interface IEntryResponse {
    user: IPerson,
    entries: Array<ITimeEntry>
}

export interface ActiveEntry {
    user: IPerson,
    timeStarted: string
}

export interface ITimeEntryResponse {
    user: IPerson,
    time: number
}

@Injectable({
    providedIn: 'root'
})
export class APIService {

    constructor(
        private http: HttpClient,
        private configStorageService: ConfigStorageService
    ) {
    }

    public getAllUsers = async (): Promise<Array<IPerson>> => {
        return (
            (await this.http.get<any>(
                this.configStorageService.config.apiEndpoint + "user/"
            ).toPromise()).users as Array<IPerson>
        )
    };

    public getActive = async (): Promise<Array<ActiveEntry>> => {
        return (
            (await this.http.get<any>(
                this.configStorageService.config.apiEndpoint + "findActive/"
            ).toPromise()).activePeople
        )
    };

    public getInactive = async (): Promise<Array<IPerson>> => {
        return (
            (await this.http.get<any>(
                this.configStorageService.config.apiEndpoint + "viewInactive/"
            ).toPromise()).inactivePeople
        )
    };

    public startTracking = async (user: string) => {
        return (
            (await this.http.get<any>(
                this.configStorageService.config.apiEndpoint + "user/" + user + "/startTracking"
            ).toPromise())
        )
    };

    public endTracking = async (user: string) => {
        return (
            (await this.http.get<any>(
                this.configStorageService.config.apiEndpoint + "user/" + user + "/endTracking"
            ).toPromise())
        )
    };

    public userDetails = async (user: string) => {
        return (
            (await this.http.get<any>(
                this.configStorageService.config.apiEndpoint + "user/" + user + ""
            ).toPromise())
        )
    };

    public getExpired = async (user: string): Promise<Array<ITimeEntry>> => {
        return (
            (await this.http.get<any>(
                this.configStorageService.config.apiEndpoint + "user/" + user + ""
            ).toPromise()).entries
        )
    };

    public removeUser = async (user: string) => {
        return (
            (await this.http.get<any>(
                this.configStorageService.config.apiEndpoint + "user/" + user + "/remove"
            ).toPromise())
        )
    };

    public getTopUsers = async (): Promise<Array<ITimeEntryResponse>> => {
        return (
            (await this.http.get<any>(
                this.configStorageService.config.apiEndpoint + "top"
            ).toPromise()).topUsers
        )
    };

    public getEntries = async (user: IPerson): Promise<IEntryResponse> => {
        return (
            (await this.http.post<any>(
                this.configStorageService.config.apiEndpoint + "user/" + user,
                user
            ).toPromise())
        )
    };
}
