import { NgModule } from '@angular/core';
import { CommonModule, } from '@angular/common';
import { BrowserModule  } from '@angular/platform-browser';
import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from './home/home.component';
import { UserComponent } from './user/user.component';
import { AdminComponent } from './admin/admin.component';
import { DemoComponent } from './demo/demo.component';
import { ResultsComponent } from './results/results.component';
import { LoginComponent } from './login/login.component';

const routes: Routes = [
    { path: 'about',    component: HomeComponent },
    { path: 'user',     component: UserComponent },
    { path: 'admin',    component: AdminComponent },
    { path: 'demo',     component: DemoComponent },
    { path: 'results',  component: ResultsComponent },
    { path: 'login',    component: LoginComponent},
    { path: '', redirectTo: 'login', pathMatch: 'full' }
];

@NgModule({
    imports: [
        CommonModule,
        BrowserModule,
        RouterModule.forRoot(routes,{
          useHash: false
        })
    ],
    exports: [
    ],
})
export class AppRoutingModule { }
