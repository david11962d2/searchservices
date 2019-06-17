import { Injectable, ɵpbV } from '@angular/core';

import { AngularFireAuth } from 'angularfire2/auth';
import { Observable } from 'rxjs';

import { Router } from '@angular/router';
import * as firebase from 'firebase/app';
import { EditDataService } from './edit-data.service';
import { ClientEmpre } from './clients';
import { ServiceEmpr } from './service';

import { Valores } from './valores';


@Injectable(
  // {providedIn: 'root'}
)
export class AuthService {

  user: Observable<firebase.User>;

  isAutenticated: boolean;
  emprClients: boolean;

  clientes: ClientEmpre[];
  usuarios: ServiceEmpr[];
  cliente: Valores[];
  servicio = new Array();

  id: string;
  ids: string;
  valorGet: any;
  control: boolean;
  isLogin: boolean;
  isSinging: boolean;
  messageIt: string;
  constructor(private firebaseAuth: AngularFireAuth, private router: Router , private editDat: EditDataService) {
    this.user = firebaseAuth.authState;
  }


  signup(email: string, password: string, inlineRadioOptions: string) {
    this.firebaseAuth
    .auth
    .createUserWithEmailAndPassword(email, password)
    .then(value => {
      console.log('Success!', value);
      this.isSinging = true;
      if (inlineRadioOptions === 'option1') {
        this.router.navigate(['/empresa']);
        this.recuperarKey();
        this.isAutenticated = true;
      } else if (inlineRadioOptions === 'option2') {
        this.recuperarKey();
        this.router.navigate(['/servicio']);
        this.isAutenticated = true;
      }
    })
    .catch(err => {
      this.isSinging = false;
      this.messageIt = this.traductor(err.message);
      console.log('Something went wron: ' , err.message);
    });
  }

  login(email: string, password: string) {
    this.firebaseAuth
    .auth
    .signInWithEmailAndPassword(email, password)
    .then(value => {
      console.log('Nice');
      this.isAutenticated = true;
      this.isLogin = true;
      this.recuperarKey();

      this.router.navigate(['/home']);
    })
    .catch(err => {
      this.isLogin = false;
      this.messageIt = this.traductor(err.message);
      console.log('Something went wrong: ', err.message);
    });
  }

  traductor(texto: string) {
    if (texto === 'The password is invalid or the user does not have a password.') {
      return texto = 'La contraseña no es válida o el usuario no tiene una contraseña.';
    }
    if (texto === 'The email address is badly formatted.') {
      return texto = 'La dirección de correo electrónico está mal formateada.';
    }
    if (texto === 'Password should be at least 6 characters') {
      return texto = 'La contraseña debe tener al menos 6 caracteres';
    }
  }

  logout() {
    this.firebaseAuth.auth.signOut();
    this.isAutenticated = false;
    this.router.navigate(['/home']);
  }

  recuperarKey() {
    this.cliente = [];

    this.editDat.getServices().subscribe(
      servicios => {
      for (let i = 0 ; i < servicios.length; i++) {
        if (this.firebaseAuth.auth.currentUser.email === servicios[i].ids) {
            if (this.cliente.length > 0) {
              this.cliente = [];
            }
          this.cliente.push(servicios[i]);
          console.log(this.cliente[0].key, 'servicios');
        }
      }
    }
  );

  this.editDat.getClientes().subscribe(
    clientes => {
    for (let i = 0 ; i < clientes.length; i++) {
      if (this.firebaseAuth.auth.currentUser.email === clientes[i].id) {
          if (this.cliente.length > 0) {
            this.cliente = [];
          }
        this.cliente.push(clientes[i]);
        console.log(this.cliente[0].key, 'clientes');
      }
    }
  }

);
}


}
