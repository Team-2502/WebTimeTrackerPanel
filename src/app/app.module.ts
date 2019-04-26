import 'reflect-metadata';
import '../polyfills';
import {BrowserModule} from '@angular/platform-browser';
import {APP_INITIALIZER, NgModule} from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

import {HTTP_INTERCEPTORS, HttpClient, HttpClientModule} from '@angular/common/http';

import {AppRoutingModule} from './app-routing.module';
// NG Translate
import {TranslateLoader, TranslateModule} from '@ngx-translate/core';
import {TranslateHttpLoader} from '@ngx-translate/http-loader';

import {ElectronService} from './providers/electron.service';

import {WebviewDirective} from './directives/webview.directive';

import {AppComponent} from './app.component';
import {HomeComponent} from './components/home/home.component';
import {ConfigStorageService} from "./providers/config-storage.service";
import {TopComponent} from './components/top/top.component';
import {APIInterceptor} from "./interceptors/api.interceptor";
import {TokenInterceptor} from "./interceptors/token.interceptor";
import {SidebarComponent} from './components/sidebar/sidebar.component';
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import { SettingsComponent } from './components/settings/settings.component';
import { LoginComponent } from './components/login/login.component';
import { LogoutComponent } from './components/logout/logout.component';

// Load the config from Electron on boot
export function loadConfig(configStorageService: ConfigStorageService) {
    return async () => await configStorageService.getSettings();
}

@NgModule({
    declarations: [
        AppComponent,
        HomeComponent,
        WebviewDirective,
        TopComponent,
        SidebarComponent,
        SettingsComponent,
        LoginComponent,
        LogoutComponent
    ],
    imports: [
        ReactiveFormsModule,
        BrowserModule,
        FormsModule,
        HttpClientModule,
        AppRoutingModule,
        BrowserAnimationsModule
    ],
    providers: [
        ElectronService,
        {
            provide: APP_INITIALIZER, useFactory: loadConfig, deps: [ConfigStorageService], multi: true
        },
        {
            provide: HTTP_INTERCEPTORS,
            useClass: APIInterceptor,
            multi: true
        },
        {
            provide: HTTP_INTERCEPTORS,
            useClass: TokenInterceptor,
            multi: true
        }
    ],
    bootstrap: [AppComponent]
})
export class AppModule {
}
