import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { AboutComponent } from './components/about/about.component';
import { PortafolioComponent } from './components/portafolio/portafolio.component';
import { PortfolioComponent } from './components/portfolio/portfolio.component';
import { BuscadorComponent } from './components/buscador/buscador.component';

import { LoginComponent } from './components/login/login.component';
import { SignupComponent } from './components/signup/signup.component';
import { EmpresaComponent } from './components/empresa/empresa.component';

import { AuthGuardService } from './servicios/auth-guard.service';


import { PantallaEmpresaComponent } from './components/pantalla-empresa/pantalla-empresa.component';
import { ServicioComponent } from './components/servicio/servicio.component';
import { PantallaServicioComponent } from './components/pantalla-servicio/pantalla-servicio.component';


const APP_ROUTES: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'about', component: AboutComponent },

  { path: 'portafolio', component: PortafolioComponent,
                      canActivate: [ AuthGuardService]},
  { path: 'perfilEmpresa', component: PantallaEmpresaComponent,
                      canActivate: [ AuthGuardService] },
  { path: 'perfilServicio', component: PantallaServicioComponent,
                      canActivate: [ AuthGuardService]},
  { path: 'servicio', component: ServicioComponent,
                      canActivate: [ AuthGuardService]},
  { path: 'portfolio/:id', component: PortfolioComponent },
  { path: 'login', component: LoginComponent},
  { path: 'signup', component: SignupComponent},
  { path: 'empresa', component: EmpresaComponent,
                     canActivate: [ AuthGuardService]},

  { path: 'buscar/:termino', component: BuscadorComponent},
  { path: '**', pathMatch: 'full', redirectTo: 'home' }
];

export const APP_ROUTING = RouterModule.forRoot(APP_ROUTES, { useHash: true});
