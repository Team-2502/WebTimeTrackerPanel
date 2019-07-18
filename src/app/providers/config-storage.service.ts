import {Injectable} from '@angular/core';
import {ElectronService} from "./electron.service";
import {IConfig} from "../models/IConfig";
import {HttpClient} from "@angular/common/http";

@Injectable({
    providedIn: 'root'
})
export class ConfigStorageService {
    constructor(
        private electronService: ElectronService,
        private http: HttpClient
    ) {
    }

    private _config: IConfig;

    get config(): IConfig {
        return this._config;
    }

    set config(value: IConfig) {
        this._config = value;
    }

    private _fullAccess: boolean;

    get fullAccess(): boolean {
        return this._fullAccess;
    }

    set fullAccess(value: boolean) {
        this._fullAccess = value;
    }

    public getSettings = async () => {
        if (this.electronService.isElectron()) {
            await new Promise((resolve, reject) => {
                this.electronService.ipcRenderer.send("getConfig");

                const timeout = setTimeout(() => {
                    return reject(new Error("Config request timed out"));
                }, 10_000);

                this.electronService.ipcRenderer.on("gotConfig", (_, configData) => {
                    this.config = configData;
                    clearTimeout(timeout);
                    return resolve();
                });
            });
        }else{
            // We're running in the web! Use default config provided and carry on.
            this.config = {
                apiEndpoint: "https://tt.ephs.club/api/v1/",
            }
        }


        console.log("doing full access check (" + this.config.apiEndpoint + "onLoad" + ")");
        this.fullAccess = (await this.http.get<any>(this.config.apiEndpoint + "onLoad").toPromise()).isAuthorized;
    }
}
