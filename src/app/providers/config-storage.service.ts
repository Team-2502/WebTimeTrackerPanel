import { Injectable } from '@angular/core';
import {ElectronService} from "./electron.service";
import {IConfig} from "../models/IConfig";

@Injectable({
  providedIn: 'root'
})
export class ConfigStorageService {
  get config(): IConfig {
    return this._config;
  }

  set config(value: IConfig) {
    this._config = value;
  }

  private _config: IConfig;

  constructor(
      private electronService: ElectronService
  ) {}

  public getSettings = async () => {
    if(!this.electronService.isElectron()) return; // Don't get settings if we're not in Electron

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
  }
}
