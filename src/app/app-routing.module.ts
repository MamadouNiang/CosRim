import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";

// layouts
import { AuthComponent } from "./layouts/auth/auth.component";

// admin views
import { DashboardComponent } from "./views/admin/dashboard/dashboard.component";
import { MapsComponent } from "./views/admin/maps/maps.component";
import { SettingsComponent } from "./views/admin/settings/settings.component";
import { TablesComponent } from "./views/admin/tables/tables.component";
import { UsersAComponent } from './views/users/agents/users.component';


// auth views
import { LoginComponent } from "./views/auth/login/login.component";
import { RegisterComponent } from "./views/auth/register/register.component";

// no layouts views
import { IndexComponent } from "./views/index/index.component";
import { LandingComponent } from "./views/landing/landing.component";
import { ProfileComponent } from "./views/profile/profile.component";

import { AthGuardService } from "./services/ath-guard.service";
import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { AdminComponent } from './layouts/admin/admin.component';
import { UsersComponent } from './layouts/users/users.component';
import { EchangesComponent } from './views/echanges/echanges.component';
import { ChargementComponent } from './views/chargement/chargement.component';
import { BibloComponent } from "./views/biblo/biblo.component";
import { GalleryComponent } from "./gallery/gallery.component";



const routes: Routes = [
  {
    path: "users",
    canActivate: [AthGuardService],
    component: UsersComponent,
    children:[
    { path: "agents", component: UsersAComponent },

    { path: "", redirectTo: "", pathMatch: "full" },
    ],
  },
  // admin views
  {
    path: "admin",
    canActivate: [AthGuardService],
    component: AdminComponent,
    children: [
      { path: "dashboard", component: DashboardComponent },
      { path: "settings", component: SettingsComponent },
      { path: "tables", component: TablesComponent },
      { path: "maps", component: MapsComponent },
      { path: "", redirectTo: "dashboard", pathMatch: "full" },
    ],
  },
  // auth views
  {
    path: "auth",
    component: AuthComponent,
    children: [
      { path: "login", component: LoginComponent },
      { path: "register", component: RegisterComponent },
      { path: "", redirectTo: "login", pathMatch: "full" },
    ],
  },
  // no layout views
  { path: "profile",canActivate: [AthGuardService], component: ProfileComponent,},
  { path: "landing", canActivate: [AthGuardService], component: LandingComponent, },
  { path: "echanges", canActivate: [AthGuardService], component: EchangesComponent, },
  { path: "biblo", canActivate: [AthGuardService], component: BibloComponent, },
  { path: "gallery",  component: GalleryComponent, },

  { path: "chargement", component: ChargementComponent, },
  { path: "index", component: IndexComponent },
  { path: "", component: IndexComponent },
  { path: "**", redirectTo: "", pathMatch: "full" },

];

@NgModule({
  imports: [
    CommonModule,
    BrowserModule,
    RouterModule.forRoot(routes, {
    useHash: true,
  })],
  exports: [RouterModule],
})
export class AppRoutingModule {}
