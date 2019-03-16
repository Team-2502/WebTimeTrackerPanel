import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {ConfigStorageService} from "./config-storage.service";
import {IPerson} from "../models/IPerson";
import {ITimeEntry} from "../models/ITimeEntry";

export interface IEntryResponse {
    user: IPerson,
    entries: Array<ITimeEntry>
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

    public getActive = async (): Promise<Array<IPerson>> => {
        return (
            (await this.http.get<any>(
                this.configStorageService.config.apiEndpoint + "findActive/"
            ).toPromise()).activePeople as Array<IPerson>
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

    public getTopUsers = async () => {
        return (
            (await this.http.get<any>(
                this.configStorageService.config.apiEndpoint + "top"
            ).toPromise()).topUsers
        )
    };

    public addUser = async (user: IPerson) => {
        return (
            (await this.http.post<any>(
                this.configStorageService.config.apiEndpoint + "top",
                user
            ).toPromise())
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
