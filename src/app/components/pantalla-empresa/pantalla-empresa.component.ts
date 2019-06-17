import { Component, OnInit, OnDestroy, OnChanges } from '@angular/core';
import { EditDataService } from '../../servicios/edit-data.service';
import { ClientEmpre } from '../../servicios/clients';

import { AngularFireAuth } from 'angularfire2/auth';


import { Router } from '@angular/router';



declare var $: any;
@Component({
  selector: 'app-pantalla-empresa',
  templateUrl: './pantalla-empresa.component.html',
  styleUrls: ['./pantalla-empresa.component.css']
})
export class PantallaEmpresaComponent implements OnInit {
  clientes: ClientEmpre[];

  reservas: any[];
  cliente = new Array();
  cli: ClientEmpre = {
    key: '90',
    nombreEmpr: '',
    emailEmpr: '',
    mobilEmpr: ''
  };
  editr = false;
  us: string;
  constructor(private editDat: EditDataService, private aut: AngularFireAuth, private router: Router) {
// aut para coger el usuario actual.
// editData para coger los clientes de la bd.
  }

  ngOnInit() {
    this.us = this.aut.auth.currentUser.email;
    this.editDat.getClientes().subscribe(
        clientes => {
        for (let i = 0 ; i < clientes.length; i++) {
          if (this.aut.auth.currentUser.email === clientes[i].id) {
              if (this.cliente.length > 0) {
                this.cliente = [];
              }
            this.cliente.push(clientes[i]);
          }
        }
      }
    );

    this.editDat.getReservas('clientes').subscribe(
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

  editEmpresa(nombre: string, mobil: string, mail: string) {

      this.cli.emailEmpr = mail;
      this.cli.mobilEmpr = mobil;
      this.cli.nombreEmpr = nombre;
      this.cli.key = '90';
      this.edicion(false);
      this.editDat.updateClient(this.cli);

  }

}
