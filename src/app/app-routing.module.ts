import {HomeComponent} from './components/home/home.component';
import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {TopComponent} from "./components/top/top.component";

const routes: Routes = [
    {
        path: '',
        component: HomeComponent
    },
    {
        path: 'top',
        component: TopComponent
    }
];

@NgModule({
    imports: [RouterModule.forRoot(routes, {useHash: true})],
    exports: [RouterModule]
})
export class AppRoutingModule {
}
