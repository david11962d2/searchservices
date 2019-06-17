import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

// firebase
import { AngularFireModule } from 'angularfire2';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { AngularFireDatabase } from 'angularfire2/database';
import { AngularFirestoreModule } from 'angularfire2/firestore';
import { AngularFireStorageModule } from '@angular/fire/storage';
import { AngularFireDatabaseModule } from '@angular/fire/database';
import * as firebase from 'firebase/app';

// rutas
import { APP_ROUTING } from './app.routes';
import { environment } from '../environments/environment';

// servicios
import { PortafolioService } from './servicios/portafolio.service';
import { AuthService } from './servicios/auth.service';
import { AuthGuardService } from './servicios/auth-guard.service';
import { EditDataService } from './servicios/edit-data.service';
import { CargaImangesService } from './servicios/carga-imanges.service';

// componentes
import { AppComponent } from './app.component';
import { NavbarComponent } from './components/shared/navbar/navbar.component';
import { HomeComponent } from './components/home/home.component';
import { AboutComponent } from './components/about/about.component';
import { PortafolioComponent } from './components/portafolio/portafolio.component';
import { HeaderComponent } from './components/shared/header/header.component';
import { PortfolioComponent } from './components/portfolio/portfolio.component';
import { FooterComponent } from './components/shared/footer/footer.component';
import { BuscadorComponent } from './components/buscador/buscador.component';
import { LoginComponent } from './components/login/login.component';
import { SignupComponent } from './components/signup/signup.component';
import { EmpresaComponent } from './components/empresa/empresa.component';
import { PantallaEmpresaComponent } from './components/pantalla-empresa/pantalla-empresa.component';
import { ServicioComponent } from './components/servicio/servicio.component';
import { PantallaServicioComponent } from './components/pantalla-servicio/pantalla-servicio.component';
import { LoadingComponent } from './components/shared/loading/loading.component';

// Directivas
import { NgDropFilesDirective } from './directives/ng-drop-files.directive';

// Pipes
import { NoimagePipe } from './pipes/noimage.pipe';


@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    HomeComponent,
    AboutComponent,
    PortafolioComponent,
    HeaderComponent,
    PortfolioComponent,
    FooterComponent,
    BuscadorComponent,
    LoginComponent,
    SignupComponent,
    EmpresaComponent,
    PantallaEmpresaComponent,
    ServicioComponent,
    PantallaServicioComponent,
    NgDropFilesDirective,
    LoadingComponent,
    NoimagePipe
  ],
  imports: [
    BrowserModule,
    APP_ROUTING,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireAuthModule,
    AngularFireStorageModule,
    AngularFirestoreModule,
    AngularFireDatabaseModule,
    FormsModule

  ],
  providers: [
    PortafolioService,
    AuthService,
    AngularFireDatabase,
    AuthGuardService,
    EditDataService,
    CargaImangesService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
