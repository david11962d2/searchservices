import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList, AngularFireObject } from '@angular/fire/database';
import { ClientEmpre } from './clients';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from 'angularfire2/firestore';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { AngularFireAuth } from 'angularfire2/auth'; // current saca un usuario. pero no el actual.
import { Router } from '@angular/router';
import { AuthService } from './auth.service';

import { ServiceEmpr } from './service';
import { version } from 'punycode';
import { ServiceFoto } from './fotos';

import { Reservas } from './reservas';
import { Valores } from './valores';




@Injectable({
  providedIn: 'root'
})
export class EditDataService {

  clientesCollection: AngularFirestoreCollection<ClientEmpre>;
  serviciosCollection: AngularFirestoreCollection<ServiceEmpr>;
  fotosCollection: AngularFirestoreCollection<any>;
  reservasSerCollection: AngularFirestoreCollection<Reservas>;
  reservasClienteCollection: AngularFirestoreCollection<Reservas>;

  clientes: Observable<any>;
  servicios: Observable<any>;
  fotos: Observable<any>;
  reservasServicios: Observable<any>;


  clientDoc: AngularFirestoreDocument<ClientEmpre>;
  servicioDoc: AngularFirestoreDocument<ServiceEmpr>;

  constructor( public afs: AngularFirestore, public aut: AngularFireAuth, private router: Router ) {

  }
// carga lo que existe en la bd
  loadServices() {
    this.serviciosCollection = this.afs.collection<ServiceEmpr>('servicios');
    this.servicios = this.serviciosCollection.snapshotChanges().pipe(
      map(actions => actions.map(a => {
        const datas = a.payload.doc.data() as ServiceEmpr;
        const ids = a.payload.doc.id;
        return {ids, ...datas};
      }))
    );

  }

  loadFotos() {
    this.fotosCollection = this.afs.collection<ServiceEmpr>('servicios').doc(this.aut.auth.currentUser.email).collection('fotos');
    this.fotos = this.fotosCollection.snapshotChanges().pipe(
      map(actions => actions.map(a => {
        const datasFotos = a.payload.doc.data() as ServiceEmpr;
        const idsFotos = a.payload.doc.id;
        return {idsFotos, ...datasFotos };
      }))
    );
  }


  loadReservas(tipo: string) {
    this.reservasSerCollection = this.afs.collection<Reservas>(tipo).doc(this.aut.auth.currentUser.email).collection('reservas');
    this.reservasServicios = this.reservasSerCollection.snapshotChanges().pipe(
      map(actions => actions.map(a => {
        const allReservasSer = a.payload.doc.data() as Reservas;
        const allIdsReservas = a.payload.doc.id;
        return {allIdsReservas, ...allReservasSer};
      }))
    );
  }


  loadAllFotos(ban: string) {
    this.fotosCollection = this.afs.collection<ServiceEmpr>('servicios').doc(ban).collection('fotos');
    this.fotos = this.fotosCollection.snapshotChanges().pipe(
      map(actions => actions.map(a => {
        const allDatasFotos = a.payload.doc.data() as ServiceEmpr;
        const allIdsFotos = a.payload.doc.id;
        return {allIdsFotos, ...allDatasFotos };
      }))
    );
  }


  loadClients() {
    this.clientesCollection = this.afs.collection<ClientEmpre>('clientes');
    this.clientes = this.clientesCollection.snapshotChanges().pipe(
      map(actions => actions.map(a => {
        const data = a.payload.doc.data() as ClientEmpre;
        const id = a.payload.doc.id;

        return {id, ...data };
      }))
    );
  }
// recoge de la bd
  getAllFotos(ban: string) {
    this.loadAllFotos(ban);
    return this.fotos;
  }
  getFotos() {
    this.loadFotos();
    return this.fotos;
  }
  getServices() {
    this.loadServices();
    return this.servicios;
  }

  getClientes() {
    this.loadClients();
    return this.clientes;
  }

  getReservas(tipo: string) {
    this.loadReservas(tipo);
    return this.reservasServicios;
  }
// añade a la base de datos.
  addServicio(servicios: ServiceEmpr, fot?: ServiceFoto[], item?: any) {
    this.loadServices();
    this.serviciosCollection.doc(this.aut.auth.currentUser.email).set(servicios);

    for (const fots of fot) {
      this.serviciosCollection.doc(this.aut.auth.currentUser.email).collection('fotos').doc(fots.nombre).set(fots);
    }
    this.router.navigate(['/perfilServicio']);
  }

  addReservas(usuario: Valores, datos?: ClientEmpre) {
    const registro = Date.now();
    const reg = registro.toString();
    this.reservasSerCollection = this.afs.collection<Reservas>('servicios');
    this.reservasSerCollection.doc(usuario.ids).collection('reservas').doc(reg).set(datos);
    this.reservasClienteCollection = this.afs.collection<Reservas>('clientes');
    this.reservasClienteCollection.doc(this.aut.auth.currentUser.email).collection('reservas').doc(reg).set(usuario);
  }

  addClient(clientes: ClientEmpre) {
    this.loadClients();
    this.clientesCollection.doc(this.aut.auth.currentUser.email).set(clientes);
    this.router.navigate(['/perfilEmpresa']);
  }

  updateServis(servicios: ServiceEmpr , fot?: any, item?: any) {
    this.serviciosCollection.doc(this.aut.auth.currentUser.email).set(servicios);
    // this.serviciosCollection.doc(this.aut.auth.currentUser.email).collection('fotos').doc(item).set(fot);
  }

  updateClient(clientes: ClientEmpre) {
    this.clientesCollection.doc(this.aut.auth.currentUser.email).set(clientes);
  }

  deleteClient() {

  }

}
