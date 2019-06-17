import { Component, OnInit } from '@angular/core';
import { EditDataService } from '../../servicios/edit-data.service';
import { ServiceEmpr } from '../../servicios/service';
import { AngularFireAuth } from 'angularfire2/auth';
import { Router } from '@angular/router';



import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { Observable } from 'rxjs';

export interface Item { nombre: string; url: string; }

declare var $: any;
@Component({
  selector: 'app-pantalla-servicio',
  templateUrl: './pantalla-servicio.component.html',
  styleUrls: ['./pantalla-servicio.component.css']
})
export class PantallaServicioComponent implements OnInit {
  servicios: ServiceEmpr[];
  fotos: any[];
  reservas: any[];
  servicio = new Array();

  ser: ServiceEmpr = {
    key: '',
    email: '',
    telefono: '',
    empresa: '',
    tipo: '',
    ubicacion: '',
    descripcion: '',
    precio: '',
    tipoCliente: ''
  };
  // item = '';
  // fot: any = {
  //   nombre: '',
  //   url: ''
  // };

  editr = false;
  usuario: string;

  private itemsCollection: AngularFirestoreCollection<Item>;
  items: Observable<Item[]>;


  constructor(private editDat: EditDataService, private auts: AngularFireAuth,
              private router: Router, private afs: AngularFirestore) {

              }

  ngOnInit() {
    this.usuario = this.auts.auth.currentUser.email;
    this.editDat.getServices().subscribe(
      servicios => {
      for (let i = 0 ; i < servicios.length; i++) {
        if (this.auts.auth.currentUser.email === servicios[i].ids) {
            if (this.servicio.length > 0) {
              this.servicio = [];
            }
          this.servicio.push(servicios[i]);
        }
      }
    }
  );


  this.editDat.getFotos().subscribe(
    fotos => {
      this.fotos = fotos;
    }
  );

  this.editDat.getReservas('servicios').subscribe(
    reservas => {
      this.reservas = reservas;
    }
  );



    $(document).ready(function() {
      const posicion = $('.top').offset().top;

      $('html, body').animate({
        scrollTop: posicion - 200
      }, 1000);

    });

  }

  edicion(ac: boolean) {
    this.editr = ac;
  }


  editServicio(email: string,
    telefono: string,
    empresa: string,
    tipServicio: string,
    ubicacion: string,
    descripcion: string,
    precio: string,
    tipCliente: string) {

      this.ser.descripcion = descripcion;
      this.ser.email = email;
      this.ser.empresa = empresa;
      this.ser.precio = precio;
      this.ser.telefono = telefono;
      this.ser.tipo = tipServicio;
      this.ser.tipoCliente = tipCliente;
      this.ser.ubicacion = ubicacion;
      this.ser.key = '89';
      this.edicion(false);
      this.editDat.updateServis(this.ser);

  }



}
