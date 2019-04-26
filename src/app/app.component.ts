import {Component} from '@angular/core';
import {ElectronService} from './providers/electron.service';
import {AppConfig} from '../environments/environment';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})
export class AppComponent {
    constructor(public electronService: ElectronService) {

        console.log('Got Angular config (this is not the one pulled from Electron!): ', AppConfig);

        if (electronService.isElectron()) {
            console.log('Detected NodeJS process. We must be in Electron');
            console.log('Grabbed IPC: ', electronService.ipcRenderer);
            console.log('Grabbed childProcess: ', electronService.childProcess);
        } else {
            console.log('Did not detect NodeJS process. We must be in the browser.');
        }
    }
}
