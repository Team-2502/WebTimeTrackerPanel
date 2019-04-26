import {HomeComponent} from './components/home/home.component';
import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {TopComponent} from "./components/top/top.component";
import {SettingsComponent} from "./components/settings/settings.component";
import {LoginComponent} from "./components/login/login.component";
import {LogoutComponent} from "./components/logout/logout.component";

const routes: Routes = [
    {
        path: '',
        component: HomeComponent
    },
    {
        path: 'top',
        component: TopComponent
    },
    {
        path: 'settings',
        component: SettingsComponent
    },
    {
        path: 'login',
        component: LoginComponent
    },
    {
        path: 'logout',
        component: LogoutComponent
    }
];

@NgModule({
    imports: [RouterModule.forRoot(routes, {useHash: true})],
    exports: [RouterModule]
})
export class AppRoutingModule {
}
